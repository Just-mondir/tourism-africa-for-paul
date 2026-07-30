/**
 * DESTINATION IMAGES LIBRARY
 * Every entry maps a place slug → {hero, gallery[3]}
 * All IDs tested 200 OK from Unsplash.
 * Wikimedia URLs are loaded by Next.js <Image> directly (whitelisted in next.config.js).
 */

export interface DestinationGalleryImages {
  hero: string;
  gallery: string[];
}

export const VERIFIED_IMAGE_IDS = [
  "1516026672322-bc52d61a55d5", "1523805009345-7448845a9e53",
  "1578637387939-43c525550085", "1539650116574-8efeb43e2750",
  "1509099836639-18ba1795216d", "1518709268805-4e9042af9f23",
  "1544644181-1484b3fdfc62",   "1564760055775-d63b17a55c44",
  "1580502304784-8985b7eb7260","1549180030-48bf079fb38a",
  "1512100356356-de1b84283e18","1509316975850-ff9c5deb0cd9",
  "1590523741831-ab7e8b8f9c7f","1547036967-23d11aacaee0",
  "1516483638261-f4dbaf036963","1534447677768-be436bb09401",
  "1507525428034-b723cf961d3e","1506744038136-46273834b3fb",
  "1511884642898-4c92249e20b6","1501785888041-af3ef285b470",
  "1542314831-068cd1dbfeeb",   "1566073771259-6a8506099945",
  "1571896349842-33c89424de2d","1520250497591-112f2f40a3f4",
  "1470071459604-3b5ec3a7fe05","1441974231531-c6227db76b6e",
  "1472214103451-9374bd1c798e","1469854523086-cc02fe5d8800",
  "1503220317375-aaad61436b1b","1500530855697-b586d89ba3ee",
];

export function u(id: string, w = 1200, h = 800): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

function wiki(file: string): string {
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${file}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL PLACE → IMAGE MAP
// ─────────────────────────────────────────────────────────────────────────────
export const DESTINATION_IMAGES: Record<string, DestinationGalleryImages> = {

  // ══════════════════ MOROCCO ══════════════════
  "marrakech": {
    hero: u("1597212618440-806262de4f6b"),
    gallery: [
      u("1548013146-72479768bada"),  // Jemaa el-Fnaa souks
      u("1539037116277-4db20889f2d4"), // Majorelle Garden
      u("1553603227-2358aabe821e"),   // Moroccan lanterns
    ],
  },
  "chefchaouen": {
    hero: u("1569383746724-6f1b882b8f46"),
    gallery: [
      u("1558204692-558c73362b08"),  // Blue alley
      u("1579282240050-352db0a14c21"), // Mountain panorama
      u("1516483638261-f4dbaf036963"),
    ],
  },
  "fes-medina": {
    hero: u("1549180030-48bf079fb38a"),
    gallery: [
      u("1579282240050-352db0a14c21"),
      u("1548013146-72479768bada"),
      u("1553603227-2358aabe821e"),
    ],
  },
  "sahara-desert": {
    hero: u("1509316975850-ff9c5deb0cd9"),
    gallery: [
      u("1539650116574-8efeb43e2750"), // Erg Chebbi dunes
      u("1469854523086-cc02fe5d8800"), // Desert sunset camp
      u("1500530855697-b586d89ba3ee"),
    ],
  },
  "essaouira": {
    hero: u("1516483638261-f4dbaf036963"),
    gallery: [
      u("1590523741831-ab7e8b8f9c7f"),
      u("1507525428034-b723cf961d3e"),
      u("1580502304784-8985b7eb7260"),
    ],
  },
  "casablanca": {
    hero: u("1577147443647-81856d5151af"),
    gallery: [
      u("1580502304784-8985b7eb7260"),
      u("1542314831-068cd1dbfeeb"),
      u("1516483638261-f4dbaf036963"),
    ],
  },
  "ouarzazate": {
    hero: u("1539650116574-8efeb43e2750"),
    gallery: [
      u("1509316975850-ff9c5deb0cd9"),
      u("1544644181-1484b3fdfc62"),
      u("1549180030-48bf079fb38a"),
    ],
  },
  "dades-valley": {
    hero: u("1544644181-1484b3fdfc62"),
    gallery: [
      u("1509099836639-18ba1795216d"),
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
    ],
  },

  // ══════════════════ EGYPT ══════════════════
  "pyramids-of-giza": {
    hero: u("1503177119275-0aa32b3a9368"),
    gallery: [
      u("1568605117036-5fe5e7bab0b7"),
      u("1578637387939-43c525550085"),
      u("1539650116574-8efeb43e2750"),
    ],
  },
  "luxor-temple": {
    hero: u("1553913861-c0fddf2619ee"),
    gallery: [
      u("1568605117036-5fe5e7bab0b7"),
      u("1503177119275-0aa32b3a9368"),
      u("1578637387939-43c525550085"),
    ],
  },
  "valley-of-the-kings": {
    hero: u("1568605117036-5fe5e7bab0b7"),
    gallery: [
      u("1553913861-c0fddf2619ee"),
      u("1503177119275-0aa32b3a9368"),
      u("1578637387939-43c525550085"),
    ],
  },
  "abu-simbel": {
    hero: u("1568605117036-5fe5e7bab0b7"),
    gallery: [
      u("1503177119275-0aa32b3a9368"),
      u("1553913861-c0fddf2619ee"),
      u("1578637387939-43c525550085"),
    ],
  },
  "aswan-philae-temple": {
    hero: u("1503177119275-0aa32b3a9368"),
    gallery: [
      u("1553913861-c0fddf2619ee"),
      u("1568605117036-5fe5e7bab0b7"),
      u("1578637387939-43c525550085"),
    ],
  },
  "cairo": {
    hero: u("1578637387939-43c525550085"),
    gallery: [
      u("1503177119275-0aa32b3a9368"),
      u("1568605117036-5fe5e7bab0b7"),
      u("1553913861-c0fddf2619ee"),
    ],
  },
  "alexandria": {
    hero: u("1507525428034-b723cf961d3e"),
    gallery: [
      u("1580502304784-8985b7eb7260"),
      u("1590523741831-ab7e8b8f9c7f"),
      u("1516483638261-f4dbaf036963"),
    ],
  },
  "siwa-oasis": {
    hero: u("1549180030-48bf079fb38a"),
    gallery: [
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
      u("1469854523086-cc02fe5d8800"),
    ],
  },

  // ══════════════════ ALGERIA ══════════════════
  "kasbah-of-algiers": {
    hero: wiki("6/64/Kasbah_of_Algiers_2.jpg/1200px-Kasbah_of_Algiers_2.jpg"),
    gallery: [
      u("1516483638261-f4dbaf036963"),
      u("1580502304784-8985b7eb7260"),
      u("1549180030-48bf079fb38a"),
    ],
  },
  "timgad": {
    hero: wiki("3/36/Arch_of_Trajan%2C_Timgad.jpg/1200px-Arch_of_Trajan%2C_Timgad.jpg"),
    gallery: [
      u("1544644181-1484b3fdfc62"),
      u("1509099836639-18ba1795216d"),
      u("1539650116574-8efeb43e2750"),
    ],
  },
  "djemila-roman-ruins": {
    hero: wiki("2/2f/Djemila_Cuicul_Roman_ruins_Setif_Algeria.jpg/1200px-Djemila_Cuicul_Roman_ruins_Setif_Algeria.jpg"),
    gallery: [
      u("1544644181-1484b3fdfc62"),
      u("1509099836639-18ba1795216d"),
      u("1509316975850-ff9c5deb0cd9"),
    ],
  },
  "mzab-valley": {
    hero: wiki("7/7b/Ghardaia_M%27Zab.jpg/1200px-Ghardaia_M%27Zab.jpg"),
    gallery: [
      u("1549180030-48bf079fb38a"),
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
    ],
  },
  "tassili-najjer": {
    hero: wiki("0/05/Tassili-n-Ajjer-Rock-Arch.jpg/1200px-Tassili-n-Ajjer-Rock-Arch.jpg"),
    gallery: [
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
      u("1469854523086-cc02fe5d8800"),
    ],
  },
  "tipasa": {
    hero: wiki("1/15/Tipasa_Roman_ruins_sea.jpg/1200px-Tipasa_Roman_ruins_sea.jpg"),
    gallery: [
      u("1590523741831-ab7e8b8f9c7f"),
      u("1516483638261-f4dbaf036963"),
      u("1507525428034-b723cf961d3e"),
    ],
  },
  "beni-hammad-fortress": {
    hero: wiki("e/e0/Minaret_Qal%27at_Beni_Hammad.jpg/1200px-Minaret_Qal%27at_Beni_Hammad.jpg"),
    gallery: [
      u("1544644181-1484b3fdfc62"),
      u("1509099836639-18ba1795216d"),
      u("1539650116574-8efeb43e2750"),
    ],
  },
  "bissa-forest": {
    hero: u("1441974231531-c6227db76b6e"),
    gallery: [
      u("1511884642898-4c92249e20b6"),
      u("1564760055775-d63b17a55c44"),
      u("1509099836639-18ba1795216d"),
    ],
  },
  "igzer-palace": {
    hero: u("1549180030-48bf079fb38a"),
    gallery: [
      u("1539650116574-8efeb43e2750"),
      u("1544644181-1484b3fdfc62"),
      u("1509316975850-ff9c5deb0cd9"),
    ],
  },

  // ══════════════════ RWANDA ══════════════════
  "volcanoes-national-park": {
    hero: u("1516026672322-bc52d61a55d5"),
    gallery: [
      u("1564760055775-d63b17a55c44"),
      u("1509099836639-18ba1795216d"),
      u("1441974231531-c6227db76b6e"),
    ],
  },
  "nyungwe-national-park": {
    hero: u("1564760055775-d63b17a55c44"),
    gallery: [
      u("1511884642898-4c92249e20b6"),
      u("1441974231531-c6227db76b6e"),
      u("1509099836639-18ba1795216d"),
    ],
  },
  "akagera-national-park": {
    hero: u("1518709268805-4e9042af9f23"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1516026672322-bc52d61a55d5"),
      u("1501785888041-af3ef285b470"),
    ],
  },

  // ══════════════════ BENIN ══════════════════
  "ganvie": {
    hero: wiki("8/87/Ganvie_Benin_Stilt_Village.jpg/1200px-Ganvie_Benin_Stilt_Village.jpg"),
    gallery: [
      u("1507525428034-b723cf961d3e"),
      u("1512100356356-de1b84283e18"),
      u("1590523741831-ab7e8b8f9c7f"),
    ],
  },
  "ouidah-coast-and-vodun-heritage": {
    hero: wiki("c/c2/Door_of_No_Return_Ouidah_Benin.jpg/1200px-Door_of_No_Return_Ouidah_Benin.jpg"),
    gallery: [
      u("1507525428034-b723cf961d3e"),
      u("1512100356356-de1b84283e18"),
      u("1580502304784-8985b7eb7260"),
    ],
  },
  "parc-de-la-pendjari": {
    hero: u("1518709268805-4e9042af9f23"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1516026672322-bc52d61a55d5"),
      u("1509099836639-18ba1795216d"),
    ],
  },

  // ══════════════════ LIBYA ══════════════════
  "leptis-magna": {
    hero: wiki("2/2c/Leptis_Magna_Arch_Septimius_Severus.jpg/1200px-Leptis_Magna_Arch_Septimius_Severus.jpg"),
    gallery: [
      u("1544644181-1484b3fdfc62"),
      u("1509099836639-18ba1795216d"),
      u("1590523741831-ab7e8b8f9c7f"),
    ],
  },
  "sabratha": {
    hero: wiki("d/d7/Theatre_of_Sabratha.jpg/1200px-Theatre_of_Sabratha.jpg"),
    gallery: [
      u("1590523741831-ab7e8b8f9c7f"),
      u("1544644181-1484b3fdfc62"),
      u("1516483638261-f4dbaf036963"),
    ],
  },
  "ghadames": {
    hero: wiki("6/6f/Ghadames_Old_Town_Libya.jpg/1200px-Ghadames_Old_Town_Libya.jpg"),
    gallery: [
      u("1549180030-48bf079fb38a"),
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
    ],
  },
  "old-tripoli": {
    hero: wiki("a/a2/Red_Castle_Tripoli_Libya.jpg/1200px-Red_Castle_Tripoli_Libya.jpg"),
    gallery: [
      u("1580502304784-8985b7eb7260"),
      u("1516483638261-f4dbaf036963"),
      u("1590523741831-ab7e8b8f9c7f"),
    ],
  },

  // ══════════════════ BOTSWANA ══════════════════
  "okavango-delta": {
    hero: u("1516026672322-bc52d61a55d5"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1501785888041-af3ef285b470"),
      u("1518709268805-4e9042af9f23"),
    ],
  },
  "chobe-national-park": {
    hero: u("1523805009345-7448845a9e53"),
    gallery: [
      u("1518709268805-4e9042af9f23"),
      u("1516026672322-bc52d61a55d5"),
      u("1520250497591-112f2f40a3f4"),
    ],
  },
  "tsodilo-hills": {
    hero: u("1509099836639-18ba1795216d"),
    gallery: [
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
      u("1469854523086-cc02fe5d8800"),
    ],
  },
  "moremi-game-reserve": {
    hero: u("1518709268805-4e9042af9f23"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1516026672322-bc52d61a55d5"),
      u("1501785888041-af3ef285b470"),
    ],
  },
  "kgalagadi-transfrontier-park": {
    hero: u("1539650116574-8efeb43e2750"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1509099836639-18ba1795216d"),
      u("1518709268805-4e9042af9f23"),
    ],
  },
  "makgadikgadi-pans-game-reserve": {
    hero: u("1509316975850-ff9c5deb0cd9"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1539650116574-8efeb43e2750"),
      u("1516026672322-bc52d61a55d5"),
    ],
  },

  // ══════════════════ KENYA ══════════════════
  "maasai-mara": {
    hero: u("1516026672322-bc52d61a55d5"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1518709268805-4e9042af9f23"),
      u("1520250497591-112f2f40a3f4"),
    ],
  },
  "hot-air-ballooning-in-mara": {
    hero: u("1547036967-23d11aacaee0"),
    gallery: [
      u("1516026672322-bc52d61a55d5"),
      u("1518709268805-4e9042af9f23"),
      u("1523805009345-7448845a9e53"),
    ],
  },
  "fort-jesus": {
    hero: wiki("d/d1/Fort_Jesus_Mombasa_Kenya.jpg/1200px-Fort_Jesus_Mombasa_Kenya.jpg"),
    gallery: [
      u("1516483638261-f4dbaf036963"),
      u("1580502304784-8985b7eb7260"),
      u("1590523741831-ab7e8b8f9c7f"),
    ],
  },

  // ══════════════════ ZIMBABWE ══════════════════
  "hwange-national-park": {
    hero: u("1523805009345-7448845a9e53"),
    gallery: [
      u("1518709268805-4e9042af9f23"),
      u("1516026672322-bc52d61a55d5"),
      u("1520250497591-112f2f40a3f4"),
    ],
  },
  "mtarazi-falls": {
    hero: u("1564760055775-d63b17a55c44"),
    gallery: [
      u("1544644181-1484b3fdfc62"),
      u("1509099836639-18ba1795216d"),
      u("1511884642898-4c92249e20b6"),
    ],
  },
  "balancing-rocks": {
    hero: u("1509099836639-18ba1795216d"),
    gallery: [
      u("1539650116574-8efeb43e2750"),
      u("1509316975850-ff9c5deb0cd9"),
      u("1500530855697-b586d89ba3ee"),
    ],
  },
  "lake-mutirikwi-recreational-park": {
    hero: u("1501785888041-af3ef285b470"),
    gallery: [
      u("1506744038136-46273834b3fb"),
      u("1518709268805-4e9042af9f23"),
      u("1516026672322-bc52d61a55d5"),
    ],
  },

  // ══════════════════ ZAMBIA ══════════════════
  "the-victoria-falls": {
    hero: u("1544644181-1484b3fdfc62"),
    gallery: [
      u("1564760055775-d63b17a55c44"),
      u("1509099836639-18ba1795216d"),
      u("1518709268805-4e9042af9f23"),
    ],
  },
  "the-ngonye-falls": {
    hero: u("1564760055775-d63b17a55c44"),
    gallery: [
      u("1544644181-1484b3fdfc62"),
      u("1509099836639-18ba1795216d"),
      u("1511884642898-4c92249e20b6"),
    ],
  },
  "kasanka-national-park": {
    hero: u("1516026672322-bc52d61a55d5"),
    gallery: [
      u("1518709268805-4e9042af9f23"),
      u("1523805009345-7448845a9e53"),
      u("1511884642898-4c92249e20b6"),
    ],
  },
  "south-luangwa-national-park": {
    hero: u("1518709268805-4e9042af9f23"),
    gallery: [
      u("1523805009345-7448845a9e53"),
      u("1516026672322-bc52d61a55d5"),
      u("1520250497591-112f2f40a3f4"),
    ],
  },

  // ══════════════════ MALI ══════════════════
  "djenne": {
    hero: wiki("1/1d/Great_Mosque_of_Djenn%C3%A9_1.jpg/1200px-Great_Mosque_of_Djenn%C3%A9_1.jpg"),
    gallery: [
      u("1549180030-48bf079fb38a"),
      u("1539650116574-8efeb43e2750"),
      u("1509099836639-18ba1795216d"),
    ],
  },

  // ══════════════════ MALAWI ══════════════════
  "lake-malawi": {
    hero: u("1501785888041-af3ef285b470"),
    gallery: [
      u("1507525428034-b723cf961d3e"),
      u("1512100356356-de1b84283e18"),
      u("1506744038136-46273834b3fb"),
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY RESOLVER
// ─────────────────────────────────────────────────────────────────────────────
export function getDestinationGallery(
  placeSlug: string,
  dbImageUrl?: string | null
): DestinationGalleryImages {
  const staticImages = DESTINATION_IMAGES[placeSlug];

  if (staticImages) {
    return {
      hero: dbImageUrl && !dbImageUrl.includes("unsplash.com/photo-1516026672322") ? dbImageUrl : staticImages.hero,
      gallery: staticImages.gallery,
    };
  }

  // Dynamic fallback — picks 4 DISTINCT verified images based on slug hash
  let hash = 0;
  for (let i = 0; i < placeSlug.length; i++) {
    hash = placeSlug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const baseIndex = Math.abs(hash) % VERIFIED_IMAGE_IDS.length;

  const selected: string[] = [];
  for (let i = 0; i < 4; i++) {
    const idx = (baseIndex + i * 7) % VERIFIED_IMAGE_IDS.length;
    selected.push(u(VERIFIED_IMAGE_IDS[idx]));
  }

  return {
    hero: dbImageUrl || selected[0],
    gallery: selected.slice(1),
  };
}

export function getFlightSearchQuery(placeName: string, countryName: string): string {
  return encodeURIComponent(`flights to ${placeName} ${countryName}`);
}

export function getBookingUrl(placeName: string, countryName: string): string {
  const query = encodeURIComponent(`${placeName}, ${countryName}`);
  return `https://www.booking.com/searchresults.html?ss=${query}&lang=en-us&sb=1&src_elem=sb`;
}

export function getFlightsUrl(placeName: string, countryName: string): string {
  const query = encodeURIComponent(`flights to ${placeName} ${countryName}`);
  return `https://www.google.com/travel/flights?q=${query}`;
}
