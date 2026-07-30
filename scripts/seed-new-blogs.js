const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

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

const LOCAL_IMAGES = {
  marrakech: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\marrakech_ai_1784477320362.png",
  pyramids: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\pyramids_ai_1784477329566.png",
  sahara: "C:\\Users\\windows\\.gemini\\antigravity-ide\\brain\\2c600ec6-5eac-414d-8a84-36a7ec918da3\\sahara_ai_1784477339704.png"
};

const NEW_BLOGS = [
  {
    slug: "morocco-travel-guide-2026",
    title: "The Ultimate Morocco Travel Guide for 2026",
    paragraph: "Morocco offers a stunning blend of ancient traditions and modern conveniences. From the bustling medinas of Marrakech and Fes to the serene dunes of the Sahara, planning your trip requires knowing the best times to visit and the must-see locations.",
    imagePath: LOCAL_IMAGES.marrakech
  },
  {
    slug: "egypt-historical-tours",
    title: "Exploring Egypt: Beyond the Pyramids",
    paragraph: "While the Pyramids of Giza are a must-see, Egypt's rich history extends far beyond. Discover the Valley of the Kings in Luxor, the stunning temples of Abu Simbel, and the vibrant life along the Nile River.",
    imagePath: LOCAL_IMAGES.pyramids
  },
  {
    slug: "south-africa-coastal-drives",
    title: "South Africa's Most Scenic Coastal Drives",
    paragraph: "The Garden Route and the Cape Peninsula offer some of the most breathtaking coastal drives in the world. Experience dramatic cliffs, pristine beaches, and charming seaside towns along South Africa's stunning coastline.",
    sourceUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "wildlife-photography-tips",
    title: "10 Tips for Perfect Wildlife Photography on Safari",
    paragraph: "Capturing the perfect shot of a lion or elephant requires patience, the right equipment, and knowing animal behavior. Learn essential tips for getting the best photos during your African safari adventure.",
    sourceUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "desert-camping-guide",
    title: "A Beginner's Guide to Desert Camping in the Sahara",
    paragraph: "Sleeping under the stars in the Sahara Desert is an unforgettable experience. This guide covers what to pack, how to choose a camp, and what to expect during a night in the world's most famous desert.",
    imagePath: LOCAL_IMAGES.sahara
  },
  {
    slug: "african-cultural-festivals",
    title: "Top Cultural Festivals in Africa You Shouldn't Miss",
    paragraph: "Experience the vibrant cultures of Africa by attending some of its most famous festivals. From the colorful Gnaoua World Music Festival in Morocco to the lively Cape Town Minstrel Carnival, these events offer a unique perspective on local traditions.",
    sourceUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "moroccan-cuisine-guide",
    title: "A Taste of Morocco: Essential Dishes to Try",
    paragraph: "Moroccan cuisine is a delightful mix of spices, sweet and savory flavors, and slow-cooked perfection. Discover the must-try dishes, from hearty tagines and fluffy couscous to the iconic pastilla and sweet mint tea.",
    imagePath: LOCAL_IMAGES.marrakech
  },
  {
    slug: "budget-travel-africa",
    title: "How to Travel Africa on a Budget",
    paragraph: "Traveling in Africa doesn't have to break the bank. Learn practical tips for finding affordable accommodations, using local transport, and enjoying incredible experiences without overspending.",
    sourceUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "family-safari-adventures",
    title: "Planning the Perfect Family Safari Adventure",
    paragraph: "A family safari is a bonding experience like no other. Find out which parks are family-friendly, what ages are best for safari, and how to keep children engaged during game drives.",
    sourceUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "egypt-nile-cruises",
    title: "Nile River Cruises: What You Need to Know",
    paragraph: "Sailing down the Nile is one of the most romantic and relaxing ways to see Egypt's ancient wonders. Compare traditional dahabiya boats with modern cruisers to find the best fit for your trip.",
    imagePath: LOCAL_IMAGES.pyramids
  },
  {
    slug: "hiking-mount-kilimanjaro",
    title: "Preparing for the Mount Kilimanjaro Trek",
    paragraph: "Climbing Africa's highest peak is a major achievement. Learn about the different routes, training requirements, and essential gear needed to successfully reach the summit of Kilimanjaro.",
    sourceUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "cape-winelands-tour",
    title: "A Guide to South Africa's Cape Winelands",
    paragraph: "Just outside Cape Town lies a region of stunning valleys producing world-class wines. Discover the historic towns of Stellenbosch and Franschhoek, and the best vineyards to visit for tastings.",
    sourceUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "rwanda-gorilla-trekking",
    title: "The Ultimate Guide to Gorilla Trekking in Rwanda",
    paragraph: "Coming face-to-face with mountain gorillas in Volcanoes National Park is a profound experience. Find out about permits, physical requirements, and what to expect on this once-in-a-lifetime trek.",
    sourceUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "sustainable-tourism-africa",
    title: "Practicing Sustainable Tourism in Africa",
    paragraph: "Learn how to make your African travels more eco-friendly and beneficial to local communities. From choosing responsible lodges to minimizing plastic waste, every choice makes a difference.",
    sourceUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "victoria-falls-activities",
    title: "Beyond the View: Adrenaline Activities at Victoria Falls",
    paragraph: "Victoria Falls isn't just for sightseeing. Discover the thrilling activities available, from white-water rafting on the Zambezi River to bungee jumping and scenic helicopter flights.",
    sourceUrl: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1000&auto=format&fit=crop"
  }
];

async function uploadToCloudinary(filePath, publicId) {
  console.log(`Uploading ${publicId} to Cloudinary...`);
  try {
    const result = await cloudinary.uploader.upload(filePath, {
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
  console.log("Starting the new blog generation and seeding process...\n");

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
      // Use imagePath for AI images, fallback to sourceUrl for successful Unsplash ones
      const uploadSource = blog.imagePath || blog.sourceUrl;
      const cloudinaryUrl = await uploadToCloudinary(uploadSource, `blog-new-${blog.slug}`);
      await updateSupabase(blog, cloudinaryUrl, nextId + i);
      console.log("---");
    } catch (err) {
      console.error(`Failed to process "${blog.title}". Skipping...`);
    }
  }

  console.log("\nDone! 🎉 All 15 new blogs have been inserted.");
}

run();
