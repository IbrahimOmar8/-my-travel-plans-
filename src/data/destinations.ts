import type { Destination } from "@/lib/types";

export const destinations: Destination[] = [
  {
    slug: "cairo",
    name: "Cairo & Giza",
    country: "Egypt",
    tagline: "Where pyramids meet a city that never sleeps",
    description:
      "Stand in the shadow of the Great Pyramid, lock eyes with the Sphinx, then lose yourself in the alleys of Khan El Khalili. Cairo blends 4,500 years of history with the buzz of a 22-million-person metropolis.",
    heroImage:
      "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Pyramids of Giza & the Sphinx",
      "Grand Egyptian Museum",
      "Khan El Khalili bazaar",
      "Coptic & Islamic Cairo"
    ],
    bestSeason: "October – April"
  },
  {
    slug: "luxor",
    name: "Luxor",
    country: "Egypt",
    tagline: "The world's greatest open-air museum",
    description:
      "Ancient Thebes packs more wonders per square mile than anywhere on earth. Cross the Nile at dawn to the Valley of the Kings, then return for sunset over Karnak's towering columns.",
    heroImage:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Valley of the Kings",
      "Karnak & Luxor Temples",
      "Hot-air balloon at sunrise",
      "Hatshepsut Temple"
    ],
    bestSeason: "November – March"
  },
  {
    slug: "aswan",
    name: "Aswan",
    country: "Egypt",
    tagline: "Nubian soul on the calm Nile",
    description:
      "Aswan is where the Nile slows down and the desert glows pink at dusk. Sail in a felucca, visit Philae temple by boat, and overnight on a colourful Nubian island.",
    heroImage:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Philae Temple",
      "Abu Simbel day trip",
      "Felucca sail at sunset",
      "Nubian village homestay"
    ],
    bestSeason: "October – April"
  },
  {
    slug: "sharm-el-sheikh",
    name: "Sharm El Sheikh",
    country: "Egypt",
    tagline: "Coral gardens on the Red Sea",
    description:
      "Sun, sand, and some of the best reef diving on the planet. Sharm is built for travellers who want luxury resorts a fin-kick from world-class dive sites at Ras Mohammed.",
    heroImage:
      "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Ras Mohammed snorkelling",
      "Tiran Island boat trip",
      "Desert quad-bike sunset",
      "All-inclusive beach resorts"
    ],
    bestSeason: "Year-round"
  },
  {
    slug: "hurghada",
    name: "Hurghada",
    country: "Egypt",
    tagline: "Family beaches on the Red Sea Riviera",
    description:
      "A laid-back Red Sea base with shallow turquoise bays, big family resorts, and easy day trips out to Giftun Island and the desert.",
    heroImage:
      "https://images.unsplash.com/photo-1583265627959-fb7042f5133b?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Giftun Island snorkel cruise",
      "Submarine reef tour",
      "Bedouin desert dinner",
      "Kitesurfing in El Gouna"
    ],
    bestSeason: "Year-round"
  },
  {
    slug: "petra",
    name: "Petra",
    country: "Jordan",
    tagline: "The rose-red city carved in stone",
    description:
      "Walk the Siq at first light and watch the Treasury reveal itself between the cliffs. Petra is a once-in-a-lifetime add-on for travellers crossing the Middle East.",
    heroImage:
      "https://images.unsplash.com/photo-1563177978-4c5cabd2cad9?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "The Treasury at sunrise",
      "Monastery hike",
      "Petra by candlelight",
      "Wadi Rum desert overnight"
    ],
    bestSeason: "March – May & September – November"
  }
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
