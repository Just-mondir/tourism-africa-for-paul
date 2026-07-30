const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config({ path: '.env.script' });

if (!process.env.CLOUDINARY_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing API keys in .env.script!");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ============================================================
// 🌍  IDs 1-15 — Original blog posts with new stunning images
// All URLs pre-verified as 200 OK
// ============================================================
const ORIGINAL_BLOGS = [
  {
    id: 1,
    title: "FITUR 2026 – IFEMA Madrid",
    slug: "fitur-2026-madrid",
    // Aerial view of a grand international expo / Madrid skyline
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Le Sénégal, terre de festivals : quand la culture prend vie",
    slug: "senegal-festivals",
    // Vibrant African festival crowd with colorful fabrics
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Zambie — Africa Bike Culture Festival",
    slug: "zambie-bike-festival",
    // Adventurous cycling / Africa road trip landscape
    imageUrl: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Nigeria-Calabar Carnival – La plus grande fête de rue d'Afrique",
    slug: "nigeria-calabar-carnival",
    // Bright colorful carnival parade costumes
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Kenya Tourism Board nommé meilleur office tourisme en Afrique",
    slug: "kenya-tourism-board-award",
    // Kenya savanna at golden hour with acacia trees
    imageUrl: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Uganda Positions Self Top Africa Destination for Chinese Travelers",
    slug: "uganda-china-tourism",
    // Lush green gorilla trekking landscape in Uganda
    imageUrl: "https://images.unsplash.com/photo-1581985673473-0784a7a44e39?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "POATE 2025: Uganda's Tourism Crown Jewel Shines on the Global Stage",
    slug: "poate-2025-uganda",
    // Pearl of Africa — Murchison Falls rushing water
    imageUrl: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Rwanda Reinforces MICE Positioning at Meetings Africa 2025",
    slug: "rwanda-meetings-africa",
    // Rwanda rolling green hills / Kigali skyline
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Maroc",
    slug: "maroc",
    // Morocco souk with colorful lanterns and archways
    imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Tanzania",
    slug: "tanzania",
    // Mount Kilimanjaro rising above the clouds
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 11,
    title: "Eswatini MTN Bushfire Festival",
    slug: "eswatini-bushfire-festival",
    // Live music festival bonfire at night Africa
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 12,
    title: "Éthiopie Timkat Festival",
    slug: "ethiopie-timkat",
    // Ethiopian Orthodox ceremony with white-robed worshippers
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 13,
    title: "UAE–Africa tourism investment initiative",
    slug: "uae-africa-tourism",
    // Futuristic city skyline / luxury tourism investment
    imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 14,
    title: "WTM Africa 2025 opens with record participation from 96 countries",
    slug: "wtm-africa-2025",
    // International tourism convention / Cape Town
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=90&w=1600&auto=format&fit=crop"
  },
  {
    id: 15,
    title: "AfDB lends Morocco $316 million for airport upgrades ahead of 2030 FIFA World Cup",
    slug: "afdb-morocco-airport",
    // Moroccan airport terminal or Atlas Mountains landscape
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=90&w=1600&auto=format&fit=crop"
  }
];

async function uploadToCloudinary(imageUrl, publicId) {
  console.log(`  📤 Uploading "${publicId}" to Cloudinary...`);
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "afric-guide/blogs",
    public_id: publicId,
    overwrite: true,
    transformation: [{ quality: "auto:best", fetch_format: "auto" }]
  });
  return result.secure_url;
}

async function updatePostById(id, cloudinaryUrl) {
  const { error } = await supabase
    .from('posts')
    .update({ image_url: cloudinaryUrl })
    .eq('id', id);

  if (error) {
    console.error(`  ❌ Supabase error:`, error.message);
    return false;
  }
  return true;
}

async function run() {
  console.log("\n🌍  Africa Guide — Original Blog Image Updater");
  console.log("================================================");
  console.log(`Updating ${ORIGINAL_BLOGS.length} original blog images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const blog of ORIGINAL_BLOGS) {
    console.log(`\n📰 [ID ${blog.id}] "${blog.title}"`);
    try {
      const cloudinaryUrl = await uploadToCloudinary(blog.imageUrl, `blog-original-${blog.slug}`);
      console.log(`  ✅ Cloudinary: ${cloudinaryUrl}`);

      const ok = await updatePostById(blog.id, cloudinaryUrl);
      if (ok) {
        console.log(`  ✅ Supabase updated!`);
        successCount++;
      } else {
        failCount++;
      }
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      failCount++;
    }
    console.log("  ---");
  }

  console.log("\n================================================");
  console.log(`🎉  Done! ${successCount} updated, ${failCount} failed.`);
  console.log("🌐  Refresh your /blog page to see ALL new images!\n");
}

run();
