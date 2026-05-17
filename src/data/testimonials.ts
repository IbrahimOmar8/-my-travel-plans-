import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    name: "Sophie Laurent",
    country: { en: "France", ru: "Франция", tr: "Fransa" },
    tourSlug: "classic-egypt-8-days",
    rating: 5,
    quote: {
      en: "Every detail was handled. Our Egyptologist Hany made the temples come alive — the kids still talk about it six months later.",
      ru: "Каждая деталь была продумана. Наш египтолог Хани оживил храмы — дети до сих пор вспоминают это полгода спустя.",
      tr: "Her detay düşünülmüştü. Mısırbilimcimiz Hany tapınakları canlandırdı — çocuklar altı ay sonra bile bundan bahsediyor."
    },
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "James Whitaker",
    country: {
      en: "United Kingdom",
      ru: "Великобритания",
      tr: "Birleşik Krallık"
    },
    tourSlug: "egypt-jordan-12-days",
    rating: 5,
    quote: {
      en: "We did Egypt and Jordan back-to-back without a single hiccup. Worth every penny — the Wadi Rum night was the trip's high point.",
      ru: "Мы прошли Египет и Иорданию подряд без единой заминки. Стоит каждой копейки — ночь в Вади-Рам стала кульминацией поездки.",
      tr: "Mısır ve Ürdün'ü tek bir aksilik bile yaşamadan üst üste yaptık. Her kuruşa değdi — Wadi Rum gecesi gezinin zirvesiydi."
    },
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Yuki Tanaka",
    country: { en: "Japan", ru: "Япония", tr: "Japonya" },
    tourSlug: "nile-cruise-5-days",
    rating: 5,
    quote: {
      en: "The cruise was beautiful and the guiding was patient and clear in English. I felt safe travelling alone the entire time.",
      ru: "Круиз был прекрасным, а гид — терпеливым и понятным на английском. Я чувствовала себя в безопасности, путешествуя одна.",
      tr: "Tekne harikaydı ve rehberlik İngilizce, sabırlı ve net oldu. Tek başıma seyahat ederken kendimi sürekli güvende hissettim."
    },
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
  }
];
