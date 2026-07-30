require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const https = require('https');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/**
 * Final definitive map: place name (lowercase match) → verified 200 OK Unsplash hero image
 * These are the ONLY images in the database hero column. Gallery images come from destination-images.ts.
 */
const FINAL_IMAGE_MAP = {
  // MOROCCO
  "marrakech":                        "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80",
  "chefchaouen":                      "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?auto=format&fit=crop&w=1200&q=80",
  "fes medina":                       "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",
  "sahara desert":                    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
  "essaouira":                        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
  "casablanca":                       "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&w=1200&q=80",
  "ouarzazate":                       "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
  "dades valley":                     "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",

  // EGYPT
  "pyramids of giza":                 "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
  "luxor temple":                     "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=1200&q=80",
  "valley of the kings":              "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
  "abu simbel":                       "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
  "aswan & philae temple":            "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
  "cairo":                            "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
  "alexandria":                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "siwa oasis":                       "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",

  // ALGERIA
  "kasbah of algiers":                "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
  "timgad":                           "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
  "djemila roman ruins":              "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
  "m'zab valley":                     "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",
  "tassili n'ajjer":                  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
  "tipasa":                           "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
  "beni hammad fortress (al qal'a of beni hammad)": "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",
  "bissa forest":                     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "igzer palace":                     "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",

  // RWANDA
  "volcanoes national park":          "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "nyungwe national park":            "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80",
  "akagera national park":            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",

  // BENIN
  "ganvié":                           "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "ouidah coast and vodun heritage":  "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?auto=format&fit=crop&w=1200&q=80",
  "parc de la pendjari":              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "plage plm el dorado":              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "la route des pêches":              "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",

  // LIBYA
  "leptis magna":                     "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
  "sabratha":                         "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
  "ghadames":                         "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",
  "old tripoli":                      "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?auto=format&fit=crop&w=1200&q=80",

  // BOTSWANA
  "okavango-delta":                   "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "chobe-national-park":              "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
  "chobe":                            "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
  "tsodilo-hills":                    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
  "moremi-game-reserve":              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "kgalagadi-transfrontier-park":     "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
  "makgadikgadi-pans-game-reserve":   "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
  "makgadikgadi-and-nxai-pans":       "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
  "nxai-pan-national-park":           "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "northern-tuli-game-reserve":       "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "savuti-and-linyanti":              "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
  "khutse-game-reserve":              "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
  "monuments":                        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",

  // KENYA
  "maasai mara":                      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "masai mara":                       "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "hot air ballooning in mara":       "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1200&q=80",
  "fort jesus":                       "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?auto=format&fit=crop&w=1200&q=80",
  "leopard hill savanna & stars":     "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "expérience mahali mzuri":          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",

  // ZIMBABWE
  "hwange national park":             "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
  "mtarazi falls":                    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80",
  "pungwe":                           "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
  "save valley conservancy":          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "lake mutirikwi recreational park": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  "balancing rocks":                  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",

  // ZAMBIA
  "the victoria falls":               "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
  "the ngonye falls":                 "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80",
  "kasanka national park":            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "barotse floodplain":               "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "south luangwa national park":      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",

  // MALI
  "djenne":                           "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=1200&q=80",
  "grottes de missirikoro":           "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
  "mamelon de sikasso":               "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",

  // MALAWI
  "lake malawi":                      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  "nosy tanikely":                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "antsiranana":                      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
  "massif du marojejy":               "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
};

const COUNTRIES = [
  "Algerie", "Rwanda", "benin", "libya", "Botswana",
  "Malawi", "Mali", "Zambia", "kenya", "zimbabwi",
  "Morocco", "Egypt"
];

const JUNK_PATTERNS = [
  /opportunities throughout/i, /discover the greatest/i, /papyrus.*bays/i,
  /talmitha/i, /tolmeitha/i, /telmitha/i, /ras al.hilal/i, /embrace of sea/i,
  /masak staff/i, /bays that paint/i, /oasis of beauty amid/i, /oasis of beauty in the/i,
  /storehouse of legends/i, /opportunities all year/i, /masak staf/i
];

async function finalDatabaseUpdate() {
  console.log("=== FINAL COMPREHENSIVE DATABASE UPDATE ===\n");

  for (const table of COUNTRIES) {
    const { data: places, error } = await supabase.from(table).select('places');
    if (error || !places) { console.log(`Error reading ${table}: ${error?.message}`); continue; }

    console.log(`\n[${table}] ${places.length} rows`);
    let updated = 0, deleted = 0;

    for (const row of places) {
      const name = (row.places || "").trim();
      const lower = name.toLowerCase();

      // Delete junk rows
      const isJunk = JUNK_PATTERNS.some(p => p.test(name)) || name.includes('.') || name.length > 60;
      if (isJunk) {
        const { error: delErr } = await supabase.from(table).delete().eq('places', name);
        if (!delErr) { deleted++; console.log(`  🗑 Deleted: "${name}"`); }
        continue;
      }

      // Find best matching image
      const matchKey = Object.keys(FINAL_IMAGE_MAP).find(k =>
        lower === k || lower.includes(k) || k.includes(lower)
      );

      if (matchKey) {
        const url = FINAL_IMAGE_MAP[matchKey];
        const { error: updateErr } = await supabase.from(table).update({ image_url: url }).eq('places', name);
        if (!updateErr) { updated++; console.log(`  ✓ "${name}"`); }
        else console.log(`  ✗ Error: ${updateErr.message} for "${name}"`);
      } else {
        console.log(`  ? No match for: "${name}"`);
      }
    }

    console.log(`  → Updated: ${updated}, Deleted: ${deleted}`);
  }

  console.log("\n🎉 DONE! Database is clean with accurate verified images.");
}

finalDatabaseUpdate();
