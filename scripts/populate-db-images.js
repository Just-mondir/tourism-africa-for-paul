require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const COUNTRIES = [
  "Algerie", "Rwanda", "benin", "libya", "Botswana", 
  "Malawi", "Mali", "Zambia", "kenya", "zimbabwi", 
  "Morocco", "Egypt"
];

const VERIFIED_IMAGE_IDS = [
  "1516026672322-bc52d61a55d5",
  "1523805009345-7448845a9e53",
  "1578637387939-43c525550085",
  "1539650116574-8efeb43e2750",
  "1509099836639-18ba1795216d",
  "1518709268805-4e9042af9f23",
  "1544644181-1484b3fdfc62",
  "1564760055775-d63b17a55c44",
  "1580502304784-8985b7eb7260",
  "1549180030-48bf079fb38a",
  "1512100356356-de1b84283e18",
  "1509316975850-ff9c5deb0cd9",
  "1590523741831-ab7e8b8f9c7f",
  "1547036967-23d11aacaee0",
  "1516483638261-f4dbaf036963",
  "1534447677768-be436bb09401",
  "1507525428034-b723cf961d3e",
  "1506744038136-46273834b3fb",
  "1511884642898-4c92249e20b6",
  "1501785888041-af3ef285b470",
  "1542314831-068cd1dbfeeb",
  "1566073771259-6a8506099945",
  "1571896349842-33c89424de2d",
  "1520250497591-112f2f40a3f4",
  "1470071459604-3b5ec3a7fe05",
  "1441974231531-c6227db76b6e",
  "1472214103451-9374bd1c798e",
  "1469854523086-cc02fe5d8800",
  "1503220317375-aaad61436b1b",
  "1500530855697-b586d89ba3ee"
];

function u(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
}

function get4ImagesForPlace(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const baseIndex = Math.abs(hash) % VERIFIED_IMAGE_IDS.length;
  
  const selected = [];
  for (let i = 0; i < 4; i++) {
    const idx = (baseIndex + i * 7) % VERIFIED_IMAGE_IDS.length;
    selected.push(u(VERIFIED_IMAGE_IDS[idx]));
  }
  return selected;
}

async function populateDB() {
  console.log("Starting full database image & cleanup update...");

  for (const table of COUNTRIES) {
    console.log(`\n--- Processing table: ${table} ---`);
    
    const { data: places, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`Error reading ${table}:`, error.message);
      continue;
    }

    if (!places || places.length === 0) continue;

    let updated = 0;
    let deleted = 0;

    for (const place of places) {
      const name = place.places || "";
      
      // Clean up bad records (junk sentences or dotted names)
      if (
        name.includes('.') || 
        name.length > 50 || 
        name.toLowerCase().includes('opportunities throughout') ||
        name.toLowerCase().includes('discover the greatest')
      ) {
        console.log(`  Deleting junk row: "${name}"`);
        if (place.id) {
          await supabase.from(table).delete().eq('id', place.id);
        } else {
          await supabase.from(table).delete().eq('places', name);
        }
        deleted++;
        continue;
      }

      // Generate 4 distinct verified image URLs
      const [hero, ...gallery] = get4ImagesForPlace(name + table);

      const updateData = {
        image_url: hero,
      };

      // Try updating with images array if column exists
      const { error: updateErr } = await supabase
        .from(table)
        .update({ image_url: hero, images: [hero, ...gallery] })
        .eq(place.id ? 'id' : 'places', place.id || name);

      if (updateErr) {
        // Fallback without images column
        await supabase
          .from(table)
          .update({ image_url: hero })
          .eq(place.id ? 'id' : 'places', place.id || name);
      }

      updated++;
    }

    console.log(`Table ${table}: Updated ${updated} places, Deleted ${deleted} junk rows.`);
  }

  console.log("\n✅ Database update complete!");
}

populateDB();
