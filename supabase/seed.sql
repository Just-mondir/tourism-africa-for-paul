-- Seed script for Supabase - Africa Tourism Website
-- This script creates tables and inserts example data focused on African destinations
-- 
-- NOTE: If you already have tables with data, you DON'T need to run this script.
-- This is just a reference for the table structure and example African tourism data.
--
-- INSTRUCTIONS:
-- 1. Log into your Supabase project
-- 2. Go to SQL Editor
-- 3. Only run this if you need to create the tables OR want to see example African data structure
-- 4. Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name if using images

-- ============================================
-- TABLE CREATION (only if tables don't exist)
-- ============================================

-- Table countries
CREATE TABLE IF NOT EXISTS countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Table destinations
CREATE TABLE IF NOT EXISTS destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Table posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID,
  metadata JSONB
);

-- Table contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_destinations_country_id ON destinations(country_id);
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);

-- ============================================
-- EXAMPLE AFRICAN TOURISM DATA (Optional)
-- Only run the INSERT statements below if you want example African data
-- ============================================

-- African Countries
INSERT INTO countries (id, name, slug, description, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Kenya', 'kenya', 'East African country famous for its wildlife safaris, the Great Migration, and stunning landscapes from savannas to beaches.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/countries/kenya.jpg'),
('22222222-2222-2222-2222-222222222222', 'South Africa', 'south-africa', 'Diverse nation at the southern tip of Africa, known for Table Mountain, wine regions, and incredible wildlife.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/countries/south-africa.jpg'),
('33333333-3333-3333-3333-333333333333', 'Morocco', 'morocco', 'North African country blending Arab, Berber, and European influences, with bustling medinas and Sahara Desert adventures.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/countries/morocco.jpg'),
('44444444-4444-4444-4444-444444444444', 'Egypt', 'egypt', 'Ancient civilization along the Nile River, home to the Pyramids of Giza, Sphinx, and rich historical treasures.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/countries/egypt.jpg')
ON CONFLICT (slug) DO NOTHING;

-- African Destinations
INSERT INTO destinations (id, name, slug, description, image_url, country_id) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Maasai Mara National Reserve', 'maasai-mara', 'One of Africa''s most famous game reserves, home to the Great Migration and incredible wildlife viewing.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/destinations/maasai-mara.jpg', '11111111-1111-1111-1111-111111111111'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Cape Town', 'cape-town', 'Stunning coastal city at the tip of Africa, featuring Table Mountain, beautiful beaches, and vibrant culture.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/destinations/cape-town.jpg', '22222222-2222-2222-2222-222222222222'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Marrakech', 'marrakech', 'Enchanting city with bustling souks, stunning palaces, and the vibrant Jemaa el-Fnaa square in the heart of Morocco.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/destinations/marrakech.jpg', '33333333-3333-3333-3333-333333333333'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Pyramids of Giza', 'pyramids-of-giza', 'Ancient wonder of the world, featuring the Great Pyramid, Sphinx, and thousands of years of Egyptian history.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/destinations/pyramids-giza.jpg', '44444444-4444-4444-4444-444444444444'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Kruger National Park', 'kruger-national-park', 'One of Africa''s largest game reserves, offering exceptional safari experiences and the Big Five wildlife.', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/destinations/kruger.jpg', '22222222-2222-2222-2222-222222222222')
ON CONFLICT (slug) DO NOTHING;

-- Africa Tourism Blog Posts
INSERT INTO posts (id, title, slug, excerpt, content, cover_image_url, published_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Ultimate Safari Guide: Best National Parks in Africa', 'ultimate-safari-guide-africa', 'Discover the best national parks and game reserves across Africa for an unforgettable safari experience. From Kenya to South Africa, explore diverse wildlife and stunning landscapes.', '<h2>Introduction</h2><p>Africa is home to some of the world''s most incredible wildlife and national parks. Whether you''re seeking the Big Five or breathtaking landscapes, these destinations offer unforgettable safari experiences.</p><h2>Maasai Mara, Kenya</h2><p>Witness the Great Migration, where millions of wildebeest, zebras, and gazelles cross the Mara River in search of greener pastures. This annual spectacle is one of nature''s greatest shows.</p><h2>Kruger National Park, South Africa</h2><p>One of Africa''s largest game reserves, Kruger offers excellent infrastructure and incredible opportunities to spot the Big Five: lions, leopards, elephants, buffalo, and rhinos.</p>', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/posts/africa-safari-guide.jpg', NOW() - INTERVAL ''5 days''),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Exploring Moroccan Markets: A Guide to Shopping in Marrakech', 'moroccan-markets-marrakech-guide', 'Navigate the vibrant souks of Marrakech and discover hidden treasures, from handwoven rugs to authentic spices in Africa''s most colorful markets.', '<h2>Introduction</h2><p>The souks of Marrakech are a feast for the senses. Wandering through the narrow alleys of the medina, you''ll discover everything from traditional handicrafts to aromatic spices.</p><h2>Jemaa el-Fnaa Square</h2><p>Start your market adventure at this bustling central square, where snake charmers, storytellers, and food vendors create an unforgettable atmosphere.</p>', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/posts/marrakech-markets.jpg', NOW() - INTERVAL ''3 days''),
('cccccccc-cccc-cccc-cccc-ccccccccccc1', 'Cape Town Travel Tips: Best Time to Visit and Top Attractions', 'cape-town-travel-tips', 'Plan your perfect trip to Cape Town with our guide to the best seasons, must-see attractions, and insider tips for exploring South Africa''s Mother City.', '<h2>Introduction</h2><p>Cape Town combines natural beauty, rich history, and vibrant culture. From Table Mountain to the wine regions, discover what makes this city so special.</p><h2>Best Time to Visit</h2><p>The best time to visit Cape Town is during the summer months (December to March) when the weather is warm and sunny, perfect for outdoor activities and beach visits.</p>', 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/posts/cape-town-tips.jpg', NOW() - INTERVAL ''1 day'')
ON CONFLICT (slug) DO NOTHING;

-- Note: Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name if you're using Cloudinary for images
-- Update image URLs with your own Cloudinary URLs after uploading images
