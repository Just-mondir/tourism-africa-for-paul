const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const google = require('googlethis');

// Load environment variables
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

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const COUNTRIES = [
  'Algerie', 'Rwanda', 'benin', 'libya', 'Botswana', 'Malawi',
  'Mali', 'Zambia', 'kenya', 'zimbabwi', 'Morocco', 'Egypt'
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchGoogleImages(country, placeName) {
  try {
    const query = `${country} ${placeName} beautiful high quality`;
    console.log(`  Searching Google Images for: "${query}"...`);
    
    const images = await google.image(query, { safe: false });
    
    // Filter out icons/logos and keep good ones
    const validImages = images.filter(img => 
      !img.url.toLowerCase().includes('.svg') && 
      !img.url.toLowerCase().includes('logo') &&
      !img.url.toLowerCase().includes('icon')
    );
    
    // We only need the top 3 images
    return validImages.slice(0, 3).map(img => img.url);
  } catch (error) {
    console.error(`Google search error for ${placeName}:`, error.message);
    return [];
  }
}

async function uploadToCloudinary(imageUrl, publicId, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(1000); 
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "afric-guide/destinations/google",
        public_id: publicId,
        overwrite: true,
        width: 1200,      // Resize to fit the website perfectly
        height: 800,
        crop: "fill",     // Crop properly to maintain aspect ratio
        gravity: "auto",
        quality: "auto:good"
      });
      return result.secure_url;
    } catch (error) {
      if (i === retries - 1) {
        console.error(`    ❌ Failed to upload ${imageUrl} to Cloudinary: ${error.message}`);
        return null;
      }
      await sleep((i + 1) * 2000);
    }
  }
}

async function processAll() {
  console.log("Starting ULTRA FAST Google Images population (No API Key needed!)...\n");

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
      
      const googleUrls = await fetchGoogleImages(country, placeName);
      
      if (googleUrls.length === 0) {
        console.log(`  ⚠️ No Google images found for "${placeName}". Skipping.`);
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
        // As requested: "1 insert it as a card image and the other insert them in images column as array"
        const primaryImage = uploadedUrls[0];
        
        // I'll put all uploaded urls in the images array so the gallery has them all
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
      
      // Delay to respect Google Search rate limits
      await sleep(2000);
    }
  }

  console.log("\n🎉 Finished replacing images with exact Google Images!");
}

processAll();
