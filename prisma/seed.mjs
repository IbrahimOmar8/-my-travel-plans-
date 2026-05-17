import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reviews = [
  {
    id: "seed-r1",
    tourSlug: "classic-egypt-8-days",
    name: "Sarah K.",
    country: "United Kingdom",
    rating: 5,
    title: "Worth every penny",
    body: "Our Egyptologist, Hassan, was extraordinary — degree-trained, funny, and clearly loved his job. The Nile cruise hotel was a step above what we expected at this price.",
    status: "approved",
    locale: "en"
  },
  {
    id: "seed-r2",
    tourSlug: "classic-egypt-8-days",
    name: "Marcus L.",
    country: "Germany",
    rating: 5,
    title: "Honeymoon, done right",
    body: "Booked the private upgrade for our honeymoon. They put a hibiscus drink and a hand-written card in the cabin the first night. Small thing — said everything about the operation.",
    status: "approved",
    locale: "en"
  },
  {
    id: "seed-r3",
    tourSlug: "classic-egypt-8-days",
    name: "Анна П.",
    country: "Россия",
    rating: 4,
    title: "Очень хороший тур",
    body: "Гид в Каире блестящий, в Луксоре чуть менее опытный, но всё равно интересно. Внутренний перелёт был задержан, команда сама всё переиграла без нашего стресса.",
    status: "approved",
    locale: "ru"
  },
  {
    id: "seed-r4",
    tourSlug: "nile-cruise-5-days",
    name: "Yuki T.",
    country: "Japan",
    rating: 5,
    title: "The cruise itself is the destination",
    body: "Five days slowly drifting between Luxor and Aswan with sunrise temple visits before the crowds arrived. Cabins are small but the deck and food make up for it.",
    status: "approved",
    locale: "en"
  },
  {
    id: "seed-r5",
    tourSlug: "nile-cruise-5-days",
    name: "Mehmet Y.",
    country: "Türkiye",
    rating: 5,
    title: "Felucca akşamı unutulmaz",
    body: "Aswan'da gün batımında felucca turu programda yokken misafirhane ekibi son anda ayarladı. Hızlı düşündüler, fazladan ücret almadılar. Tavsiye ederim.",
    status: "approved",
    locale: "tr"
  },
  {
    id: "seed-r6",
    tourSlug: "red-sea-7-days",
    name: "Olivia M.",
    country: "Australia",
    rating: 5,
    title: "Diving + culture combo, finally",
    body: "Most operators force you to pick reef or ruins. Nile Horizons stitched together three Red Sea dive days with a Luxor day-trip that actually worked. Boat was clean and small.",
    status: "approved",
    locale: "en"
  },
  {
    id: "seed-r7",
    tourSlug: "red-sea-7-days",
    name: "Дмитрий И.",
    country: "Россия",
    rating: 4,
    title: "Хорошее соотношение цены и качества",
    body: "Отель 4★, не 5★, как мы привыкли, но дайв-центр на уровне. Гид свободно говорит по-русски, что для нас было важно.",
    status: "approved",
    locale: "ru"
  },
  {
    id: "seed-r8",
    tourSlug: "jordan-petra-4-days",
    name: "Antoine D.",
    country: "France",
    rating: 5,
    title: "Petra à l'aube — magique",
    body: "Entered the Siq at 6am, almost alone. The team negotiated the early access permit for us. The Wadi Rum night under the stars was the highlight of the whole region.",
    status: "approved",
    locale: "en"
  },
  {
    id: "seed-r9",
    tourSlug: "jordan-petra-4-days",
    name: "Zeynep A.",
    country: "Türkiye",
    rating: 5,
    title: "Petra ve Wadi Rum kusursuz",
    body: "Ürdün'ün sınırını Mısır turumuza eklediler, geçişler sorunsuz oldu. Bedevi kampı ve yemekleri çok iyiydi.",
    status: "approved",
    locale: "tr"
  },
  {
    id: "seed-r10",
    tourSlug: "cairo-pyramids-4-days",
    name: "Robert F.",
    country: "Canada",
    rating: 5,
    title: "Short trip, no compromise",
    body: "Four days felt rushed on paper but the itinerary was very smartly built — GEM in the morning, pyramids same afternoon, Saqqara separate day. Could not have been better paced.",
    status: "approved",
    locale: "en"
  }
];

const subscribers = [
  { email: "demo+1@example.com", locale: "en", source: "footer" },
  { email: "demo+2@example.com", locale: "ru", source: "blog" }
];

const inquiries = []; // already created via UI

async function main() {
  for (const r of reviews) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: {},
      create: r
    });
  }
  for (const s of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: s.email },
      update: {},
      create: s
    });
  }
  console.log(`Seeded ${reviews.length} reviews, ${subscribers.length} subscribers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
