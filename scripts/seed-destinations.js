const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

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

// Paths to AI generated images
const LOCAL_IMAGES = {
  marrakech: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\marrakech_ai_1784477320362.png",
  pyramids: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\pyramids_ai_1784477329566.png",
  sahara: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\sahara_ai_1784477339704.png",
  chefchaouen: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\chefchaouen_ai_1784630178451.png",
  fes: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\fes_ai_1784630187787.png",
  luxor: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\luxor_ai_1784630197072.png"
};

const DESTINATIONS = {
  Morocco: [
    {
      places: "Marrakech",
      desc: "A vibrant city known for its bustling souks, stunning palaces like Bahia, and the lively Jemaa el-Fnaa square.",
      imagePath: LOCAL_IMAGES.marrakech
    },
    {
      places: "Chefchaouen",
      desc: "The famous 'Blue Pearl' of Morocco, a picturesque town nestled in the Rif Mountains with blue-washed buildings.",
      imagePath: LOCAL_IMAGES.chefchaouen
    },
    {
      places: "Fes Medina",
      desc: "The cultural and spiritual heart of Morocco, featuring the world's oldest university and a massive medieval medina.",
      imagePath: LOCAL_IMAGES.fes
    },
    {
      places: "Sahara Desert",
      desc: "Experience the magic of Merzouga's towering sand dunes, camel treks, and nights under a canopy of stars.",
      imagePath: LOCAL_IMAGES.sahara
    },
    {
      places: "Essaouira",
      desc: "A relaxed coastal town known for its historic ramparts, fresh seafood, and excellent windsurfing conditions.",
      imagePath: LOCAL_IMAGES.chefchaouen // using blue city image as fallback for coastal
    },
    {
      places: "Casablanca",
      desc: "Morocco's modern commercial capital, home to the spectacular Hassan II Mosque overlooking the Atlantic Ocean.",
      imagePath: LOCAL_IMAGES.marrakech
    },
    {
      places: "Ouarzazate",
      desc: "The 'Gateway to the Desert' and the Hollywood of Africa, featuring the stunning Ait Benhaddou kasbah.",
      imagePath: LOCAL_IMAGES.sahara
    },
    {
      places: "Dades Valley",
      desc: "A spectacular gorge known for its dramatic rock formations, ancient kasbahs, and winding roads.",
      imagePath: LOCAL_IMAGES.sahara
    }
  ],
  Egypt: [
    {
      places: "Pyramids of Giza",
      desc: "The last remaining wonder of the ancient world, including the Great Pyramid and the iconic Sphinx.",
      imagePath: LOCAL_IMAGES.pyramids
    },
    {
      places: "Luxor Temple",
      desc: "An ancient and massive temple complex situated on the east bank of the Nile River, dating back to 1400 BCE.",
      imagePath: LOCAL_IMAGES.luxor
    },
    {
      places: "Valley of the Kings",
      desc: "The ancient burial ground of pharaohs, including Tutankhamun, filled with intricately decorated tombs.",
      imagePath: LOCAL_IMAGES.luxor
    },
    {
      places: "Abu Simbel",
      desc: "Two massive rock-cut temples built by Ramses II, famous for their colossal statues and incredible relocation history.",
      imagePath: LOCAL_IMAGES.luxor
    },
    {
      places: "Aswan & Philae Temple",
      desc: "A beautiful southern city on the Nile, home to the relocated Philae Temple dedicated to the goddess Isis.",
      imagePath: LOCAL_IMAGES.luxor
    },
    {
      places: "Alexandria",
      desc: "A Mediterranean port city founded by Alexander the Great, known for its modern library and Roman amphitheater.",
      imagePath: LOCAL_IMAGES.pyramids
    },
    {
      places: "Siwa Oasis",
      desc: "A remote and stunning desert oasis known for its natural springs, ancient ruins, and unique local culture.",
      imagePath: LOCAL_IMAGES.sahara
    },
    {
      places: "Cairo",
      desc: "The bustling capital featuring the Egyptian Museum, Khan el-Khalili bazaar, and a rich blend of history and modern life.",
      imagePath: LOCAL_IMAGES.pyramids
    }
  ]
};

async function uploadToCloudinary(filePath, publicId) {
  console.log(`Uploading ${publicId} from local file to Cloudinary...`);
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

async function createTableIfNotExists(tableName) {
  const { error } = await supabase.from(tableName).select('places').limit(1);
  if (error && (error.code === '42P01' || error.message.includes('Could not find the table'))) {
    console.error(`\nCRITICAL ERROR: Table "${tableName}" does not exist in Supabase!`);
    console.error(`Please create it with the following SQL in the Supabase SQL Editor:`);
    console.error(`
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        places TEXT NOT NULL,
        desc TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    \n`);
    throw new Error(`Table ${tableName} missing. Run the SQL above.`);
  }
}

async function updateSupabase(tableName, placeData, imageUrl) {
  console.log(`Updating Supabase '${tableName}' table for: "${placeData.places}"...`);
  
  const { data, error: fetchError } = await supabase
    .from(tableName)
    .select('places')
    .eq('places', placeData.places);

  if (fetchError) {
    console.error(`Error fetching from ${tableName}:`, fetchError.message);
    return;
  }

  const existingPlace = data && data.length > 0 ? data[0] : null;

  if (!existingPlace) {
    const { error: insertError } = await supabase
      .from(tableName)
      .insert([
        { 
          places: placeData.places, 
          desc: placeData.desc, 
          image_url: imageUrl 
        }
      ]);
      
    if (insertError) {
      console.error(`Error inserting into ${tableName}:`, insertError.message);
    } else {
      console.log(`✅ Successfully created destination "${placeData.places}"!`);
    }
  } else {
    const { error: updateError } = await supabase
      .from(tableName)
      .update({ 
        desc: placeData.desc,
        image_url: imageUrl 
      })
      .eq('places', placeData.places);

    if (updateError) {
      console.error(`Error updating ${tableName}:`, updateError.message);
    } else {
      console.log(`✅ Successfully updated destination "${placeData.places}"!`);
    }
  }
}

async function run() {
  console.log("Starting the destination seeding process with AI images...\n");

  for (const [country, places] of Object.entries(DESTINATIONS)) {
    console.log(`\n--- Processing country: ${country} ---`);
    try {
      await createTableIfNotExists(country);
    } catch (err) {
      console.error(`Skipping ${country} due to missing table.`);
      continue;
    }

    for (const place of places) {
      try {
        const slug = place.places.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const cloudinaryUrl = await uploadToCloudinary(place.imagePath, `dest-${country.toLowerCase()}-${slug}`);
        
        await updateSupabase(country, place, cloudinaryUrl);
      } catch (err) {
        console.error(`Failed to process "${place.places}". Skipping...`);
      }
    }
  }

  console.log("\nDone! 🎉 All destinations have been processed.");
}

run();
