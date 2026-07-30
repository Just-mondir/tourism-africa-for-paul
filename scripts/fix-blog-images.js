const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config({ path: '.env.script' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Fixed URLs for the 3 that failed
const FIXES = [
  {
    title: "Top Safari Destinations in 2026",
    slug: "top-safari-2026",
    // Elephants on savanna - verified working
    imageUrl: "https://images.unsplash.com/photo-1551890083-eba7a5a14ccb?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Navigating the Bustling Markets of Marrakech",
    slug: "marrakech-markets",
    // Moroccan market lanterns - verified working
    imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=90&w=1600&auto=format&fit=crop"
  },
  {
    title: "Top 10 Hidden Gems in Sub-Saharan Africa",
    slug: "hidden-gems-africa",
    // Tropical African beach - verified working
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=90&w=1600&auto=format&fit=crop"
  }
];

async function run() {
  console.log("\n🔧  Fixing 3 failed blog images...\n");

  for (const blog of FIXES) {
    console.log(`📰 "${blog.title}"`);
    try {
      const result = await cloudinary.uploader.upload(blog.imageUrl, {
        folder: "afric-guide/blogs",
        public_id: `blog-${blog.slug}`,
        overwrite: true,
        transformation: [{ quality: "auto:best", fetch_format: "auto" }]
      });
      const cloudinaryUrl = result.secure_url;
      console.log(`  ✅ Cloudinary: ${cloudinaryUrl}`);

      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('id')
        .ilike('title', blog.title);

      if (fetchError || !data || data.length === 0) {
        console.warn(`  ⚠️  Post not found in Supabase. Skipping update.`);
        continue;
      }

      const { error: updateError } = await supabase
        .from('posts')
        .update({ image_url: cloudinaryUrl })
        .eq('id', data[0].id);

      if (updateError) {
        console.error(`  ❌ Supabase error:`, updateError.message);
      } else {
        console.log(`  ✅ Supabase updated!`);
      }
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
    console.log("  ---");
  }

  console.log("\n🎉 All fixes applied! Refresh your /blog page.\n");
}

run();
