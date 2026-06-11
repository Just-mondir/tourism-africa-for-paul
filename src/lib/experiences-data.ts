export interface ExperienceDestination {
  name: string;
  country: string;
  url: string;
  image: string;
  description: string;
}

export interface ExperienceFAQ {
  question: string;
  answer: string;
}

export interface RelatedDestination {
  name: string;
  url: string;
}

export interface ExperienceCategory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  introduction: string;
  highlights: string[];
  bestDestinations: ExperienceDestination[];
  travelTips: string[];
  bestSeasonToVisit: string;
  estimatedCosts: string;
  faqs: ExperienceFAQ[];
  relatedDestinations: RelatedDestination[];
}

export const experiencesData: ExperienceCategory[] = [
  {
    id: "safari",
    title: "Safari & Game Drives",
    subtitle: "Witness the majestic wildlife of Africa in their natural habitat.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "An African safari is the quintessential travel experience, offering unparalleled opportunities to witness the continent's iconic wildlife. From the sweeping plains of the Serengeti to the lush Okavango Delta, game drives bring you face-to-face with the Big Five and countless other species in diverse ecosystems.",
    highlights: [
      "Spotting the Big Five: Lion, Leopard, Rhino, Elephant, and Cape Buffalo.",
      "Witnessing the Great Migration across East Africa.",
      "Staying in luxury tented camps in the heart of the wilderness.",
      "Guided walking safaris for an intimate connection with nature."
    ],
    bestDestinations: [
      {
        name: "Akagera National Park",
        country: "Rwanda",
        url: "/destinations/rwanda/akagera",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Experience the remarkable conservation success story in this Big Five park."
      },
      {
        name: "Chobe National Park",
        country: "Botswana",
        url: "/destinations/botswana/chobe",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Known for having one of the largest concentrations of game in Africa, particularly elephants."
      }
    ],
    travelTips: [
      "Pack neutral-colored clothing to blend in and avoid attracting insects.",
      "Bring a good quality pair of binoculars and a camera with a telephoto lens.",
      "Always listen to your guide's instructions—they know the bush best.",
      "Layer your clothing; early mornings are chilly, while afternoons can be scorching."
    ],
    bestSeasonToVisit: "Dry season (June to October) is ideal for game viewing as animals congregate around water sources.",
    estimatedCosts: "Ranging from $300/day for budget safaris to $1,500+/day for luxury fly-in camps.",
    faqs: [
      {
        question: "Is it safe to go on a safari?",
        answer: "Yes, safaris are incredibly safe when you follow the rules and listen to your expert guides. You'll be in secure vehicles or camps designed for safety."
      },
      {
        question: "What is the Big Five?",
        answer: "The Big Five refers to the African lion, leopard, rhinoceros, elephant, and Cape buffalo. The term originally referred to the most difficult animals to hunt on foot."
      }
    ],
    relatedDestinations: [
      { name: "Explore Botswana", url: "/destinations/botswana" },
      { name: "Explore Rwanda", url: "/destinations/rwanda" }
    ]
  },
  {
    id: "beach",
    title: "Beaches & Coastal Escapes",
    subtitle: "Relax on pristine white sands and dive into crystal-clear waters.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "Africa’s coastline offers some of the most spectacular, untouched beaches in the world. Whether you seek the vibrant marine life of the Indian Ocean, the rugged beauty of the Atlantic seaboard, or secluded island hideaways, the continent promises extraordinary coastal retreats.",
    highlights: [
      "Snorkeling and scuba diving in pristine coral reefs.",
      "Sunset dhow cruises along the eastern coast.",
      "Water sports: from kitesurfing to deep-sea fishing.",
      "Luxurious beachfront eco-resorts."
    ],
    bestDestinations: [
      {
        name: "Lake Kivu",
        country: "Rwanda",
        url: "/destinations/rwanda/lake-kivu",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "While technically a lake, its sandy shores and clear waters offer a fantastic beach-like retreat."
      },
      {
        name: "Grand Popo",
        country: "Benin",
        url: "/destinations/benin/grand-popo",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Vast stretches of quiet, golden beaches steeped in history and voodoo culture."
      }
    ],
    travelTips: [
      "Use reef-safe sunscreen to protect delicate marine ecosystems.",
      "Respect local customs regarding beach attire, particularly in conservative regions.",
      "Check tidal patterns if you plan on swimming or snorkeling."
    ],
    bestSeasonToVisit: "Generally year-round, though avoiding the heavy rainy seasons ensures clearer waters and sunny days.",
    estimatedCosts: "$150/day to $800+/day depending on the level of luxury and included activities.",
    faqs: [
      {
        question: "Are African beaches safe for swimming?",
        answer: "Many are, especially protected lagoons and resort areas. Always check with locals about currents and marine life before swimming in open waters."
      }
    ],
    relatedDestinations: [
      { name: "Explore Benin", url: "/destinations/benin" },
      { name: "Explore Algeria", url: "/destinations/algeria" }
    ]
  },
  {
    id: "culture",
    title: "Culture & Heritage",
    subtitle: "Immerse yourself in vibrant traditions, history, and local communities.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "Africa is the cradle of humanity, boasting an unparalleled tapestry of cultures, languages, and traditions. A cultural journey here is deeply moving, taking you through ancient ruins, vibrant modern cities, and rural communities that preserve centuries-old ways of life.",
    highlights: [
      "Visiting UNESCO World Heritage sites and ancient ruins.",
      "Participating in local festivals, music, and dance.",
      "Meeting indigenous communities and learning about their heritage.",
      "Exploring bustling local markets filled with crafts and spices."
    ],
    bestDestinations: [
      {
        name: "Ouidah",
        country: "Benin",
        url: "/destinations/benin/ouidah",
        image: "https://images.unsplash.com/photo-1518182170546-076616fd46fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "The spiritual capital of Voodoo and a poignant historical site of the transatlantic slave trade."
      },
      {
        name: "Algiers Casbah",
        country: "Algeria",
        url: "/destinations/algeria/algiers",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "A labyrinth of narrow streets, historic mosques, and Ottoman palaces overlooking the Mediterranean."
      }
    ],
    travelTips: [
      "Always ask for permission before taking photographs of people.",
      "Dress modestly when visiting rural villages and religious sites.",
      "Hire local guides to gain authentic insights and support the community economy."
    ],
    bestSeasonToVisit: "Year-round. Consider timing your visit with local festivals for an enhanced experience.",
    estimatedCosts: "$100/day to $400/day.",
    faqs: [
      {
        question: "How should I interact respectfully with local communities?",
        answer: "Approach with an open mind, ask questions respectfully, adhere to local dress codes, and always seek permission before taking photos."
      }
    ],
    relatedDestinations: [
      { name: "Explore Benin", url: "/destinations/benin" },
      { name: "Explore Libya", url: "/destinations/libya" }
    ]
  },
  {
    id: "adventure",
    title: "Adventure & Thrills",
    subtitle: "From mountain trekking to dune bashing, get your adrenaline pumping.",
    image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "For thrill-seekers, Africa is the ultimate playground. Scale towering peaks, navigate roaring rapids, or traverse sweeping dunes in a 4x4. The continent’s dramatic landscapes set the stage for world-class adventures that will test your limits and reward you with unforgettable memories.",
    highlights: [
      "Trekking high-altitude mountain ranges.",
      "White-water rafting and bungee jumping.",
      "Canopy walkways and zip-lining over lush forests.",
      "Dune bashing and sandboarding in vast deserts."
    ],
    bestDestinations: [
      {
        name: "Nyungwe Forest",
        country: "Rwanda",
        url: "/destinations/rwanda/nyungwe",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Experience the thrilling Canopy Walk suspended high above the ancient rainforest."
      },
      {
        name: "Tassili n'Ajjer",
        country: "Algeria",
        url: "/destinations/algeria/tassili",
        image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Trek through an otherworldly landscape of sandstone formations and ancient rock art."
      }
    ],
    travelTips: [
      "Ensure you have comprehensive travel insurance that covers extreme activities.",
      "Stay hydrated and acclimate properly before attempting high-altitude treks.",
      "Book adventure activities with reputable, certified operators."
    ],
    bestSeasonToVisit: "Depends on the activity. Dry seasons are best for hiking and trekking.",
    estimatedCosts: "$150/day to $600/day, depending on the equipment and guides required.",
    faqs: [
      {
        question: "Do I need prior experience for most adventure activities?",
        answer: "Many activities cater to beginners and include training, though physical fitness is often required for trekking and climbing."
      }
    ],
    relatedDestinations: [
      { name: "Explore Rwanda", url: "/destinations/rwanda" },
      { name: "Explore Algeria", url: "/destinations/algeria" }
    ]
  },
  {
    id: "wildlife",
    title: "Wildlife Encounters",
    subtitle: "Get up close with primates, marine life, and rare species.",
    image: "/experiences/wildlife.jpg",
    heroImage: "/experiences/wildlife.jpg",
    introduction: "Beyond the classic safari, Africa offers specialized wildlife encounters that bring you face-to-face with some of the world's most endangered and fascinating creatures. From tracking gorillas through misty forests to witnessing the intricate behaviors of meerkats, these experiences are profoundly moving.",
    highlights: [
      "Gorilla and chimpanzee trekking in dense rainforests.",
      "Birdwatching in world-renowned wetlands and parks.",
      "Marine safaris to see whales, dolphins, and dugongs.",
      "Participating in conservation and tracking programs."
    ],
    bestDestinations: [
      {
        name: "Volcanoes National Park",
        country: "Rwanda",
        url: "/destinations/rwanda/volcanoes",
        image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "The ultimate destination for mountain gorilla trekking."
      },
      {
        name: "Okavango Delta",
        country: "Botswana",
        url: "/destinations/botswana/okavango",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "A unique inland delta teeming with diverse wildlife and bird species."
      }
    ],
    travelTips: [
      "Book primate trekking permits months in advance as they are strictly limited.",
      "Wear sturdy hiking boots, gaiters, and gardening gloves for forest treks.",
      "Maintain a safe distance and follow all guidelines to protect wildlife health."
    ],
    bestSeasonToVisit: "Dry season (June-September) is best for forest treks as paths are less muddy.",
    estimatedCosts: "Permits alone can cost $1,500 for gorillas. Total trips range from $800 - $2,500/day.",
    faqs: [
      {
        question: "How physically demanding is gorilla trekking?",
        answer: "It can be strenuous, requiring hikes of 2 to 6 hours through thick vegetation and steep, muddy terrain."
      }
    ],
    relatedDestinations: [
      { name: "Explore Rwanda", url: "/destinations/rwanda" },
      { name: "Explore Botswana", url: "/destinations/botswana" }
    ]
  },
  {
    id: "luxury",
    title: "Luxury & Exclusive",
    subtitle: "Indulge in five-star lodges, private flights, and bespoke services.",
    image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "Africa redefines luxury travel. Experience the continent with unparalleled exclusivity—stay in opulently designed lodges, fly directly into private airstrips, and enjoy bespoke services that cater to your every desire, all while surrounded by breathtaking wilderness.",
    highlights: [
      "Private villas with plunge pools overlooking the savanna.",
      "Exclusive-use game drive vehicles and private guides.",
      "Fine dining under the African stars.",
      "Helicopter safaris and hot air balloon rides."
    ],
    bestDestinations: [
      {
        name: "Moremi Game Reserve",
        country: "Botswana",
        url: "/destinations/botswana/okavango",
        image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Home to some of the most exclusive, ultra-luxury lodges in Africa."
      },
      {
        name: "Kigali Luxury",
        country: "Rwanda",
        url: "/destinations/rwanda/kigali",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Experience world-class eco-luxury hotels before heading to the volcanoes."
      }
    ],
    travelTips: [
      "Pack light but chic—many light aircraft have strict luggage weight restrictions (usually soft bags only).",
      "Communicate dietary requirements in advance; luxury lodges excel at bespoke culinary experiences.",
      "Tip generously but discreetly; many lodges have communal tip boxes."
    ],
    bestSeasonToVisit: "Year-round, though the dry season offers the best wildlife viewing from your private deck.",
    estimatedCosts: "$1,500 to $5,000+ per person per night.",
    faqs: [
      {
        question: "Are luxury lodges eco-friendly?",
        answer: "Yes, many of the top luxury lodges in Africa are pioneers in sustainable tourism, operating entirely on solar power and supporting local conservation."
      }
    ],
    relatedDestinations: [
      { name: "Explore Botswana", url: "/destinations/botswana" }
    ]
  },
  {
    id: "family",
    title: "Family Getaways",
    subtitle: "Create lifelong memories with safe, kid-friendly adventures.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "Introduce your children to the wonders of the natural world with a family-focused African adventure. Many destinations offer specialized kids' programs, family-sized accommodations, and malaria-free reserves, ensuring a safe, educational, and magical experience for all ages.",
    highlights: [
      "Junior ranger programs teaching tracking and bush survival.",
      "Malaria-free game reserves tailored for young families.",
      "Cultural village visits to interact with local children.",
      "Spacious family suites or interconnected rooms."
    ],
    bestDestinations: [
      {
        name: "Pendjari National Park",
        country: "Benin",
        url: "/destinations/benin/pendjari",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "A great introductory safari experience with rich wildlife in West Africa."
      },
      {
        name: "Kigali",
        country: "Rwanda",
        url: "/destinations/rwanda/kigali",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "One of Africa's safest and cleanest cities, perfect for family exploration."
      }
    ],
    travelTips: [
      "Check age limits for activities; some safaris don't allow children under 6 on game drives.",
      "Consult a travel doctor regarding vaccinations and anti-malarial medication for kids.",
      "Keep travel times between destinations short to avoid restless youngsters."
    ],
    bestSeasonToVisit: "Aligns with school holidays (June-August or December), which are excellent times for travel.",
    estimatedCosts: "$300 to $1,000+ per day. Look for lodges where children stay free or at discounted rates.",
    faqs: [
      {
        question: "Is it safe to bring young children on safari?",
        answer: "Absolutely. Choose fenced, family-oriented lodges and malaria-free areas for peace of mind."
      }
    ],
    relatedDestinations: [
      { name: "Explore Benin", url: "/destinations/benin" },
      { name: "Explore Rwanda", url: "/destinations/rwanda" }
    ]
  },
  {
    id: "honeymoon",
    title: "Romantic Honeymoons",
    subtitle: "Celebrate your love in the most enchanting settings on earth.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "An African honeymoon is the perfect blend of romance, adventure, and seclusion. Imagine waking up to a savanna sunrise, enjoying private dinners under the Milky Way, and retreating to sumptuously appointed suites designed for ultimate privacy and pampering.",
    highlights: [
      "Sleep-out decks under the African night sky.",
      "Couples' spa treatments with natural, local ingredients.",
      "Private hot air balloon rides at sunrise.",
      "Bush baths and secluded plunge pools."
    ],
    bestDestinations: [
      {
        name: "Okavango Delta",
        country: "Botswana",
        url: "/destinations/botswana/okavango",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Gliding through water lilies in a traditional mokoro canoe is pure romance."
      },
      {
        name: "Lake Kivu",
        country: "Rwanda",
        url: "/destinations/rwanda/lake-kivu",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Relax at a serene lakeside resort after an exhilarating gorilla trek."
      }
    ],
    travelTips: [
      "Mention it's your honeymoon when booking; lodges often provide complimentary romantic surprises.",
      "Combine a thrilling safari with a relaxing beach stay (bush and beach itinerary).",
      "Build in 'downtime'—safaris have early wake-up calls, so allow time to just relax together."
    ],
    bestSeasonToVisit: "September to November offers great weather and avoids the peak family holiday crowds.",
    estimatedCosts: "$500 to $2,500+ per person per night.",
    faqs: [
      {
        question: "Can we have a private safari vehicle?",
        answer: "Yes, many lodges offer private vehicles for an additional fee, ensuring an intimate wildlife viewing experience."
      }
    ],
    relatedDestinations: [
      { name: "Explore Botswana", url: "/destinations/botswana" }
    ]
  },
  {
    id: "desert",
    title: "Desert Expeditions",
    subtitle: "Discover the silent, vast beauty of the Sahara and Kalahari.",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "The deserts of Africa hold a mystical allure. From the towering, ochre dunes of the Sahara to the semi-arid, wildlife-rich landscapes of the Kalahari, desert expeditions offer profound silence, dramatic scenery, and a deep sense of isolation and wonder.",
    highlights: [
      "Camping under some of the darkest, star-filled skies on the planet.",
      "Camel trekking and meeting nomadic communities.",
      "Witnessing desert-adapted wildlife like the gemsbok and meerkats.",
      "Exploring ancient rock art and oasis towns."
    ],
    bestDestinations: [
      {
        name: "Sahara Desert",
        country: "Algeria",
        url: "/destinations/algeria/sahara",
        image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Vast, stunning dunes and rich Tuareg culture in the heart of the Sahara."
      },
      {
        name: "Kalahari Desert",
        country: "Botswana",
        url: "/destinations/botswana/kalahari",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "A semi-desert teeming with specialized wildlife and the ancient San culture."
      }
    ],
    travelTips: [
      "Prepare for extreme temperature swings: blazing hot days and freezing nights.",
      "Hydration is critical; always carry more water than you think you need.",
      "Keep cameras protected from fine, wind-blown sand."
    ],
    bestSeasonToVisit: "Winter months (November to February in the north, May to August in the south) to avoid lethal summer heat.",
    estimatedCosts: "$150/day to $600/day.",
    faqs: [
      {
        question: "Is it safe to travel in the deep desert?",
        answer: "Yes, when accompanied by experienced local guides who know the terrain and how to navigate without landmarks."
      }
    ],
    relatedDestinations: [
      { name: "Explore Algeria", url: "/destinations/algeria" },
      { name: "Explore Libya", url: "/destinations/libya" }
    ]
  },
  {
    id: "food-and-drink",
    title: "Food & Drink",
    subtitle: "Taste the continent through its spices, vineyards, and street food.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    introduction: "African cuisine is as diverse as its landscapes. Embark on a culinary journey that ranges from aromatic North African tagines to the hearty stews of West Africa and the burgeoning fine-dining scenes in modern metropolises. Food here is a celebration of community and history.",
    highlights: [
      "Taking local cooking classes and market tours.",
      "Sampling world-class wines and craft gins.",
      "Street food safaris in bustling capital cities.",
      "Farm-to-table dining experiences at eco-lodges."
    ],
    bestDestinations: [
      {
        name: "Algiers",
        country: "Algeria",
        url: "/destinations/algeria/algiers",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Savor the rich blend of Berber, Arab, and French culinary influences."
      },
      {
        name: "Cotonou",
        country: "Benin",
        url: "/destinations/benin/cotonou",
        image: "https://images.unsplash.com/photo-1518182170546-076616fd46fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Dive into vibrant markets to taste authentic West African street food."
      }
    ],
    travelTips: [
      "Be adventurous but cautious; eat where the locals eat and look for high turnover.",
      "Wash hands frequently and consider drinking bottled water depending on the region.",
      "Learn a few local food words; vendors love it when you try to speak their language."
    ],
    bestSeasonToVisit: "Year-round. Look out for local harvest seasons or food festivals.",
    estimatedCosts: "$50/day to $300/day depending on dining choices.",
    faqs: [
      {
        question: "Can vegetarians and vegans travel easily in Africa?",
        answer: "Yes, many traditional African diets rely heavily on vegetables, grains, and legumes. Luxury lodges are particularly adept at catering to all dietary requirements."
      }
    ],
    relatedDestinations: [
      { name: "Explore Algeria", url: "/destinations/algeria" },
      { name: "Explore Benin", url: "/destinations/benin" }
    ]
  }
];
