const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables from .env.script
dotenv.config({ path: '.env.script' });

if (!process.env.CLOUDINARY_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing API keys in .env.script! Please fill them out first.");
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// =============================================================
// 🖼️  BLOG IMAGE MAPPING
// Each entry maps a blog TITLE to a brand-new stunning image.
// All images are unique, high-resolution Unsplash Africa photos.
// =============================================================
const BLOG_IMAGE_UPDATES = [
  {
    title: "5 Things You Should Know Before Visiting Africa",
    slug: "5-things-to-know",
    // Stunning aerial view of African savanna at golden hour
    imageUrl: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Top Safari Destinations in 2026",
    slug: "top-safari-2026",
    // Herd of elephants walking across open savanna
    imageUrl: "https://images.unsplash.com/photo-1504173010664-32509107de5a?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "A Beginner's Guide to Exploring Cape Town",
    slug: "cape-town-guide",
    // Table Mountain and Cape Town harbor from above
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "The Best Times of Year to Visit Victoria Falls",
    slug: "victoria-falls-seasons",
    // Victoria Falls roaring with rainbow
    imageUrl: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Essential Packing List for an African Adventure",
    slug: "safari-packing-list",
    // Safari gear and binoculars against sunset
    imageUrl: "https://images.unsplash.com/photo-1528277342758-f1d7613953a2?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Navigating the Bustling Markets of Marrakech",
    slug: "marrakech-markets",
    // Colorful Marrakech souk spices and lanterns
    imageUrl: "https://images.unsplash.com/photo-1597212720158-b4cf58f3ed06?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "The Great Migration: A Spectacle of Nature",
    slug: "great-migration",
    // Wildebeest crossing a river during the Great Migration
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Cultural Etiquette When Visiting East Africa",
    slug: "east-africa-etiquette",
    // Maasai warriors in traditional red clothing on plains
    imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Top 10 Hidden Gems in Sub-Saharan Africa",
    slug: "hidden-gems-africa",
    // Pristine turquoise beach in Mozambique / Zanzibar
    imageUrl: "https://images.unsplash.com/photo-1597932787390-bfc8f6f7b6a3?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "A Culinary Journey Through West Africa",
    slug: "west-africa-culinary",
    // Vibrant West African street food market
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=90&w=1600&auto=format&fit=crop"
  }
];

// ============================================================

async function uploadToCloudinary(imageUrl, publicId) {
  console.log(`  📤 Uploading to Cloudinary as "${publicId}"...`);
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "afric-guide/blogs",
    public_id: publicId,
    overwrite: true,
    transformation: [{ quality: "auto:best", fetch_format: "auto" }]
  });
  return result.secure_url;
}

async function updateBlogImage(blog, cloudinaryUrl) {
  console.log(`  💾 Saving to Supabase...`);

  const { data, error: fetchError } = await supabase
    .from('posts')
    .select('id, title')
    .ilike('title', blog.title);

  if (fetchError) {
    console.error(`  ❌ Supabase fetch error:`, fetchError.message);
    return false;
  }

  if (!data || data.length === 0) {
    console.warn(`  ⚠️  No post found with title: "${blog.title}". Skipping.`);
    return false;
  }

  const post = data[0];
  const { error: updateError } = await supabase
    .from('posts')
    .update({ image_url: cloudinaryUrl })
    .eq('id', post.id);

  if (updateError) {
    console.error(`  ❌ Supabase update error:`, updateError.message);
    return false;
  }

  return true;
}

async function run() {
  console.log("\n🌍  Africa Guide — Blog Image Updater");
  console.log("======================================");
  console.log(`Updating ${BLOG_IMAGE_UPDATES.length} blog images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const blog of BLOG_IMAGE_UPDATES) {
    console.log(`\n📰 "${blog.title}"`);
    try {
      // 1. Upload source image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(blog.imageUrl, `blog-${blog.slug}`);
      console.log(`  ✅ Cloudinary: ${cloudinaryUrl}`);

      // 2. Update Supabase record
      const ok = await updateBlogImage(blog, cloudinaryUrl);
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

  console.log("\n======================================");
  console.log(`🎉  Done! ${successCount} updated, ${failCount} failed.`);
  console.log("🌐  Refresh your /blog page to see the new images!\n");
}

run();
