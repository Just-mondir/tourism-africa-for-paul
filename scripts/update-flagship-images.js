const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables from .env.script
dotenv.config({ path: '.env.script' });

if (!process.env.CLOUDINARY_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing API keys in .env.script! Please fill them out first.");
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// We will use local paths for the generated images instead of URLs
const FLAGSHIP_IMAGES = [
  {
    table: "Algerie",
    slug: "tassili-najjer",
    sourceUrl: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\fc0f56e0-0929-4d93-b667-71e1b3131349\\tassili_najjer_1781624654717.png",
    name: "Tassili n'Ajjer"
  },
  {
    table: "Rwanda",
    slug: "volcanoes-national-park",
    sourceUrl: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\fc0f56e0-0929-4d93-b667-71e1b3131349\\volcanoes_rwanda_1781624698691.png",
    name: "Volcanoes National Park"
  },
  {
    table: "benin",
    slug: "ouidah-coast-and-vodun-heritage",
    sourceUrl: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\fc0f56e0-0929-4d93-b667-71e1b3131349\\ouidah_coast_1781624711344.png",
    name: "Ouidah Coast and Vodun Heritage"
  },
  {
    table: "libya",
    slug: "leptis-magna",
    sourceUrl: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\fc0f56e0-0929-4d93-b667-71e1b3131349\\leptis_magna_1781624724691.png",
    name: "Leptis Magna"
  }
];

function generateSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function uploadToCloudinary(filePath, publicId) {
  console.log(`Uploading ${publicId} to Cloudinary...`);
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "afric-guide/destinations",
      public_id: publicId,
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading to Cloudinary: ${error.message}`);
    throw error;
  }
}

async function updateSupabase(table, slug, imageUrl, name) {
  console.log(`Updating Supabase table ${table} for ${name}...`);
  
  const { data, error: fetchError } = await supabase
    .from(table)
    .select("id, places");

  if (fetchError) {
    console.error(`Error fetching from ${table}:`, fetchError.message);
    return;
  }

  const row = data.find(item => {
    const placeName = typeof item.places === 'string' ? item.places : "";
    return generateSlug(placeName) === slug;
  });

  if (!row) {
    console.warn(`⚠️ Warning: Could not find a row matching slug '${slug}' in table '${table}'. Creating it now...`);
    
    const { error: insertError } = await supabase
      .from(table)
      .insert([
        { places: name, image_url: imageUrl, desc: "A flagship destination in Africa." }
      ]);
      
    if (insertError) {
      console.error(`Error inserting into Supabase:`, insertError.message);
    } else {
      console.log(`✅ Successfully created ${name} and added image in Supabase!`);
    }
    return;
  }

  // Update existing row
  const { error: updateError } = await supabase
    .from(table)
    .update({ image_url: imageUrl })
    .eq('id', row.id);

  if (updateError) {
    console.error(`Error updating Supabase:`, updateError.message);
  } else {
    console.log(`✅ Successfully updated ${name} in Supabase!`);
  }
}

async function run() {
  console.log("Starting the image update process...\n");

  for (const item of FLAGSHIP_IMAGES) {
    try {
      // 1. Upload to Cloudinary using local file
      const cloudinaryUrl = await uploadToCloudinary(item.sourceUrl, `flagship-${item.slug}`);
      
      // 2. Update Supabase (and insert if missing)
      await updateSupabase(item.table, item.slug, cloudinaryUrl, item.name);
      
      console.log("---");
    } catch (err) {
      console.error(`Failed to process ${item.name}. Skipping...`);
    }
  }

  console.log("\nDone! 🎉 Please refresh your page.");
}

run();
