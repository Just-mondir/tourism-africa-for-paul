-- ============================================================
-- OPTIONAL: Add multi-image support to all 12 country tables
-- Run this in Supabase → SQL Editor (safe, additive, no data loss)
-- ============================================================

ALTER TABLE "Algerie"   ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Rwanda"    ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "benin"     ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "libya"     ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Botswana"  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Malawi"    ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Mali"      ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Zambia"    ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "kenya"     ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "zimbabwi"  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Morocco"   ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE "Egypt"     ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';

-- ============================================================
-- HOW TO ADD IMAGES PER PLACE (after running above)
-- Example: Add 3 Cloudinary URLs to "Masai Mara" in kenya table
-- ============================================================

-- UPDATE "kenya"
-- SET images = ARRAY[
--   'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/masai-mara-1.jpg',
--   'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/masai-mara-2.jpg',
--   'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/masai-mara-3.jpg'
-- ]
-- WHERE places = 'Masai Mara';

-- ============================================================
-- NOTE: The app works WITHOUT running this SQL.
-- Curated Unsplash gallery images are used as fallback
-- and the query gracefully handles missing columns.
-- ============================================================
