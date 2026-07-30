export type FlagshipDestination = {
  countrySlug: string;
  countryName: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  bestTime: string;
  idealStay: string;
  base: string;
  overview: string[];
  attractions: Array<{ title: string; details: string }>;
  logistics: string[];
  stay: string[];
  eat: string[];
  costs: Array<{ label: string; range: string; notes?: string }>;
  lodging: {
    luxury: Array<{ name: string; url: string }>;
    midrange: Array<{ name: string; url: string }>;
    budget: Array<{ name: string; url: string }>;
    local: Array<{ name: string; url: string }>;
  };
  dining: {
    best: Array<{ name: string; url: string }>;
    specialties: string[];
    mealBudget: string;
  };
  budget: {
    activities: string[];
    daily: string[];
    entrance: string[];
  };
  safety: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const FLAGSHIP_DESTINATIONS: FlagshipDestination[] = [
  {
    countrySlug: "algerie",
    countryName: "Algeria",
    slug: "tassili-najjer",
    title: "Tassili n'Ajjer",
    subtitle: "Sahara sandstone labyrinth with prehistoric rock art and desert panoramas.",
    heroImage: "/destinationHero.webp",
    bestTime: "October to March",
    idealStay: "3 to 5 days",
    base: "Djanet",
    overview: [
      "Tassili n'Ajjer is a vast sandstone plateau in southeast Algeria, famous for wind-carved arches, canyons, and one of the largest rock art collections in the Sahara.",
      "Trips mix 4x4 travel with short hikes to viewpoints, dunes, and hidden gueltas, ending with nights in desert camps under exceptionally clear skies.",
    ],
    attractions: [
      {
        title: "Sefar rock art plateau",
        details: "A natural gallery of ancient engravings and paintings that reveal pastoral life thousands of years ago.",
      },
      {
        title: "Tin Aboteka arch",
        details: "A monumental stone arch that frames the dunes and glows at sunrise and sunset.",
      },
      {
        title: "Tadrart Rouge dunes",
        details: "Rust-colored dunes ideal for short hikes, photography, and stargazing camps.",
      },
      {
        title: "Iherir oasis",
        details: "A green ribbon of palms and water channels tucked into the plateau's canyons.",
      },
      {
        title: "Djanet palm groves",
        details: "A desert town base with markets, Tuareg culture, and easy access to the plateau.",
      },
    ],
    logistics: [
      "Fly to Djanet via Algiers; flights are limited so book early.",
      "A licensed guide and 4x4 are required; agencies handle permits and routes.",
      "Visit in the cooler season (Oct to Mar); summer heat is extreme.",
      "Pack layers for cold nights, plus sun protection for day hikes.",
      "Bring extra water, cash, and power banks as services are minimal.",
    ],
    stay: [
      "Desert bivouac camps for immersive nights under the stars.",
      "Guesthouses and small hotels in Djanet for pre and post-trek comfort.",
      "Simple lodges in Illizi for alternate access routes.",
    ],
    eat: [
      "Couscous, tagine, and grilled meats served in Djanet cafes.",
      "Fresh flatbread, dates, and mint tea offered at camps.",
      "Vegetable stews and hearty soups prepared by guides on multi-day routes.",
    ],
    costs: [
      { label: "Guided 4x4 circuit", range: "Moderate to high", notes: "Varies by route length and group size." },
      { label: "Camping or lodge", range: "Low to moderate", notes: "Desert camps are often included in tours." },
      { label: "Domestic flights", range: "Moderate", notes: "Algiers to Djanet fares vary by season." },
      { label: "Park fees and permits", range: "Low", notes: "Usually arranged by the tour operator." },
    ],
    lodging: {
      luxury: [
        {
          name: "Lodges confortables a Djanet avec services complets.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20lodge%20djanet%20algeria",
        },
      ],
      midrange: [
        {
          name: "Hotels milieu de gamme a Djanet proches du centre.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20hotel%20djanet%20algeria",
        },
      ],
      budget: [
        {
          name: "Guesthouses simples et camping accompagne.",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouse%20djanet%20algeria",
        },
      ],
      local: [
        {
          name: "Bivouac desert avec guides touareg.",
          url: "https://www.google.com/maps/search/?api=1&query=desert%20camp%20djanet%20algeria",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants locaux a Djanet pour cuisine saharienne.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20djanet%20algeria",
        },
        {
          name: "Cafes traditionnels avec the a la menthe.",
          url: "https://www.google.com/maps/search/?api=1&query=cafe%20djanet%20algeria",
        },
      ],
      specialties: [
        "Couscous saharien et tajine d'agneau.",
        "Dattes, pain plat, et soupes chaudes du desert.",
      ],
      mealBudget: "Repas local: bas a moyen; restaurants plus touristiques: moyen.",
    },
    budget: {
      activities: [
        "Circuit 4x4 guide et bivouac: moyen a eleve.",
        "Randonnees encadrees et excursions aux dunes: moyen.",
      ],
      daily: [
        "Economique: bas si camping et repas simples.",
        "Moyen: moyen avec hotels locaux et guide partage.",
        "Premium: eleve avec circuit prive et lodge confort.",
      ],
      entrance: [
        "Permis et acces parc: bas (souvent inclus).",
      ],
    },
    safety: [
      "Travel with a registered guide and follow route advice.",
      "Respect rock art sites and avoid touching or climbing on panels.",
      "Carry ample water and avoid hiking in midday heat.",
      "Check current travel advisories before confirming plans.",
    ],
    faqs: [
      {
        question: "Do I need a guide to visit?",
        answer: "Yes. The park requires registered guides and organized transport for access and safety.",
      },
      {
        question: "How many days should I plan?",
        answer: "Three to five days covers the highlights; longer trips reach more remote canyons.",
      },
      {
        question: "Is it suitable for families?",
        answer: "Yes, with shorter hikes and a slower pace. Discuss options with your guide.",
      },
      {
        question: "Are there facilities inside the park?",
        answer: "Facilities are limited; most tours are fully supported with camp setups.",
      },
    ],
  },
  {
    countrySlug: "rwanda",
    countryName: "Rwanda",
    slug: "volcanoes-national-park",
    title: "Volcanoes National Park",
    subtitle: "Mist-covered volcanoes and unforgettable mountain gorilla encounters.",
    heroImage: "/destinationHero.webp",
    bestTime: "June to September and December to February",
    idealStay: "2 to 4 days",
    base: "Musanze",
    overview: [
      "Volcanoes National Park is Rwanda's premier wildlife experience, home to endangered mountain gorillas and golden monkeys in a lush volcanic landscape.",
      "Treks move through bamboo forests and cloud forest trails, with chances to add crater hikes or cultural visits around Musanze.",
    ],
    attractions: [
      {
        title: "Mountain gorilla trekking",
        details: "Small guided groups track gorilla families and spend a regulated hour observing them.",
      },
      {
        title: "Golden monkey trek",
        details: "A shorter, lively trek to see playful troops in the bamboo zone.",
      },
      {
        title: "Dian Fossey Tomb and Research Center",
        details: "A historical hike highlighting gorilla conservation efforts.",
      },
      {
        title: "Mount Bisoke hike",
        details: "A rewarding day hike to a crater lake with dramatic views.",
      },
      {
        title: "Twin Lakes viewpoint",
        details: "Scenic overlooks of Lakes Burera and Ruhondo near Musanze.",
      },
    ],
    logistics: [
      "Fly into Kigali and drive about 2.5 hours to Musanze or Kinigi.",
      "Gorilla permits are limited and must be booked well in advance.",
      "Trekking can take 2 to 6 hours; porters are recommended.",
      "The dry seasons are best for trail conditions.",
      "Dress in layers and bring rain protection year-round.",
    ],
    stay: [
      "Luxury lodges near Kinigi with volcano views and full-service amenities.",
      "Mid-range hotels and guesthouses in Musanze.",
      "Community lodges that support local projects.",
    ],
    eat: [
      "Rwandan favorites like brochettes, isombe, and plantain sides.",
      "Cafes and bakeries in Musanze for quick meals.",
      "Kigali offers modern dining if you add a city night.",
    ],
    costs: [
      { label: "Gorilla permit", range: "High", notes: "The largest expense; check current rates when booking." },
      { label: "Transport and transfers", range: "Moderate", notes: "Private transfers add comfort and flexibility." },
      { label: "Lodging", range: "Moderate to high", notes: "Rates vary by proximity to the park." },
      { label: "Porters and tips", range: "Low to moderate", notes: "Budget for porter support and guides." },
    ],
    lodging: {
      luxury: [
        {
          name: "Lodges de luxe a Kinigi avec vue sur les volcans.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20lodge%20kinigi%20rwanda",
        },
      ],
      midrange: [
        {
          name: "Hotels milieu de gamme et guesthouses a Musanze.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20hotel%20musanze%20rwanda",
        },
      ],
      budget: [
        {
          name: "Auberges simples et petites pensions locales.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20guesthouse%20musanze%20rwanda",
        },
      ],
      local: [
        {
          name: "Lodges communautaires qui soutiennent des projets locaux.",
          url: "https://www.google.com/maps/search/?api=1&query=community%20lodge%20kinigi%20rwanda",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants a Musanze avec cuisine locale moderne.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20musanze%20rwanda",
        },
        {
          name: "Bonnes adresses a Kigali si vous ajoutez une nuit en ville.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20kigali%20rwanda",
        },
      ],
      specialties: [
        "Brochettes, isombe, et accompagnements a base de plantain.",
        "Cafe rwandais et patisseries locales.",
      ],
      mealBudget: "Repas local: bas a moyen; restaurants haut de gamme: moyen a eleve.",
    },
    budget: {
      activities: [
        "Permis gorilles: eleve (reserve tres tot).",
        "Trek singes dores et randonnees: moyen.",
      ],
      daily: [
        "Economique: moyen (permis non inclus).",
        "Moyen: moyen a eleve avec transferts prives.",
        "Premium: eleve avec lodge de luxe.",
      ],
      entrance: [
        "Frais de parc inclus dans les permis officiels.",
      ],
    },
    safety: [
      "Follow ranger instructions and keep the required distance from gorillas.",
      "Do not trek if you feel unwell; health screening may be required.",
      "Stay on marked trails and avoid loud noises near wildlife.",
      "Secure valuables and keep rain gear handy on the trail.",
    ],
    faqs: [
      {
        question: "How early should I book permits?",
        answer: "As early as possible, especially for peak season dates.",
      },
      {
        question: "How difficult is the trek?",
        answer: "It ranges from moderate to challenging; a porter can help with balance and pace.",
      },
      {
        question: "Can children go gorilla trekking?",
        answer: "A minimum age applies; confirm current rules with the park authority.",
      },
      {
        question: "Is it worth staying more than one night?",
        answer: "Yes. Extra days allow for golden monkeys, crater hikes, or cultural experiences.",
      },
    ],
  },
  {
    countrySlug: "benin",
    countryName: "Benin",
    slug: "ouidah-coast-and-vodun-heritage",
    title: "Ouidah Coast and Vodun Heritage",
    subtitle: "History-rich coastal town blending beach time with cultural heritage.",
    heroImage: "/destinationHero.webp",
    bestTime: "November to March",
    idealStay: "2 to 3 days",
    base: "Ouidah or Cotonou",
    overview: [
      "Ouidah is a key stop on Benin's coast, known for its Atlantic history and vibrant Vodun culture.",
      "Travelers can pair moving historical sites with beach time and day trips to nearby lagoons and villages.",
    ],
    attractions: [
      {
        title: "Door of No Return",
        details: "A powerful monument at the end of the Route des Esclaves on the Atlantic shore.",
      },
      {
        title: "Route des Esclaves",
        details: "A historical walking route tracing the path from town to the sea.",
      },
      {
        title: "Temple of Pythons",
        details: "A small temple honoring living pythons and local spiritual traditions.",
      },
      {
        title: "Sacred Forest of Kpasse",
        details: "A quiet grove with legends, statues, and cultural storytelling.",
      },
      {
        title: "Ganvie stilt village",
        details: "A lagoon community reached by boat, ideal for a half-day excursion.",
      },
    ],
    logistics: [
      "Fly into Cotonou and drive 1 to 1.5 hours to Ouidah.",
      "Dry season (Nov to Mar) brings cooler, clearer days.",
      "Hire a local guide for history, museums, and spiritual sites.",
      "Combine with Grand Popo or Porto-Novo for a longer circuit.",
      "Carry small cash for entry fees and local transport.",
    ],
    stay: [
      "Boutique hotels and guesthouses in Ouidah.",
      "Beach resorts in Grand Popo for a relaxed extension.",
      "City hotels in Cotonou for dining and nightlife options.",
    ],
    eat: [
      "Fresh seafood, grilled fish, and spicy pepper sauces.",
      "Local staples like akassa, yam dishes, and fried plantain.",
      "Fruit markets with pineapple, mango, and citrus.",
    ],
    costs: [
      { label: "Local guides and transport", range: "Low to moderate", notes: "Prices are negotiable for day tours." },
      { label: "Lodging", range: "Low to moderate", notes: "Beachfront stays cost more in high season." },
      { label: "Site entry fees", range: "Low", notes: "Small fees for monuments and museums." },
      { label: "Boat to Ganvie", range: "Low", notes: "Short excursions are budget friendly." },
    ],
    lodging: {
      luxury: [
        {
          name: "Resorts de plage a Grand Popo avec services complets.",
          url: "https://www.google.com/maps/search/?api=1&query=beach%20resort%20grand%20popo%20benin",
        },
      ],
      midrange: [
        {
          name: "Hotels milieu de gamme a Ouidah ou Cotonou.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20hotel%20ouidah%20benin",
        },
      ],
      budget: [
        {
          name: "Guesthouses simples et auberges en ville.",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouse%20ouidah%20benin",
        },
      ],
      local: [
        {
          name: "Maisons d'hotes familiales et hebergements locaux.",
          url: "https://www.google.com/maps/search/?api=1&query=homestay%20ouidah%20benin",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants de fruits de mer a Ouidah et Cotonou.",
          url: "https://www.google.com/maps/search/?api=1&query=seafood%20restaurants%20ouidah%20benin",
        },
        {
          name: "Buvettes de plage avec poissons grilles.",
          url: "https://www.google.com/maps/search/?api=1&query=beach%20restaurants%20cotonou%20benin",
        },
      ],
      specialties: [
        "Poisson braise, akassa, igname et plantain.",
        "Sauces pimentees et fruits tropicaux.",
      ],
      mealBudget: "Repas local: bas; restaurants de plage: moyen.",
    },
    budget: {
      activities: [
        "Visites historiques et musees: bas.",
        "Excursion en pirogue vers Ganvie: bas a moyen.",
      ],
      daily: [
        "Economique: bas avec transports locaux.",
        "Moyen: moyen avec hotel confortable.",
        "Premium: moyen a eleve en resort balneaire.",
      ],
      entrance: [
        "Frais d'entree monuments et musees: bas.",
      ],
    },
    safety: [
      "Respect ceremonial spaces and ask before taking photos.",
      "Avoid isolated beaches after dark.",
      "Keep valuables secure in crowded markets.",
      "Stay hydrated in coastal heat.",
    ],
    faqs: [
      {
        question: "Do I need a guide for Vodun sites?",
        answer: "A guide adds context and helps navigate cultural etiquette.",
      },
      {
        question: "Is Ouidah a good base for Ganvie?",
        answer: "Yes, day trips by car and boat are straightforward.",
      },
      {
        question: "How long should I stay?",
        answer: "Two to three days covers the main sites and a beach break.",
      },
      {
        question: "Are ceremonies open to visitors?",
        answer: "Some are, but access varies. Always ask permission first.",
      },
    ],
  },
  {
    countrySlug: "libya",
    countryName: "Libya",
    slug: "leptis-magna",
    title: "Leptis Magna",
    subtitle: "One of the Mediterranean's most impressive Roman cities.",
    heroImage: "/destinationHero.webp",
    bestTime: "October to April",
    idealStay: "Half day to 1 day",
    base: "Tripoli",
    overview: [
      "Leptis Magna is a remarkably preserved Roman city on Libya's coast, with grand forums, basilicas, and bath complexes.",
      "Most travelers visit as a guided day trip from Tripoli, combining archaeology with coastal scenery.",
    ],
    attractions: [
      {
        title: "Severan Arch",
        details: "A monumental arch celebrating Emperor Septimius Severus, born in Leptis Magna.",
      },
      {
        title: "Old Forum and Basilica",
        details: "Colonnaded civic spaces that showcase Roman engineering and scale.",
      },
      {
        title: "Hadrianic Baths",
        details: "Expansive bath ruins with mosaics and towering walls.",
      },
      {
        title: "Amphitheater",
        details: "A seaside arena set into the landscape with sweeping views.",
      },
      {
        title: "Ancient harbor",
        details: "Remnants of port structures that once linked the city to the Mediterranean.",
      },
    ],
    logistics: [
      "Reach the site from Tripoli by private car or guided tour (about 1.5 to 2 hours).",
      "Permits and escorts may be required; plan through a local operator.",
      "Visit in cooler months (Oct to Apr) for comfortable walking.",
      "Expect limited services on site; bring water and sun protection.",
      "Check photography rules with your guide on arrival.",
    ],
    stay: [
      "Hotels in Tripoli are the most common base.",
      "Some travelers combine with nearby coastal towns for an extended stay.",
    ],
    eat: [
      "Tripoli restaurants serving couscous, grilled meats, and bazeen.",
      "Light snacks and picnic supplies recommended for the site visit.",
    ],
    costs: [
      { label: "Private transport", range: "Moderate", notes: "Costs rise with longer routes or security needs." },
      { label: "Guide services", range: "Moderate", notes: "Required for access and interpretation." },
      { label: "Site entry fees", range: "Low", notes: "Typically paid locally." },
      { label: "Meals", range: "Low to moderate", notes: "Most dining is in Tripoli." },
    ],
    lodging: {
      luxury: [
        {
          name: "Hotels haut de gamme a Tripoli avec services complets.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20hotel%20tripoli%20libya",
        },
      ],
      midrange: [
        {
          name: "Hotels milieu de gamme au centre de Tripoli.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20hotel%20tripoli%20libya",
        },
      ],
      budget: [
        {
          name: "Petits hotels et pensions avec services simples.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20hotel%20tripoli%20libya",
        },
      ],
      local: [
        {
          name: "Maisons d'hotes lorsque disponibles via agences locales.",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouse%20tripoli%20libya",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants a Tripoli avec cuisine mediterraneenne.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20tripoli%20libya",
        },
        {
          name: "Cafes traditionnels pour collations rapides.",
          url: "https://www.google.com/maps/search/?api=1&query=cafe%20tripoli%20libya",
        },
      ],
      specialties: [
        "Couscous libyen, bazin, et poissons grilles.",
        "Patisseries au miel et cafe fort.",
      ],
      mealBudget: "Repas simple: bas a moyen; restaurants haut de gamme: moyen.",
    },
    budget: {
      activities: [
        "Guide prive et interpretation du site: moyen.",
        "Transport prive depuis Tripoli: moyen.",
      ],
      daily: [
        "Economique: moyen avec hotel simple.",
        "Moyen: moyen a eleve avec chauffeur.",
        "Premium: eleve avec services prives.",
      ],
      entrance: [
        "Frais d'entree du site: bas.",
      ],
    },
    safety: [
      "Monitor travel advisories and only travel with approved operators.",
      "Carry identification and keep copies of travel documents.",
      "Stay with your group and avoid wandering into unmarked areas.",
      "Schedule visits in daylight hours.",
    ],
    faqs: [
      {
        question: "Is it possible to visit independently?",
        answer: "Most visits require a guide or operator for permits and logistics.",
      },
      {
        question: "How much time do I need?",
        answer: "Half a day is enough for highlights, but a full day allows deeper exploration.",
      },
      {
        question: "Is the site crowded?",
        answer: "It is often quiet, giving a more personal experience.",
      },
      {
        question: "Are there facilities on site?",
        answer: "Facilities are limited; plan to bring essentials.",
      },
    ],
  },
  {
    countrySlug: "botswana",
    countryName: "Botswana",
    slug: "okavango-delta",
    title: "Okavango Delta",
    subtitle: "Seasonal floodplains, mokoro safaris, and rich wildlife sightings.",
    heroImage: "/destinationHero.webp",
    bestTime: "May to October",
    idealStay: "3 to 5 days",
    base: "Maun",
    overview: [
      "The Okavango Delta is a vast inland wetland where seasonal floods create a mosaic of channels, islands, and wildlife-rich lagoons.",
      "Safari experiences range from mokoro canoe trips to game drives and walking safaris in protected concessions.",
    ],
    attractions: [
      {
        title: "Mokoro canoe safari",
        details: "Glide through reed-lined channels with expert polers and quiet wildlife encounters.",
      },
      {
        title: "Moremi Game Reserve",
        details: "A core wildlife area known for predators, elephants, and diverse habitats.",
      },
      {
        title: "Birding hotspots",
        details: "Look for fish eagles, herons, and colorful kingfishers along the waterways.",
      },
      {
        title: "Seasonal floodplains",
        details: "Witness shifting landscapes as water levels rise and fall across the delta.",
      },
      {
        title: "Sundowner cruises",
        details: "End the day with sunset views and riverbank wildlife sightings.",
      },
    ],
    logistics: [
      "Fly into Maun, then connect by light aircraft to camps.",
      "Peak water levels are usually mid-year, perfect for mokoro travel.",
      "Pack neutral clothing, a wide-brim hat, and insect repellent.",
      "Expect limited connectivity in the bush; plan offline maps.",
      "Travel with a licensed safari operator for park access.",
    ],
    stay: [
      "Luxury safari camps with full board and guided activities.",
      "Mobile safari tents for a closer-to-nature experience.",
      "Community-run lodges on the edge of the delta.",
    ],
    eat: [
      "Camp meals featuring fresh produce and grilled meats.",
      "Maun offers cafes and restaurants for pre or post-safari meals.",
    ],
    costs: [
      { label: "Safari camps", range: "High", notes: "All-inclusive rates cover guides and activities." },
      { label: "Light aircraft transfers", range: "High", notes: "Often the largest transport expense." },
      { label: "Park fees", range: "Moderate", notes: "Included in many packages." },
      { label: "Tips and extras", range: "Low to moderate", notes: "Budget for gratuities and optional activities." },
    ],
    lodging: {
      luxury: [
        {
          name: "Camps de luxe en concessions privees avec service complet.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20safari%20camp%20okavango%20delta%20botswana",
        },
      ],
      midrange: [
        {
          name: "Lodges milieu de gamme autour de Maun.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20lodge%20maun%20botswana",
        },
      ],
      budget: [
        {
          name: "Camps mobiles plus accessibles pour petits budgets.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20camp%20maun%20botswana",
        },
      ],
      local: [
        {
          name: "Lodges communautaires en bord de delta.",
          url: "https://www.google.com/maps/search/?api=1&query=community%20lodge%20okavango%20botswana",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants a Maun pour diners avant ou apres safari.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20maun%20botswana",
        },
        {
          name: "Repas prepares dans les camps safari.",
          url: "https://www.google.com/maps/search/?api=1&query=camp%20dining%20okavango%20delta",
        },
      ],
      specialties: [
        "Grillades et plats au feu de bois.",
        "Legumes frais et plats locaux selon disponibilite.",
      ],
      mealBudget: "Repas inclus en camp; a Maun: moyen.",
    },
    budget: {
      activities: [
        "Safaris mokoro et game drives: eleve.",
        "Vols legers vers les camps: eleve.",
      ],
      daily: [
        "Economique: moyen avec camp mobile.",
        "Moyen: eleve avec lodge confort.",
        "Premium: tres eleve avec lodge de luxe.",
      ],
      entrance: [
        "Frais de parc: moyen (souvent inclus).",
      ],
    },
    safety: [
      "Follow guide instructions around wildlife at all times.",
      "Keep distance from water edges where hippos and crocodiles gather.",
      "Use mosquito protection, especially at dusk.",
      "Stay inside camp boundaries after dark.",
    ],
    faqs: [
      {
        question: "Is the delta good year-round?",
        answer: "Yes, but water levels peak in mid-year, which is ideal for mokoro trips.",
      },
      {
        question: "Do I need a 4x4?",
        answer: "Most visitors use air transfers and guided vehicles provided by camps.",
      },
      {
        question: "How many days should I stay?",
        answer: "Three to five days gives time for water and land activities.",
      },
      {
        question: "Is it family friendly?",
        answer: "Some camps cater to families; confirm age policies in advance.",
      },
    ],
  },
  {
    countrySlug: "malawi",
    countryName: "Malawi",
    slug: "lake-malawi",
    title: "Lake Malawi",
    subtitle: "Crystal waters, relaxed beaches, and freshwater snorkeling.",
    heroImage: "/destinationHero.webp",
    bestTime: "May to October",
    idealStay: "3 to 5 days",
    base: "Cape Maclear or Nkhata Bay",
    overview: [
      "Lake Malawi is a vast freshwater lake with clear water, island retreats, and laid-back beach towns.",
      "It is ideal for swimming, kayaking, snorkeling, and slow travel between lakeshore villages.",
    ],
    attractions: [
      {
        title: "Cape Maclear",
        details: "A popular lakeside village with boat trips, snorkeling, and sunset cruises.",
      },
      {
        title: "Likoma Island",
        details: "Remote island charm with beaches and historic cathedral visits.",
      },
      {
        title: "Nkhata Bay",
        details: "Quiet coves and diving spots with a friendly local vibe.",
      },
      {
        title: "Cichlid snorkeling",
        details: "Colorful freshwater fish make the lake famous among snorkelers.",
      },
      {
        title: "Lakeshore markets",
        details: "Browse crafts, dried fish, and local produce in village stalls.",
      },
    ],
    logistics: [
      "Fly into Lilongwe or Blantyre, then drive 3 to 6 hours to the lake.",
      "Dry season (May to Oct) is best for clear water and road conditions.",
      "Bring water shoes for rocky shorelines and reef sandals.",
      "Ask locally about safe swimming zones and boat schedules.",
      "Cash is useful in smaller villages where ATMs are rare.",
    ],
    stay: [
      "Beach lodges with lakeside rooms and kayak rentals.",
      "Eco camps and backpacker hostels for budget stays.",
      "Island lodges on Likoma for a quiet escape.",
    ],
    eat: [
      "Chambo fish, grilled or fried, served with nsima.",
      "Fresh fruit juices and tropical produce at beach cafes.",
      "Simple local meals in village restaurants.",
    ],
    costs: [
      { label: "Accommodation", range: "Low to moderate", notes: "Budget options are widely available." },
      { label: "Boat trips", range: "Low to moderate", notes: "Island transfers cost more." },
      { label: "Meals", range: "Low", notes: "Local dishes are affordable." },
      { label: "Activities", range: "Low", notes: "Kayaks and snorkel rentals are inexpensive." },
    ],
    lodging: {
      luxury: [
        {
          name: "Lodges lacustres haut de gamme avec plages privees.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20lodge%20lake%20malawi",
        },
      ],
      midrange: [
        {
          name: "Lodges milieu de gamme a Cape Maclear ou Nkhata Bay.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20lodge%20cape%20maclear%20malawi",
        },
      ],
      budget: [
        {
          name: "Eco-camps et hostels pour voyageurs economes.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20hostel%20cape%20maclear%20malawi",
        },
      ],
      local: [
        {
          name: "Maisons d'hotes locales dans les villages du lac.",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouse%20lake%20malawi",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants de plage a Cape Maclear.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20cape%20maclear%20malawi",
        },
        {
          name: "Cafes conviviaux a Nkhata Bay.",
          url: "https://www.google.com/maps/search/?api=1&query=cafe%20nkhata%20bay%20malawi",
        },
      ],
      specialties: [
        "Chambo grille, nsima, et fruits tropicaux.",
        "Jus frais et collations locales.",
      ],
      mealBudget: "Repas local: bas; restaurants de plage: moyen.",
    },
    budget: {
      activities: [
        "Snorkeling et kayak: bas.",
        "Sorties en bateau et iles: bas a moyen.",
      ],
      daily: [
        "Economique: bas en lodge simple.",
        "Moyen: moyen avec activites nautiques.",
        "Premium: moyen a eleve sur les iles.",
      ],
      entrance: [
        "Frais d'entree du parc lacustre: bas.",
      ],
    },
    safety: [
      "Wear sun protection and stay hydrated.",
      "Use a life jacket for boat excursions.",
      "Confirm safe swimming zones with locals.",
      "Secure valuables when on the beach.",
    ],
    faqs: [
      {
        question: "Is the water clear for snorkeling?",
        answer: "Yes, especially during the dry season when visibility is best.",
      },
      {
        question: "How do I reach Likoma Island?",
        answer: "Ferries and small flights operate on limited schedules; book ahead.",
      },
      {
        question: "How long should I stay?",
        answer: "Three to five days allows time for beach and island hopping.",
      },
      {
        question: "Is it good for families?",
        answer: "Yes, with calm beaches and gentle activities, but always supervise swimming.",
      },
    ],
  },
  {
    countrySlug: "mali",
    countryName: "Mali",
    slug: "djenne",
    title: "Djenne",
    subtitle: "Iconic mud-brick architecture and a vibrant weekly market.",
    heroImage: "/destinationHero.webp",
    bestTime: "November to February",
    idealStay: "1 to 2 days",
    base: "Djenne or Mopti",
    overview: [
      "Djenne is famous for its monumental mud-brick mosque and the intricate architecture of its old town.",
      "A short stay offers a deep look at Sahelian culture, bustling markets, and river life.",
    ],
    attractions: [
      {
        title: "Great Mosque of Djenne",
        details: "The world's largest mud-brick structure, rebuilt annually with local craftsmanship.",
      },
      {
        title: "Weekly market",
        details: "A lively gathering where traders arrive by foot, boat, and cart.",
      },
      {
        title: "Old town alleys",
        details: "Narrow lanes with ornate wooden facades and traditional homes.",
      },
      {
        title: "Bani River views",
        details: "Peaceful river scenes at sunrise and sunset.",
      },
      {
        title: "Mopti day trip",
        details: "A nearby river town with markets and port activity.",
      },
    ],
    logistics: [
      "Access is typically via Mopti, with a 1.5 to 2 hour drive.",
      "Roads can be challenging in the rainy season; plan accordingly.",
      "The cool season (Nov to Feb) is the most comfortable.",
      "Local guides add context to the mosque and markets.",
      "Check current travel advisories before planning.",
    ],
    stay: [
      "Small guesthouses in Djenne with simple amenities.",
      "Hotels in Mopti if you prefer more services.",
    ],
    eat: [
      "Rice dishes with peanut or tomato sauces.",
      "Grilled fish from the river served with flatbread.",
      "Sweet tea and market snacks.",
    ],
    costs: [
      { label: "Transport from Mopti", range: "Low to moderate", notes: "Private vehicles cost more than shared taxis." },
      { label: "Accommodation", range: "Low", notes: "Guesthouses are budget friendly." },
      { label: "Guides and entry fees", range: "Low", notes: "Small fees for mosque and market visits." },
      { label: "Meals", range: "Low", notes: "Local food is affordable." },
    ],
    lodging: {
      luxury: [
        {
          name: "Hotels plus confortables a Mopti pour davantage de services.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20hotel%20mopti%20mali",
        },
      ],
      midrange: [
        {
          name: "Hotels milieu de gamme avec climatisation de base.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20hotel%20mopti%20mali",
        },
      ],
      budget: [
        {
          name: "Guesthouses familiales a Djenne.",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouse%20djenne%20mali",
        },
      ],
      local: [
        {
          name: "Maisons d'hotes traditionnelles avec accueil local.",
          url: "https://www.google.com/maps/search/?api=1&query=homestay%20djenne%20mali",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants locaux a Mopti et petits cafes a Djenne.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20mopti%20mali",
        },
        {
          name: "Stands du marche pour repas rapides.",
          url: "https://www.google.com/maps/search/?api=1&query=market%20djenne%20mali",
        },
      ],
      specialties: [
        "Riz sauce arachide, poisson grille, et pain plat.",
        "The sucre et collations du marche.",
      ],
      mealBudget: "Repas local: bas; options plus confortables: bas a moyen.",
    },
    budget: {
      activities: [
        "Guide local et visites de la mosquee: bas.",
        "Transport depuis Mopti: bas a moyen.",
      ],
      daily: [
        "Economique: bas avec guesthouse.",
        "Moyen: moyen avec hotel a Mopti.",
        "Premium: moyen (options limitees).",
      ],
      entrance: [
        "Frais de marche et mosquee: bas.",
      ],
    },
    safety: [
      "Check government travel advisories before visiting.",
      "Travel with a trusted guide and avoid night travel.",
      "Keep valuables secure in crowded markets.",
      "Respect local customs around religious sites.",
    ],
    faqs: [
      {
        question: "Can visitors enter the Great Mosque?",
        answer: "Access rules change; local guides can advise on current access and etiquette.",
      },
      {
        question: "Is a day trip enough?",
        answer: "Yes, but an overnight stay lets you see the market and evening atmosphere.",
      },
      {
        question: "When is the market day?",
        answer: "The main market is weekly; ask locally for the exact day during your visit.",
      },
      {
        question: "Is it safe to photograph?",
        answer: "Ask permission before photographing people or sacred sites.",
      },
    ],
  },
  {
    countrySlug: "zambia",
    countryName: "Zambia",
    slug: "south-luangwa-national-park",
    title: "South Luangwa National Park",
    subtitle: "Walking safaris, leopard sightings, and wild river landscapes.",
    heroImage: "/destinationHero.webp",
    bestTime: "June to October",
    idealStay: "3 to 4 days",
    base: "Mfuwe",
    overview: [
      "South Luangwa is renowned for walking safaris and strong predator sightings along the Luangwa River.",
      "The park's mix of woodlands, lagoons, and open plains makes for diverse game viewing.",
    ],
    attractions: [
      {
        title: "Walking safaris",
        details: "Guided walks reveal tracks, plants, and wildlife at ground level.",
      },
      {
        title: "Leopard spotting",
        details: "One of Africa's best regions for leopard sightings during night drives.",
      },
      {
        title: "Luangwa River",
        details: "Hippos, crocodiles, and birdlife gather along the riverbanks.",
      },
      {
        title: "Night drives",
        details: "Spot nocturnal animals with experienced guides after dark.",
      },
      {
        title: "Village visits",
        details: "Community programs offer insights into local life and conservation.",
      },
    ],
    logistics: [
      "Fly into Mfuwe, then transfer to your lodge in 30 to 60 minutes.",
      "Dry season (Jun to Oct) offers the best wildlife visibility.",
      "Pack neutral clothing, binoculars, and dust protection.",
      "Some camps close during the wet season (Nov to Mar).",
      "Plan at least three nights to enjoy walks and drives.",
    ],
    stay: [
      "Safari lodges along the river with all-inclusive packages.",
      "Tented camps for a classic bush experience.",
      "Community-run lodges outside the park.",
    ],
    eat: [
      "Lodge meals with local ingredients and fresh produce.",
      "Picnic breakfasts during longer game drives.",
    ],
    costs: [
      { label: "Safari packages", range: "Moderate to high", notes: "Includes guiding, meals, and activities." },
      { label: "Park fees", range: "Moderate", notes: "Often bundled with lodging." },
      { label: "Flights to Mfuwe", range: "Moderate", notes: "Limited schedules, book early." },
      { label: "Tips and extras", range: "Low to moderate", notes: "Budget for guides and staff." },
    ],
    lodging: {
      luxury: [
        {
          name: "Lodges de luxe au bord du fleuve avec services complets.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20lodge%20south%20luangwa%20zambia",
        },
      ],
      midrange: [
        {
          name: "Lodges milieu de gamme a Mfuwe.",
          url: "https://www.google.com/maps/search/?api=1&query=lodge%20mfuwe%20zambia",
        },
      ],
      budget: [
        {
          name: "Camps tentes plus simples et eco-lodges.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20camp%20south%20luangwa%20zambia",
        },
      ],
      local: [
        {
          name: "Lodges communautaires et hebergements hors parc.",
          url: "https://www.google.com/maps/search/?api=1&query=community%20lodge%20south%20luangwa%20zambia",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Repas inclus en lodge avec produits locaux.",
          url: "https://www.google.com/maps/search/?api=1&query=lodge%20dining%20south%20luangwa",
        },
        {
          name: "Restaurants a Mfuwe avant ou apres safari.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20mfuwe%20zambia",
        },
      ],
      specialties: [
        "Plats zambiens a base de nshima.",
        "Grillades et legumes de saison.",
      ],
      mealBudget: "Repas en lodge inclus; a Mfuwe: moyen.",
    },
    budget: {
      activities: [
        "Safaris et walks guides: moyen a eleve.",
        "Vols internes vers Mfuwe: moyen.",
      ],
      daily: [
        "Economique: moyen avec camp simple.",
        "Moyen: moyen a eleve avec lodge confort.",
        "Premium: eleve avec lodge de luxe.",
      ],
      entrance: [
        "Frais de parc: moyen (souvent inclus).",
      ],
    },
    safety: [
      "Stay with guides during walks and drives.",
      "Avoid stepping off paths without permission.",
      "Use insect repellent and follow malaria guidance.",
      "Keep quiet around wildlife to reduce stress.",
    ],
    faqs: [
      {
        question: "Is South Luangwa good for first-time safaris?",
        answer: "Yes, it offers classic wildlife viewing with excellent guides.",
      },
      {
        question: "Are walking safaris optional?",
        answer: "Yes, you can choose to focus on vehicle safaris instead.",
      },
      {
        question: "How many days are recommended?",
        answer: "Three to four days allow for multiple game drives and a walk.",
      },
      {
        question: "Do camps provide transfers?",
        answer: "Most lodges include airport transfers from Mfuwe.",
      },
    ],
  },
  {
    countrySlug: "kenya",
    countryName: "Kenya",
    slug: "masai-mara",
    title: "Masai Mara",
    subtitle: "Big cats, sweeping savannas, and the Great Migration.",
    heroImage: "/destinationHero.webp",
    bestTime: "July to October",
    idealStay: "3 to 4 days",
    base: "Maasai Mara Reserve or private conservancies",
    overview: [
      "The Masai Mara is Kenya's flagship safari destination, known for vast grasslands and reliable predator sightings.",
      "The annual migration brings herds of wildebeest and zebra, but the Mara delivers year-round wildlife.",
    ],
    attractions: [
      {
        title: "Great Migration crossings",
        details: "Witness dramatic river crossings with crocodiles and predators nearby.",
      },
      {
        title: "Big cat tracking",
        details: "Lions, cheetahs, and leopards thrive on the open plains.",
      },
      {
        title: "Hot air balloon safari",
        details: "Soar above the savanna for sunrise views and champagne breakfasts.",
      },
      {
        title: "Mara River",
        details: "A wildlife magnet with hippos, birds, and grazing herds.",
      },
      {
        title: "Maasai cultural visits",
        details: "Engage with local communities and learn about Maasai heritage.",
      },
    ],
    logistics: [
      "Fly from Nairobi to Mara airstrips or drive 5 to 6 hours.",
      "Peak season (Jul to Oct) requires early booking.",
      "Conservancies offer off-road driving and fewer vehicles.",
      "Pack layers for cool mornings and warm afternoons.",
      "Carry cash for park fees and gratuities.",
    ],
    stay: [
      "Luxury tented camps in the reserve or conservancies.",
      "Mid-range lodges for comfortable safari bases.",
      "Mobile camps for a closer-to-wildlife experience.",
    ],
    eat: [
      "Camp dining with fresh, local ingredients.",
      "Nairobi restaurants for pre or post-safari meals.",
    ],
    costs: [
      { label: "Park and conservancy fees", range: "Moderate to high", notes: "Rates change by season and location." },
      { label: "Accommodation", range: "Moderate to high", notes: "Luxury camps command premium rates." },
      { label: "Flights or transfers", range: "Moderate", notes: "Air transfers are faster but cost more." },
      { label: "Activities", range: "Low to moderate", notes: "Balloon safaris and visits are add-ons." },
    ],
    lodging: {
      luxury: [
        {
          name: "Camps de luxe en conservancy privee avec service complet.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20camp%20masai%20mara%20kenya",
        },
      ],
      midrange: [
        {
          name: "Lodges milieu de gamme dans la reserve.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20lodge%20masai%20mara%20kenya",
        },
      ],
      budget: [
        {
          name: "Camps tentes plus simples pour petits budgets.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20camp%20masai%20mara%20kenya",
        },
      ],
      local: [
        {
          name: "Eco-lodges communautaires et hebergements locaux.",
          url: "https://www.google.com/maps/search/?api=1&query=community%20lodge%20masai%20mara%20kenya",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Restaurants a Nairobi pour diners avant ou apres safari.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20nairobi%20kenya",
        },
        {
          name: "Repas en camp prepares par les equipes.",
          url: "https://www.google.com/maps/search/?api=1&query=camp%20dining%20masai%20mara",
        },
      ],
      specialties: [
        "Nyama choma, ugali, et the chai.",
        "Petits dejeuners en brousse selon les camps.",
      ],
      mealBudget: "Repas en camp inclus; a Nairobi: moyen.",
    },
    budget: {
      activities: [
        "Game drives et safaris: moyen a eleve.",
        "Balloon safari: eleve.",
      ],
      daily: [
        "Economique: moyen avec camp simple.",
        "Moyen: eleve avec lodge confort.",
        "Premium: tres eleve avec camp de luxe.",
      ],
      entrance: [
        "Frais de reserve/conservancy: moyen a eleve.",
      ],
    },
    safety: [
      "Stay inside vehicles during game drives unless guides allow exits.",
      "Keep a safe distance from wildlife.",
      "Secure valuables in camp tents and rooms.",
      "Follow guide advice during night hours.",
    ],
    faqs: [
      {
        question: "Is the Great Migration the only good time to visit?",
        answer: "No. Wildlife viewing is excellent year-round, but migration adds drama.",
      },
      {
        question: "Should I stay in a conservancy?",
        answer: "Conservancies are quieter and allow more flexible game drive rules.",
      },
      {
        question: "How many nights are ideal?",
        answer: "Three to four nights provide multiple drives and time to relax.",
      },
      {
        question: "Are balloon safaris worth it?",
        answer: "Yes for unique views and a memorable sunrise experience.",
      },
    ],
  },
  {
    countrySlug: "zimbabwi",
    countryName: "Zimbabwe",
    slug: "hwange-national-park",
    title: "Hwange National Park",
    subtitle: "Huge elephant herds, waterhole safaris, and classic game drives.",
    heroImage: "/destinationHero.webp",
    bestTime: "May to October",
    idealStay: "3 to 4 days",
    base: "Hwange or Victoria Falls",
    overview: [
      "Hwange is Zimbabwe's largest national park, famed for elephant herds and a wide range of wildlife.",
      "Dry season concentrates animals around waterholes, making sightings reliable and photo friendly.",
    ],
    attractions: [
      {
        title: "Waterhole game viewing",
        details: "Watch elephants, antelope, and predators gather at pumped pans.",
      },
      {
        title: "Guided game drives",
        details: "Morning and afternoon drives cover open plains and teak forests.",
      },
      {
        title: "Walking safaris",
        details: "Explore with rangers to learn animal tracks and bushcraft.",
      },
      {
        title: "Birding",
        details: "Over 400 species make Hwange a strong birding destination.",
      },
      {
        title: "Victoria Falls add-on",
        details: "Combine Hwange with a waterfall visit for a complete itinerary.",
      },
    ],
    logistics: [
      "Reach the park from Victoria Falls (2 to 3 hours) or Bulawayo.",
      "Dry season (May to Oct) delivers the best wildlife visibility.",
      "Pack neutral tones and a warm layer for early drives.",
      "Self-drive is possible but guided safaris provide better tracking.",
      "Plan cash for park fees and fuel in remote areas.",
    ],
    stay: [
      "Safari lodges near main waterholes.",
      "Tented camps inside or just outside the park.",
      "Budget-friendly rest camps for self-drive travelers.",
    ],
    eat: [
      "Lodge meals with seasonal ingredients.",
      "Packed breakfasts and sundowner snacks during drives.",
    ],
    costs: [
      { label: "Accommodation", range: "Moderate", notes: "Options range from camps to luxury lodges." },
      { label: "Game drives", range: "Moderate", notes: "Guided drives add cost but improve sightings." },
      { label: "Park fees", range: "Moderate", notes: "Pay at the gate or through lodges." },
      { label: "Transfers", range: "Low to moderate", notes: "Private transfers cost more than shared." },
    ],
    lodging: {
      luxury: [
        {
          name: "Luxury lodges near waterholes and safari zones.",
          url: "https://www.google.com/maps/search/?api=1&query=luxury%20lodge%20hwange%20zimbabwe",
        },
      ],
      midrange: [
        {
          name: "Mid-range lodges around the park.",
          url: "https://www.google.com/maps/search/?api=1&query=midrange%20lodge%20hwange%20zimbabwe",
        },
      ],
      budget: [
        {
          name: "Rest camps and simple tents for budget travelers.",
          url: "https://www.google.com/maps/search/?api=1&query=budget%20camp%20hwange%20zimbabwe",
        },
      ],
      local: [
        {
          name: "Community camps and local accommodations.",
          url: "https://www.google.com/maps/search/?api=1&query=community%20lodge%20hwange%20zimbabwe",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Meals included at lodge or camp.",
          url: "https://www.google.com/maps/search/?api=1&query=lodge%20dining%20hwange",
        },
        {
          name: "Restaurants in Victoria Falls for more variety.",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants%20victoria%20falls%20zimbabwe",
        },
      ],
      specialties: [
        "Sadza, grilled meats, and local vegetables.",
        "Market snacks and local beverages.",
      ],
      mealBudget: "Lodge meals included; Victoria Falls: moderate.",
    },
    budget: {
      activities: [
        "Guided game drives: moderate.",
        "Victoria Falls excursion: moderate.",
      ],
      daily: [
        "Budget: moderate with rest camp.",
        "Mid-range: moderate to high with comfortable lodge.",
        "Premium: high with luxury lodge.",
      ],
      entrance: [
        "Park fees: moderate.",
      ],
    },
    safety: [
      "Follow ranger guidance during drives and walks.",
      "Avoid leaving food near tents or camps.",
      "Use insect repellent at dusk.",
      "Drive slowly and avoid night travel on park roads.",
    ],
    faqs: [
      {
        question: "Is Hwange good for elephants?",
        answer: "Yes, it is one of Africa's top destinations for elephant viewing.",
      },
      {
        question: "Can I visit on a day trip?",
        answer: "You can, but staying two or more nights gives a better safari experience.",
      },
      {
        question: "Is self-drive recommended?",
        answer: "Yes for experienced drivers, but guided options are easier for first-timers.",
      },
      {
        question: "How far is Hwange from Victoria Falls?",
        answer: "About 2 to 3 hours by road depending on your entry gate.",
      },
    ],
  },
  {
    countrySlug: "morocco",
    countryName: "Morocco",
    slug: "marrakech",
    title: "Marrakech",
    subtitle: "Vibrant souks, stunning palaces, and the gateway to the Sahara.",
    heroImage: "/destinationHero.webp",
    bestTime: "March to May & September to November",
    idealStay: "3 to 4 days",
    base: "Medina",
    overview: [
      "Marrakech is a sensory overload of colors, sounds, and smells. The heart of the city is the bustling Jemaa el-Fnaa square.",
      "Explore the maze-like alleys of the medina, visit historical palaces like Bahia, and relax in the beautiful Majorelle Garden.",
    ],
    attractions: [
      {
        title: "Jemaa el-Fnaa",
        details: "The main square featuring food stalls, snake charmers, and street performers.",
      },
      {
        title: "Majorelle Garden",
        details: "A stunning botanical garden created by Jacques Majorelle and later restored by Yves Saint Laurent.",
      },
      {
        title: "Bahia Palace",
        details: "A late 19th-century palace showcasing incredible Moroccan architecture and tilework.",
      },
      {
        title: "Koutoubia Mosque",
        details: "The largest mosque in Marrakech, known for its impressive minaret.",
      },
      {
        title: "The Souks",
        details: "A labyrinth of markets selling spices, textiles, leather goods, and ceramics.",
      },
    ],
    logistics: [
      "Fly into Marrakech Menara Airport (RAK).",
      "Most of the medina is pedestrian-only, so prepare for lots of walking.",
      "Taxis are available outside the medina, but always agree on a price or insist on the meter.",
      "French is widely spoken, and Arabic is the main language. Basic English is understood in tourist areas.",
    ],
    stay: [
      "Stay in a traditional riad inside the medina for an authentic experience.",
      "Gueliz offers modern hotels and a more European feel.",
      "The Palmeraie is ideal for luxury resorts outside the city center.",
    ],
    eat: [
      "Try Tagine and Couscous at local restaurants.",
      "Eat at the food stalls in Jemaa el-Fnaa at night for a lively experience.",
      "Enjoy mint tea at a rooftop cafe overlooking the medina.",
    ],
    costs: [
      { label: "Accommodation", range: "Budget to Luxury", notes: "Riads range from cheap to very expensive." },
      { label: "Food", range: "Low to Moderate", notes: "Street food is cheap, fine dining is moderate." },
      { label: "Attractions", range: "Low", notes: "Most palace and garden entrance fees are low." },
    ],
    lodging: {
      luxury: [
        {
          name: "Luxury Riads and Resorts",
          url: "https://www.google.com/maps/search/?api=1&query=luxury+hotels+marrakech",
        },
      ],
      midrange: [
        {
          name: "Boutique Riads",
          url: "https://www.google.com/maps/search/?api=1&query=boutique+riads+marrakech",
        },
      ],
      budget: [
        {
          name: "Hostels and Budget Guesthouses",
          url: "https://www.google.com/maps/search/?api=1&query=hostels+marrakech",
        },
      ],
      local: [
        {
          name: "Local Homestays",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouses+marrakech",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Rooftop Cafes in the Medina",
          url: "https://www.google.com/maps/search/?api=1&query=rooftop+restaurants+medina+marrakech",
        },
        {
          name: "Gueliz Modern Restaurants",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants+gueliz+marrakech",
        },
      ],
      specialties: [
        "Lamb Tagine with Prunes",
        "Chicken Tagine with Preserved Lemons",
        "Pastilla (sweet and savory pie)",
        "Moroccan Mint Tea",
      ],
      mealBudget: "Cheap in the square, moderate in riads, expensive in luxury resorts.",
    },
    budget: {
      activities: [
        "Palace Entry: Low.",
        "Guided Tours: Moderate.",
      ],
      daily: [
        "Budget: $30-$50.",
        "Mid-range: $80-$150.",
        "Luxury: $250+.",
      ],
      entrance: [
        "Museums and Gardens: Low.",
      ],
    },
    safety: [
      "Be aware of pickpockets in crowded souks and Jemaa el-Fnaa.",
      "Politely decline unwanted guides or people offering directions for money.",
      "Drink bottled water and be cautious with raw foods.",
    ],
    faqs: [
      {
        question: "Is Marrakech safe for tourists?",
        answer: "Yes, it is generally safe, but standard precautions against petty theft should be taken.",
      },
      {
        question: "Do I need to cover up in Marrakech?",
        answer: "While Marrakech is relatively liberal, dressing modestly (covering shoulders and knees) is respectful.",
      },
    ],
  },
  {
    countrySlug: "egypt",
    countryName: "Egypt",
    slug: "pyramids-of-giza",
    title: "Pyramids of Giza",
    subtitle: "The last remaining wonder of the ancient world.",
    heroImage: "/destinationHero.webp",
    bestTime: "October to April",
    idealStay: "1 to 2 days (as part of a Cairo trip)",
    base: "Giza or Cairo",
    overview: [
      "The Pyramids of Giza and the Great Sphinx are iconic symbols of ancient Egypt, standing on the Giza Plateau just outside Cairo.",
      "Built as massive tombs for pharaohs, these structures are a testament to the engineering brilliance of the ancient world.",
    ],
    attractions: [
      {
        title: "The Great Pyramid of Khufu",
        details: "The largest and oldest of the three pyramids, and the only surviving Wonder of the Ancient World.",
      },
      {
        title: "Pyramid of Khafre",
        details: "The second-largest pyramid, easily recognizable by the original casing stones remaining at its peak.",
      },
      {
        title: "Pyramid of Menkaure",
        details: "The smallest of the three main pyramids.",
      },
      {
        title: "The Great Sphinx",
        details: "A massive limestone statue with the body of a lion and the head of a pharaoh.",
      },
      {
        title: "Solar Boat Museum",
        details: "Houses a reconstructed ancient ship found buried near the Great Pyramid.",
      },
    ],
    logistics: [
      "Fly into Cairo International Airport (CAI).",
      "Take a taxi, Uber, or join a guided tour to reach the Giza Plateau from Cairo.",
      "The site is vast; you can walk, hire a horse or camel, or take a taxi between the main spots.",
      "Arrive early in the morning to avoid the heat and the largest crowds.",
    ],
    stay: [
      "Stay in Giza for views of the pyramids from your hotel.",
      "Stay in Downtown Cairo for easy access to the Egyptian Museum and city life.",
    ],
    eat: [
      "Many hotels in Giza have rooftop restaurants with pyramid views.",
      "Try Koshary, a popular Egyptian street food dish.",
      "Eat at established restaurants to avoid stomach issues.",
    ],
    costs: [
      { label: "Accommodation", range: "Budget to Luxury", notes: "Hotels with pyramid views cost more." },
      { label: "Entrance Fees", range: "Moderate", notes: "General entry fee, plus extra fees to go inside the pyramids." },
      { label: "Transport", range: "Low", notes: "Ubers are inexpensive." },
    ],
    lodging: {
      luxury: [
        {
          name: "Luxury Hotels with Pyramid Views",
          url: "https://www.google.com/maps/search/?api=1&query=luxury+hotels+giza",
        },
      ],
      midrange: [
        {
          name: "Comfortable Giza Hotels",
          url: "https://www.google.com/maps/search/?api=1&query=hotels+giza",
        },
      ],
      budget: [
        {
          name: "Hostels and Budget Inns",
          url: "https://www.google.com/maps/search/?api=1&query=budget+hotels+giza",
        },
      ],
      local: [
        {
          name: "Guesthouses near the entrance",
          url: "https://www.google.com/maps/search/?api=1&query=guesthouses+giza",
        },
      ],
    },
    dining: {
      best: [
        {
          name: "Rooftop Restaurants in Giza",
          url: "https://www.google.com/maps/search/?api=1&query=restaurants+with+pyramid+view",
        },
        {
          name: "Traditional Egyptian Restaurants",
          url: "https://www.google.com/maps/search/?api=1&query=egyptian+restaurants+cairo",
        },
      ],
      specialties: [
        "Koshary (rice, lentils, pasta, tomato sauce)",
        "Ful Medames (fava beans)",
        "Mahshi (stuffed vegetables)",
        "Mint Tea",
      ],
      mealBudget: "Low for street food, moderate for tourist restaurants.",
    },
    budget: {
      activities: [
        "Plateau Entry: Moderate.",
        "Inside Pyramids: Moderate to High.",
        "Camel Ride: Moderate (negotiate firmly).",
      ],
      daily: [
        "Budget: $40-$60.",
        "Mid-range: $80-$150.",
        "Luxury: $250+.",
      ],
      entrance: [
        "Giza Plateau ticket required.",
      ],
    },
    safety: [
      "Beware of aggressive touts and scammers offering camel rides or 'official' tours.",
      "Agree on all prices for services (rides, photos) before committing.",
      "Stay hydrated and wear sunscreen; there is very little shade.",
    ],
    faqs: [
      {
        question: "Can you go inside the pyramids?",
        answer: "Yes, you can buy an extra ticket to enter the Great Pyramid or the others, but it is cramped and hot.",
      },
      {
        question: "How much is a camel ride?",
        answer: "There is an official government-set price, but you must still negotiate and confirm the price (and currency) beforehand.",
      },
    ],
  }
];

export function getFlagshipDestination(countrySlug: string, placeSlug: string): FlagshipDestination | null {
  const normalizedCountry = countrySlug.toLowerCase().trim();
  const normalizedSlug = placeSlug.toLowerCase().trim();

  return (
    FLAGSHIP_DESTINATIONS.find(
      (spot) => spot.countrySlug === normalizedCountry && spot.slug === normalizedSlug
    ) || null
  );
}
