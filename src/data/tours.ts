import type { Tour } from "@/lib/types";

export const tours: Tour[] = [
  {
    slug: "classic-egypt-8-days",
    title: "Classic Egypt: Cairo, Luxor & Aswan",
    destinationSlug: "cairo",
    category: "Cultural",
    durationDays: 8,
    groupSize: "Up to 12",
    priceUSD: 1490,
    rating: 4.9,
    reviewCount: 312,
    summary:
      "The bucket-list itinerary. Pyramids, the new Grand Egyptian Museum, an internal flight to Luxor, and a 3-night Nile cruise down to Aswan.",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Skip-the-line Pyramids access",
      "Egyptologist guide every day",
      "3-night 5★ Nile cruise",
      "Domestic flights included"
    ],
    includes: [
      "7 nights accommodation (4★/5★)",
      "All breakfasts, 5 lunches, 4 dinners",
      "Private a/c transport",
      "Cairo ↔ Luxor & Aswan ↔ Cairo flights",
      "All entry fees & guide gratuities"
    ],
    excludes: [
      "International flights",
      "Egypt tourist visa (USD 25 on arrival)",
      "Travel insurance",
      "Optional hot-air balloon ride"
    ],
    itinerary: [
      { day: 1, title: "Arrive Cairo", details: "Airport meet & greet, transfer to your hotel near the Pyramids. Welcome briefing." },
      { day: 2, title: "Pyramids & Sphinx", details: "Full day Giza plateau, lunch overlooking the pyramids, afternoon at the Grand Egyptian Museum." },
      { day: 3, title: "Old Cairo & flight to Luxor", details: "Coptic & Islamic Cairo, Khan El Khalili, evening flight to Luxor and board your cruise." },
      { day: 4, title: "East Bank Luxor", details: "Karnak and Luxor temples with your Egyptologist. Optional sound & light show." },
      { day: 5, title: "West Bank & sail to Edfu", details: "Valley of the Kings, Hatshepsut and the Colossi of Memnon. Afternoon sailing." },
      { day: 6, title: "Edfu & Kom Ombo", details: "Two temple stops by horse-carriage and walking. Cocktail party on deck." },
      { day: 7, title: "Aswan", details: "Philae temple by boat, felucca sail around Elephantine Island, Nubian dinner." },
      { day: 8, title: "Fly home", details: "Optional Abu Simbel sunrise add-on, then flight back to Cairo and onward." }
    ]
  },
  {
    slug: "nile-cruise-5-days",
    title: "Nile Cruise: Luxor to Aswan",
    destinationSlug: "luxor",
    category: "Cruise",
    durationDays: 5,
    groupSize: "Up to 80 (cruise)",
    priceUSD: 890,
    rating: 4.8,
    reviewCount: 198,
    summary:
      "Four nights aboard a refurbished 5★ Nile cruiser with daily guided shore excursions, all meals, and sundowners on deck.",
    image:
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "5★ Nile cruiser, river-view cabin",
      "Egyptologist on board",
      "Full board with themed dinners",
      "All temple entry fees included"
    ],
    includes: [
      "4 nights full board on cruise",
      "All shore excursions",
      "Airport ↔ cruise transfers",
      "Onboard entertainment"
    ],
    excludes: [
      "Flights to Luxor / from Aswan",
      "Hot-air balloon ride",
      "Drinks at the bar",
      "Crew gratuities (≈ USD 8 / day)"
    ],
    itinerary: [
      { day: 1, title: "Embark in Luxor", details: "Board after lunch, afternoon at Karnak and Luxor temples." },
      { day: 2, title: "West Bank Luxor", details: "Valley of the Kings, Hatshepsut, sail to Edfu in the afternoon." },
      { day: 3, title: "Edfu & Kom Ombo", details: "Horus and the crocodile god, sail to Aswan by sunset." },
      { day: 4, title: "Aswan", details: "High Dam, Philae, optional Abu Simbel add-on. Nubian dinner on deck." },
      { day: 5, title: "Disembark", details: "Breakfast, transfer to Aswan airport." }
    ]
  },
  {
    slug: "red-sea-7-days",
    title: "Red Sea Escape: Sharm El Sheikh",
    destinationSlug: "sharm-el-sheikh",
    category: "Beach",
    durationDays: 7,
    groupSize: "Independent",
    priceUSD: 720,
    rating: 4.7,
    reviewCount: 145,
    summary:
      "Seven nights all-inclusive in a 5★ beachfront resort, plus two guided sea days at Ras Mohammed and Tiran Island.",
    image:
      "https://images.unsplash.com/photo-1518563259479-d003c05a6507?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "5★ all-inclusive beach resort",
      "Ras Mohammed snorkel cruise",
      "Tiran Island day trip",
      "Optional PADI Open Water"
    ],
    includes: [
      "7 nights all-inclusive",
      "Airport transfers",
      "2 day-cruises with lunch",
      "Resort welcome pack"
    ],
    excludes: [
      "International flights",
      "Diving certification (add USD 380)",
      "Spa treatments",
      "Excursions outside the resort"
    ],
    itinerary: [
      { day: 1, title: "Arrive Sharm", details: "Transfer to resort, beach welcome." },
      { day: 2, title: "Free day", details: "Beach, pools, optional spa." },
      { day: 3, title: "Ras Mohammed", details: "Snorkel cruise with lunch on board." },
      { day: 4, title: "Free day", details: "Optional sunset quad-bike in the desert." },
      { day: 5, title: "Tiran Island", details: "Catamaran trip to the best reefs in Sharm." },
      { day: 6, title: "Free day", details: "Old Market evening optional." },
      { day: 7, title: "Depart", details: "Transfer to airport." }
    ]
  },
  {
    slug: "egypt-family-10-days",
    title: "Family Egypt: Pyramids, Nile & Beach",
    destinationSlug: "hurghada",
    category: "Family",
    durationDays: 10,
    groupSize: "Private family",
    priceUSD: 1980,
    rating: 4.9,
    reviewCount: 86,
    summary:
      "A private, kid-friendly itinerary: 3 nights Cairo, 3-night Nile cruise, 3 nights Hurghada beach. Connecting rooms, child seats, and a guide trained for families.",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Private guide & vehicle throughout",
      "Family-friendly hotels",
      "Storytelling-style guiding",
      "Beach finale in Hurghada"
    ],
    includes: [
      "9 nights accommodation",
      "All breakfasts and most dinners",
      "Domestic flights",
      "Private transfers with child seats"
    ],
    excludes: [
      "International flights",
      "Tourist visa",
      "Optional ATV / camel rides",
      "Travel insurance"
    ],
    itinerary: [
      { day: 1, title: "Arrive Cairo", details: "Family welcome, dinner at the hotel." },
      { day: 2, title: "Pyramids day", details: "Pyramids, camel ride, lunch, Sphinx." },
      { day: 3, title: "Museum & bazaar", details: "Grand Egyptian Museum and Khan El Khalili treasure hunt." },
      { day: 4, title: "Fly to Luxor", details: "Board cruise, gentle afternoon walk in Karnak." },
      { day: 5, title: "West Bank", details: "Tombs, then sail south." },
      { day: 6, title: "Edfu & Kom Ombo", details: "Horse-carriage rides for the kids." },
      { day: 7, title: "Aswan & fly to Hurghada", details: "Philae temple, afternoon flight to the coast." },
      { day: 8, title: "Beach day", details: "Resort beach and pools." },
      { day: 9, title: "Giftun Island", details: "Boat trip and snorkel for the family." },
      { day: 10, title: "Depart", details: "Transfer to airport." }
    ]
  },
  {
    slug: "egypt-jordan-12-days",
    title: "Egypt & Jordan: Pharaohs to Petra",
    destinationSlug: "petra",
    category: "Luxury",
    durationDays: 12,
    groupSize: "Up to 10",
    priceUSD: 3290,
    rating: 4.9,
    reviewCount: 64,
    summary:
      "The two greatest civilisations of the ancient world in one trip. Cairo, a Nile cruise, then a flight to Amman for Jerash, Petra and a night under the stars in Wadi Rum.",
    image:
      "https://images.unsplash.com/photo-1518306727298-4c17e1bf6942?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "5★ hotels and cruise throughout",
      "Petra by candlelight",
      "Bubble camp in Wadi Rum",
      "Two countries, one seamless trip"
    ],
    includes: [
      "11 nights 5★ accommodation",
      "All internal flights",
      "Private guides in both countries",
      "Most meals"
    ],
    excludes: [
      "International flights",
      "Jordan & Egypt visas",
      "Travel insurance",
      "Some lunches"
    ],
    itinerary: [
      { day: 1, title: "Arrive Cairo", details: "Welcome dinner with Nile view." },
      { day: 2, title: "Pyramids & GEM", details: "Full pyramids day, evening at Grand Egyptian Museum." },
      { day: 3, title: "Fly to Luxor", details: "Board cruise, sunset at Karnak." },
      { day: 4, title: "West Bank", details: "Valley of the Kings & balloon option." },
      { day: 5, title: "Sail south", details: "Edfu, Kom Ombo, cocktails on deck." },
      { day: 6, title: "Aswan", details: "Philae and felucca sail." },
      { day: 7, title: "Fly to Amman", details: "Via Cairo, evening rest in Amman." },
      { day: 8, title: "Jerash & Dead Sea", details: "Roman ruins then float in the Dead Sea." },
      { day: 9, title: "Drive to Petra", details: "Kings' Highway scenic route, dinner in Petra." },
      { day: 10, title: "Petra full day", details: "Treasury, Monastery hike, Petra by candlelight." },
      { day: 11, title: "Wadi Rum", details: "4x4 desert tour, bubble camp overnight." },
      { day: 12, title: "Fly home", details: "Drive to Amman, depart." }
    ]
  },
  {
    slug: "white-desert-4-days",
    title: "White Desert Safari",
    destinationSlug: "cairo",
    category: "Adventure",
    durationDays: 4,
    groupSize: "Up to 8",
    priceUSD: 540,
    rating: 4.8,
    reviewCount: 52,
    summary:
      "Four-day 4x4 expedition from Cairo into the Western Desert: Bahariya oasis, the Black Desert, Crystal Mountain and an overnight camp under the white chalk formations.",
    image:
      "https://images.unsplash.com/photo-1547637205-fde0f8c6a6cd?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Overnight camp under the stars",
      "Crystal Mountain & Black Desert",
      "Bedouin guides and cuisine",
      "Salt lakes of Bahariya"
    ],
    includes: [
      "3 nights accommodation (1 hotel + 2 desert camps)",
      "4x4 with experienced driver",
      "All meals on safari",
      "Cairo round-trip transport"
    ],
    excludes: [
      "Sleeping bag rental",
      "Drinks beyond water & tea",
      "Personal gear",
      "Travel insurance"
    ],
    itinerary: [
      { day: 1, title: "Cairo → Bahariya", details: "Drive into the desert, hot spring afternoon." },
      { day: 2, title: "Black Desert & camp", details: "Crystal Mountain, sunset over the white chalk." },
      { day: 3, title: "Desert hike & drive back", details: "Morning hike, salt lakes, drive towards Cairo." },
      { day: 4, title: "Cairo arrival", details: "Reach Cairo by lunch, optional museum afternoon." }
    ]
  }
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function getToursByDestination(slug: string) {
  return tours.filter((t) => t.destinationSlug === slug);
}
