const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const https = require('https');

dotenv.config({ path: '.env.script' });

if (!process.env.CLOUDINARY_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing API keys in .env.script! Please fill them out first.");
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

const FLAGSHIP_IMAGES = [
  {
    table: "Malawi",
    slug: "lake-malawi",
    sourceUrl: "https://picsum.photos/seed/malawi/1200/800",
    name: "Lake Malawi"
  },
  {
    table: "Mali",
    slug: "djenne",
    sourceUrl: "https://picsum.photos/seed/mali/1200/800",
    name: "Djenne"
  },
  {
    table: "Zambia",
    slug: "south-luangwa-national-park",
    sourceUrl: "https://picsum.photos/seed/zambia/1200/800",
    name: "South Luangwa National Park"
  },
  {
    table: "kenya",
    slug: "masai-mara",
    sourceUrl: "https://picsum.photos/seed/kenya/1200/800",
    name: "Masai Mara"
  },
  {
    table: "zimbabwi",
    slug: "hwange-national-park",
    sourceUrl: "https://picsum.photos/seed/zimbabwi/1200/800",
    name: "Hwange National Park"
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

async function fetchImageBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchImageBase64(res.headers.location));
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve(`data:image/jpeg;base64,${buffer.toString('base64')}`);
      });
    }).on('error', reject);
  });
}

async function uploadToCloudinary(url, publicId) {
  console.log(`Uploading ${publicId} to Cloudinary...`);
  try {
    const base64Image = await fetchImageBase64(url);
    const result = await cloudinary.uploader.upload(base64Image, {
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
    .select("*");

  if (fetchError) {
    console.error(`Error fetching from ${table}:`, fetchError.message);
    return;
  }

  const row = data.find(item => {
    const placeName = typeof item.places === 'string' ? item.places : "";
    return generateSlug(placeName) === slug;
  });

  const hasId = data.length > 0 && data[0].id !== undefined;

  if (!row) {
    console.warn(`⚠️ Warning: Could not find a row matching slug '${slug}' in table '${table}'. Creating it now...`);
    
    const insertData = { places: name, image_url: imageUrl, desc: "A flagship destination in Africa." };
    if (hasId) {
      insertData.id = Math.floor(Math.random() * 1000000);
    }

    const { error: insertError } = await supabase
      .from(table)
      .insert([insertData]);
      
    if (insertError) {
      console.error(`Error inserting into Supabase:`, insertError.message);
    } else {
      console.log(`✅ Successfully created ${name} and added image in Supabase!`);
    }
    return;
  }

  // Update existing row
  let updateQuery = supabase.from(table).update({ image_url: imageUrl });
  
  if (hasId && row.id !== undefined) {
    updateQuery = updateQuery.eq('id', row.id);
  } else {
    updateQuery = updateQuery.eq('places', row.places);
  }

  const { error: updateError } = await updateQuery;

  if (updateError) {
    console.error(`Error updating Supabase:`, updateError.message);
  } else {
    console.log(`✅ Successfully updated ${name} in Supabase!`);
  }
}

async function run() {
  console.log("Starting the image update process for the remaining 5 destinations...\n");

  for (const item of FLAGSHIP_IMAGES) {
    try {
      const cloudinaryUrl = await uploadToCloudinary(item.sourceUrl, `flagship-${item.slug}`);
      await updateSupabase(item.table, item.slug, cloudinaryUrl, item.name);
      console.log("---");
    } catch (err) {
      console.error(`Failed to process ${item.name}. Skipping...`);
    }
  }

  console.log("\nDone! 🎉 Please refresh your page.");
}

run();
