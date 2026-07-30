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

// 10 new blogs with title, paragraph, and high-quality Unsplash image URLs
const NEW_BLOGS = [
  {
    slug: "5-things-to-know",
    title: "5 Things You Should Know Before Visiting Africa",
    paragraph: "Africa is a vast and diverse continent. Before your trip, make sure to research your specific destination, check visa requirements, consult your doctor about vaccinations, pack versatile clothing, and learn a few basic phrases in the local language.",
    sourceUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "top-safari-destinations-2026",
    title: "Top Safari Destinations in 2026",
    paragraph: "From the sweeping plains of the Serengeti in Tanzania to the lush Okavango Delta in Botswana, 2026 offers incredible opportunities for wildlife viewing. Discover the best parks for spotting the Big Five and experiencing untouched nature.",
    sourceUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "cape-town-guide",
    title: "A Beginner's Guide to Exploring Cape Town",
    paragraph: "Nestled between the ocean and Table Mountain, Cape Town is a vibrant city with something for everyone. Explore the historic Robben Island, take a cable car up the mountain, and enjoy world-class wine in Stellenbosch.",
    sourceUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "victoria-falls-seasons",
    title: "The Best Times of Year to Visit Victoria Falls",
    paragraph: "Known as the Smoke That Thunders, Victoria Falls is spectacular year-round. However, the experience changes dramatically with the seasons. Learn when to visit for the most impressive spray or the best white-water rafting.",
    sourceUrl: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "safari-packing-list",
    title: "Essential Packing List for an African Adventure",
    paragraph: "Packing for Africa requires balancing comfort, practicality, and weight limits on small flights. Our comprehensive checklist covers everything from binoculars and insect repellent to the right kind of footwear for bush walks.",
    sourceUrl: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "marrakech-markets",
    title: "Navigating the Bustling Markets of Marrakech",
    paragraph: "The souks of Marrakech are a sensory overload of colors, sounds, and smells. Discover tips for bargaining, finding the best authentic crafts, and navigating the maze-like alleys without getting completely lost.",
    sourceUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "great-migration-guide",
    title: "The Great Migration: A Spectacle of Nature",
    paragraph: "Witnessing millions of wildebeest and zebras traverse the plains of East Africa is a once-in-a-lifetime experience. Learn about the migration cycle and where to position yourself for the best river crossings.",
    sourceUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "east-africa-etiquette",
    title: "Cultural Etiquette When Visiting East Africa",
    paragraph: "Respecting local customs is crucial for a meaningful trip. This guide covers greetings, appropriate dress codes, photography etiquette, and tips for interacting respectfully with indigenous communities like the Maasai.",
    sourceUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "hidden-gems-africa",
    title: "Top 10 Hidden Gems in Sub-Saharan Africa",
    paragraph: "Beyond the famous landmarks lie incredible destinations waiting to be explored. From the pristine beaches of Mozambique to the ancient rock-hewn churches of Lalibela, discover Africa's best-kept secrets.",
    sourceUrl: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "west-africa-culinary",
    title: "A Culinary Journey Through West Africa",
    paragraph: "West African cuisine is rich, flavorful, and deeply comforting. Dive into the world of Jollof rice, Suya, and peanut soup, and learn where to find the best street food experiences in the region.",
    sourceUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop"
  }
];

async function uploadToCloudinary(fileUrl, publicId) {
  console.log(`Uploading ${publicId} to Cloudinary...`);
  try {
    const result = await cloudinary.uploader.upload(fileUrl, {
      folder: "afric-guide/blogs",
      public_id: publicId,
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading to Cloudinary: ${error.message}`);
    throw error;
  }
}

async function updateSupabase(blog, imageUrl, idToUse) {
  console.log(`Updating Supabase 'posts' table for: "${blog.title}" (ID: ${idToUse})...`);
  
  // Try to find if a post with this title already exists
  const { data, error: fetchError } = await supabase
    .from('posts')
    .select('id, title')
    .eq('title', blog.title);

  if (fetchError) {
    console.error(`Error fetching from posts:`, fetchError.message);
    return;
  }

  const existingPost = data && data.length > 0 ? data[0] : null;

  if (!existingPost) {
    // Insert new blog post
    const { error: insertError } = await supabase
      .from('posts')
      .insert([
        { 
          id: idToUse,
          title: blog.title, 
          paragraph: blog.paragraph, 
          image_url: imageUrl 
        }
      ]);
      
    if (insertError) {
      console.error(`Error inserting into Supabase:`, insertError.message);
    } else {
      console.log(`✅ Successfully created blog "${blog.title}"!`);
    }
  } else {
    // Update existing blog post
    const { error: updateError } = await supabase
      .from('posts')
      .update({ 
        paragraph: blog.paragraph,
        image_url: imageUrl 
      })
      .eq('id', existingPost.id);

    if (updateError) {
      console.error(`Error updating Supabase:`, updateError.message);
    } else {
      console.log(`✅ Successfully updated blog "${blog.title}"!`);
    }
  }
}

async function run() {
  console.log("Starting the blog generation and seeding process...\n");

  // Fetch max ID to handle primary key auto-increment issue
  const { data: allPosts, error } = await supabase
    .from('posts')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  let nextId = 1;
  if (allPosts && allPosts.length > 0) {
    nextId = allPosts[0].id + 1;
  }

  for (let i = 0; i < NEW_BLOGS.length; i++) {
    const blog = NEW_BLOGS[i];
    try {
      // 1. Upload the image from URL to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(blog.sourceUrl, `blog-${blog.slug}`);
      
      // 2. Insert into Supabase
      await updateSupabase(blog, cloudinaryUrl, nextId + i);
      
      console.log("---");
    } catch (err) {
      console.error(`Failed to process "${blog.title}". Skipping...`);
    }
  }

  console.log("\nDone! 🎉 All 10 blogs have been inserted. Please check the /blog page.");
}

run();
