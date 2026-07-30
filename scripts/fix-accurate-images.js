const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config({ path: '.env.script' });

if (!process.env.CLOUDINARY_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing API keys in .env.script!");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const COUNTRIES = [
  'Algerie', 'Rwanda', 'benin', 'libya', 'Botswana', 'Malawi',
  'Mali', 'Zambia', 'kenya', 'zimbabwi', 'Morocco', 'Egypt'
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429) {
        await sleep((i + 1) * 3000);
        continue;
      }
      if (!res.ok) {
        if (i === retries - 1) return res;
        await sleep((i + 1) * 2000);
        continue;
      }
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep((i + 1) * 2000);
    }
  }
}

function sanitizeForWiki(place) {
  return place.replace(/,.*$/, ''); 
}

async function fetchWikiImages(placeName) {
  try {
    await sleep(2000); 
    const cleanPlace = sanitizeForWiki(placeName);
    const headers = { 'User-Agent': 'AfricGuide/2.0 (bot@africguide.com)' };
    
    const searchRes = await fetchWithRetry(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanPlace)}&utf8=&format=json`, { headers });
    
    if (!searchRes || !searchRes.ok) return [];
    
    const searchData = await searchRes.json();
    if (!searchData.query || !searchData.query.search || searchData.query.search.length === 0) return [];
    
    const pageTitle = searchData.query.search[0].title;
    
    await sleep(1500);
    const imgRes = await fetchWithRetry(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages|images&pithumbsize=1000&format=json`, { headers });
    
    if (!imgRes || !imgRes.ok) return [];
    const imgData = await imgRes.json();
    
    const pages = imgData.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    
    const imageUrls = [];
    
    if (page.thumbnail && page.thumbnail.source) {
      imageUrls.push(page.thumbnail.source);
    }
    
    if (page.images && page.images.length > 0) {
      const validImages = page.images.filter(img => 
        !img.title.toLowerCase().includes('.svg') && 
        !img.title.toLowerCase().includes('logo') &&
        !img.title.toLowerCase().includes('icon') &&
        !img.title.toLowerCase().includes('map') &&
        !img.title.toLowerCase().includes('flag')
      );
      
      for (const img of validImages.slice(0, 4)) {
        try {
          await sleep(1000);
          const fileRes = await fetchWithRetry(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(img.title)}&prop=imageinfo&iiprop=url&format=json`, { headers });
          if (!fileRes || !fileRes.ok) continue;
          const fileData = await fileRes.json();
          const filePages = fileData.query.pages;
          const filePageId = Object.keys(filePages)[0];
          
          if (filePages[filePageId].imageinfo && filePages[filePageId].imageinfo[0].url) {
             const url = filePages[filePageId].imageinfo[0].url;
             if (!imageUrls.includes(url)) imageUrls.push(url);
          }
        } catch (e) {
          // ignore
        }
      }
    }
    
    return imageUrls.slice(0, 4);
  } catch (error) {
    console.error(`Wikipedia fetch error for ${placeName}:`, error.message);
    return [];
  }
}

async function uploadToCloudinary(imageUrl, publicId, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(1000); // delay cloudinary uploads slightly too
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "afric-guide/destinations/accurate",
        public_id: publicId,
        overwrite: true,
      });
      return result.secure_url;
    } catch (error) {
      if (i === retries - 1) {
        console.error(`Failed to upload ${imageUrl} to Cloudinary after retries: ${error.message}`);
        return null;
      }
      await sleep((i + 1) * 3000);
    }
  }
}

async function supabaseUpdateWithRetry(country, place, primaryImage, uploadedUrls, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const { error } = await supabase
        .from(country)
        .update({
          image_url: primaryImage,
          images: uploadedUrls
        })
        .eq('id', place.id);
        
      if (error) throw error;
      return true;
    } catch (error) {
      if (i === retries - 1) {
        console.error(`  ❌ Failed to update Supabase for "${place.places}":`, error.message);
        return false;
      }
      await sleep((i + 1) * 2000);
    }
  }
}

async function supabaseSelectWithRetry(country, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const { data, error } = await supabase.from(country).select('*');
            if (error) throw error;
            return data;
        } catch (error) {
            if (i === retries - 1) {
                console.error(`Error reading ${country}:`, error.message);
                return null;
            }
            await sleep((i + 1) * 2000);
        }
    }
}


async function processAll() {
  console.log("Starting HIGHLY ROBUST Wikipedia image population...\n");

  for (const country of COUNTRIES) {
    console.log(`\n--- Processing Table: ${country} ---`);
    
    const places = await supabaseSelectWithRetry(country);
    
    if (!places || places.length === 0) continue;

    for (const place of places) {
      const placeName = place.places;
      console.log(`  Processing "${placeName}"...`);
      
      const wikiImages = await fetchWikiImages(placeName);
      
      if (wikiImages.length === 0) {
        console.log(`  ⚠️ No Wikipedia images found for "${placeName}". Skipping.`);
        continue;
      }
      
      const slug = placeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
      const uploadedUrls = [];
      
      for (let i = 0; i < wikiImages.length; i++) {
        const url = await uploadToCloudinary(wikiImages[i], `${country.toLowerCase()}-${slug}-${i + 1}`);
        if (url) uploadedUrls.push(url);
      }
      
      if (uploadedUrls.length > 0) {
        const primaryImage = uploadedUrls[0];
        
        const success = await supabaseUpdateWithRetry(country, place, primaryImage, uploadedUrls);
          
        if (success) {
           console.log(`  ✓ Updated image_url AND images array for "${placeName}" with ${uploadedUrls.length} real photos.`);
        }
      } else {
        console.log(`  ⚠️ All Cloudinary uploads failed for "${placeName}".`);
      }
    }
  }

  console.log("\n🎉 Finished replacing inaccurate images with factual Wikipedia photos!");
}

processAll();
