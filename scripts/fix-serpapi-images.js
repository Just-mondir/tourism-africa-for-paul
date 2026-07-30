const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.script' });

if (!process.env.SERPAPI_KEY) {
  console.error("❌ CRITICAL ERROR: Missing SERPAPI_KEY in .env.script!");
  console.error("Please add SERPAPI_KEY=\"your_key_here\" to .env.script and try again.");
  process.exit(1);
}

if (!process.env.CLOUDINARY_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Cloudinary or Supabase keys in .env.script!");
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

async function fetchSerpApiImages(country, placeName) {
  try {
    const query = `${country} ${placeName} beautiful high quality landscape`;
    console.log(`  Searching SerpApi for: "${query}"...`);
    
    const url = `https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(query)}&ijn=0&api_key=${process.env.SERPAPI_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.images_results || data.images_results.length === 0) {
      return [];
    }
    
    // Get top 3 images
    return data.images_results.slice(0, 3).map(img => img.original);
  } catch (error) {
    console.error(`SerpApi search error for ${placeName}:`, error.message);
    return [];
  }
}

async function uploadToCloudinary(imageUrl, publicId, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "afric-guide/destinations/serpapi",
        public_id: publicId,
        overwrite: true,
        width: 1200,      
        height: 800,
        crop: "fill",     
        gravity: "auto",
        quality: "auto:good"
      });
      return result.secure_url;
    } catch (error) {
      if (i === retries - 1) {
        console.error(`    ❌ Failed to upload ${imageUrl} to Cloudinary: ${error.message}`);
        return null;
      }
      await sleep(2000);
    }
  }
}

async function processAll() {
  console.log("Starting Official SerpApi Google Images population...\n");

  for (const country of COUNTRIES) {
    console.log(`\n--- Processing Table: ${country} ---`);
    
    const { data: places, error } = await supabase.from(country).select('*');
    
    if (error) {
      console.error(`Error reading ${country}:`, error.message);
      continue;
    }
    
    if (!places || places.length === 0) continue;

    for (const place of places) {
      const placeName = place.places;
      console.log(`\n  Processing "${placeName}"...`);
      
      const googleUrls = await fetchSerpApiImages(country, placeName);
      
      if (googleUrls.length === 0) {
        console.log(`  ⚠️ No SerpApi images found for "${placeName}". Skipping.`);
        continue;
      }
      
      const slug = placeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
      const uploadedUrls = [];
      
      for (let i = 0; i < googleUrls.length; i++) {
        console.log(`    Uploading image ${i+1}/3 to Cloudinary...`);
        const url = await uploadToCloudinary(googleUrls[i], `${country.toLowerCase()}-${slug}-${i + 1}`);
        if (url) uploadedUrls.push(url);
      }
      
      if (uploadedUrls.length > 0) {
        const primaryImage = uploadedUrls[0];
        
        const { error: updateError } = await supabase
          .from(country)
          .update({
            image_url: primaryImage,
            images: uploadedUrls
          })
          .eq('id', place.id);
          
        if (updateError) {
           console.error(`  ❌ Failed to update Supabase for "${placeName}":`, updateError.message);
        } else {
           console.log(`  ✓ Updated image_url AND images array for "${placeName}"!`);
        }
      } else {
        console.log(`  ⚠️ All Cloudinary uploads failed for "${placeName}".`);
      }
      
      await sleep(1000);
    }
  }

  console.log("\n🎉 Finished replacing images using SerpApi!");
}

processAll();
