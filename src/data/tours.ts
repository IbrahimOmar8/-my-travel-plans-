import type { Tour } from "@/lib/types";

export const tours: Tour[] = [
  {
    slug: "classic-egypt-8-days",
    destinationSlug: "cairo",
    category: "Cultural",
    durationDays: 8,
    priceUSD: 1490,
    rating: 4.9,
    reviewCount: 312,
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    groupSize: { en: "Up to 12", ru: "До 12", tr: "12'ye kadar" },
    title: {
      en: "Classic Egypt: Cairo, Luxor & Aswan",
      ru: "Классический Египет: Каир, Луксор и Асуан",
      tr: "Klasik Mısır: Kahire, Luksor ve Asuan"
    },
    summary: {
      en: "The bucket-list itinerary. Pyramids, the new Grand Egyptian Museum, an internal flight to Luxor, and a 3-night Nile cruise down to Aswan.",
      ru: "Маршрут мечты. Пирамиды, новый Большой Египетский музей, перелёт в Луксор и 3-дневный круиз по Нилу до Асуана.",
      tr: "Hayalinizdeki rota. Piramitler, yeni Büyük Mısır Müzesi, Luksor'a iç hat uçuşu ve Asuan'a kadar 3 gecelik Nil teknesi."
    },
    highlights: {
      en: ["Skip-the-line Pyramids access", "Egyptologist guide every day", "3-night 5★ Nile cruise", "Domestic flights included"],
      ru: ["Проход к пирамидам без очереди", "Гид-египтолог каждый день", "3 ночи 5★ круиз по Нилу", "Внутренние перелёты включены"],
      tr: ["Piramitlere sırasız giriş", "Her gün Mısırbilimci rehber", "3 gece 5★ Nil teknesi", "İç hat uçuşlar dahil"]
    },
    includes: {
      en: ["7 nights accommodation (4★/5★)", "All breakfasts, 5 lunches, 4 dinners", "Private a/c transport", "Cairo ↔ Luxor & Aswan ↔ Cairo flights", "All entry fees & guide gratuities"],
      ru: ["7 ночей проживания (4★/5★)", "Все завтраки, 5 обедов, 4 ужина", "Частный транспорт с кондиционером", "Перелёты Каир ↔ Луксор и Асуан ↔ Каир", "Все входные билеты и чаевые гидам"],
      tr: ["7 gece konaklama (4★/5★)", "Tüm kahvaltılar, 5 öğle, 4 akşam yemeği", "Özel klimalı araç", "Kahire ↔ Luksor ve Asuan ↔ Kahire uçuşları", "Tüm giriş ücretleri ve rehber bahşişleri"]
    },
    excludes: {
      en: ["International flights", "Egypt tourist visa (USD 25 on arrival)", "Travel insurance", "Optional hot-air balloon ride"],
      ru: ["Международные перелёты", "Туристическая виза в Египет ($25 по прилёте)", "Туристическая страховка", "Опциональный полёт на воздушном шаре"],
      tr: ["Uluslararası uçuşlar", "Mısır turist vizesi (varışta 25 USD)", "Seyahat sigortası", "Opsiyonel sıcak hava balonu"]
    },
    itinerary: [
      { day: 1, title: { en: "Arrive Cairo", ru: "Прилёт в Каир", tr: "Kahire'ye varış" }, details: { en: "Airport meet & greet, transfer to your hotel near the Pyramids. Welcome briefing.", ru: "Встреча в аэропорту, трансфер в отель у пирамид. Приветственный брифинг.", tr: "Havalimanında karşılama, Piramitler yakınındaki otele transfer. Karşılama toplantısı." } },
      { day: 2, title: { en: "Pyramids & Sphinx", ru: "Пирамиды и Сфинкс", tr: "Piramitler ve Sfenks" }, details: { en: "Full day Giza plateau, lunch overlooking the pyramids, afternoon at the Grand Egyptian Museum.", ru: "Целый день на плато Гиза, обед с видом на пирамиды, после обеда — Большой Египетский музей.", tr: "Tüm gün Giza platosu, piramit manzaralı öğle yemeği, öğleden sonra Büyük Mısır Müzesi." } },
      { day: 3, title: { en: "Old Cairo & flight to Luxor", ru: "Старый Каир и перелёт в Луксор", tr: "Eski Kahire ve Luksor uçuşu" }, details: { en: "Coptic & Islamic Cairo, Khan El Khalili, evening flight to Luxor and board your cruise.", ru: "Коптский и Исламский Каир, Хан-эль-Халили, вечерний перелёт в Луксор и посадка на круиз.", tr: "Kıpti ve İslami Kahire, Han El Halili, akşam Luksor uçuşu ve tekneye biniş." } },
      { day: 4, title: { en: "East Bank Luxor", ru: "Восточный берег Луксора", tr: "Luksor Doğu Yakası" }, details: { en: "Karnak and Luxor temples with your Egyptologist. Optional sound & light show.", ru: "Храмы Карнак и Луксор с египтологом. Опциональное шоу света и звука.", tr: "Mısırbilimcinizle Karnak ve Luksor tapınakları. Opsiyonel ışık ve ses gösterisi." } },
      { day: 5, title: { en: "West Bank & sail to Edfu", ru: "Западный берег и отплытие в Эдфу", tr: "Batı Yakası ve Edfu'ya yelken" }, details: { en: "Valley of the Kings, Hatshepsut and the Colossi of Memnon. Afternoon sailing.", ru: "Долина Царей, Хатшепсут и Колоссы Мемнона. Отплытие после обеда.", tr: "Krallar Vadisi, Hatşepsut ve Memnon Devleri. Öğleden sonra yelken." } },
      { day: 6, title: { en: "Edfu & Kom Ombo", ru: "Эдфу и Ком-Омбо", tr: "Edfu ve Kom Ombo" }, details: { en: "Two temple stops by horse-carriage and walking. Cocktail party on deck.", ru: "Два храма пешком и на конной повозке. Коктейль на палубе.", tr: "At arabasıyla ve yürüyerek iki tapınak. Güvertede kokteyl partisi." } },
      { day: 7, title: { en: "Aswan", ru: "Асуан", tr: "Asuan" }, details: { en: "Philae temple by boat, felucca sail around Elephantine Island, Nubian dinner.", ru: "Храм Филе на лодке, прогулка на фелуке вокруг острова Элефантина, нубийский ужин.", tr: "Tekneyle Philae tapınağı, Elephantine adası çevresinde feluka, Nubya yemeği." } },
      { day: 8, title: { en: "Fly home", ru: "Возвращение", tr: "Eve dönüş" }, details: { en: "Optional Abu Simbel sunrise add-on, then flight back to Cairo and onward.", ru: "Опциональный рассвет в Абу-Симбеле, затем перелёт в Каир и домой.", tr: "Opsiyonel şafakta Abu Simbel, ardından Kahire'ye dönüş uçuşu ve eve." } }
    ]
  },
  {
    slug: "nile-cruise-5-days",
    destinationSlug: "luxor",
    category: "Cruise",
    durationDays: 5,
    priceUSD: 890,
    rating: 4.8,
    reviewCount: 198,
    image:
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=80",
    groupSize: { en: "Up to 80 (cruise)", ru: "До 80 (круиз)", tr: "80'e kadar (tekne)" },
    title: {
      en: "Nile Cruise: Luxor to Aswan",
      ru: "Круиз по Нилу: Луксор – Асуан",
      tr: "Nil Yelkeni: Luksor – Asuan"
    },
    summary: {
      en: "Four nights aboard a refurbished 5★ Nile cruiser with daily guided shore excursions, all meals, and sundowners on deck.",
      ru: "Четыре ночи на обновлённом 5★ нильском теплоходе с ежедневными экскурсиями, всеми приёмами пищи и закатами на палубе.",
      tr: "Yenilenmiş 5★ bir Nil teknesinde dört gece; günlük rehberli kıyı turları, tüm öğünler ve güvertede gün batımı içecekleri."
    },
    highlights: {
      en: ["5★ Nile cruiser, river-view cabin", "Egyptologist on board", "Full board with themed dinners", "All temple entry fees included"],
      ru: ["5★ теплоход, каюта с видом на реку", "Египтолог на борту", "Полный пансион с тематическими ужинами", "Все входные билеты в храмы включены"],
      tr: ["5★ Nil teknesi, nehir manzaralı kabin", "Gemide Mısırbilimci", "Tam pansiyon ve temalı akşam yemekleri", "Tüm tapınak giriş ücretleri dahil"]
    },
    includes: {
      en: ["4 nights full board on cruise", "All shore excursions", "Airport ↔ cruise transfers", "Onboard entertainment"],
      ru: ["4 ночи полный пансион на круизе", "Все береговые экскурсии", "Трансферы аэропорт ↔ теплоход", "Развлекательная программа на борту"],
      tr: ["Teknede 4 gece tam pansiyon", "Tüm kıyı turları", "Havalimanı ↔ tekne transferleri", "Gemide eğlence"]
    },
    excludes: {
      en: ["Flights to Luxor / from Aswan", "Hot-air balloon ride", "Drinks at the bar", "Crew gratuities (≈ USD 8 / day)"],
      ru: ["Перелёты в Луксор / из Асуана", "Полёт на воздушном шаре", "Напитки в баре", "Чаевые экипажу (≈ $8/день)"],
      tr: ["Luksor'a / Asuan'dan uçuşlar", "Sıcak hava balonu", "Bardaki içecekler", "Mürettebat bahşişi (≈ 8 USD / gün)"]
    },
    itinerary: [
      { day: 1, title: { en: "Embark in Luxor", ru: "Посадка в Луксоре", tr: "Luksor'da biniş" }, details: { en: "Board after lunch, afternoon at Karnak and Luxor temples.", ru: "Посадка после обеда, во второй половине дня — храмы Карнак и Луксор.", tr: "Öğle sonrası gemiye biniş, öğleden sonra Karnak ve Luksor tapınakları." } },
      { day: 2, title: { en: "West Bank Luxor", ru: "Западный берег Луксора", tr: "Luksor Batı Yakası" }, details: { en: "Valley of the Kings, Hatshepsut, sail to Edfu in the afternoon.", ru: "Долина Царей, Хатшепсут, после обеда отплытие в Эдфу.", tr: "Krallar Vadisi, Hatşepsut, öğleden sonra Edfu'ya yelken." } },
      { day: 3, title: { en: "Edfu & Kom Ombo", ru: "Эдфу и Ком-Омбо", tr: "Edfu ve Kom Ombo" }, details: { en: "Horus and the crocodile god, sail to Aswan by sunset.", ru: "Храмы Гора и Крокодильего бога, отплытие в Асуан к закату.", tr: "Horus ve timsah tanrı, gün batımına Asuan'a yelken." } },
      { day: 4, title: { en: "Aswan", ru: "Асуан", tr: "Asuan" }, details: { en: "High Dam, Philae, optional Abu Simbel add-on. Nubian dinner on deck.", ru: "Высотная плотина, Филе, опциональная поездка в Абу-Симбел. Нубийский ужин на палубе.", tr: "Asuan Barajı, Philae, opsiyonel Abu Simbel. Güvertede Nubya yemeği." } },
      { day: 5, title: { en: "Disembark", ru: "Высадка", tr: "Tekneden iniş" }, details: { en: "Breakfast, transfer to Aswan airport.", ru: "Завтрак, трансфер в аэропорт Асуана.", tr: "Kahvaltı, Asuan havalimanına transfer." } }
    ]
  },
  {
    slug: "red-sea-7-days",
    destinationSlug: "sharm-el-sheikh",
    category: "Beach",
    durationDays: 7,
    priceUSD: 720,
    rating: 4.7,
    reviewCount: 145,
    image:
      "https://images.unsplash.com/photo-1518563259479-d003c05a6507?auto=format&fit=crop&w=1600&q=80",
    groupSize: { en: "Independent", ru: "Индивидуально", tr: "Bireysel" },
    title: {
      en: "Red Sea Escape: Sharm El Sheikh",
      ru: "Отдых на Красном море: Шарм-эль-Шейх",
      tr: "Kızıldeniz Kaçamağı: Şarm El Şeyh"
    },
    summary: {
      en: "Seven nights all-inclusive in a 5★ beachfront resort, plus two guided sea days at Ras Mohammed and Tiran Island.",
      ru: "Семь ночей all-inclusive в 5★ пляжном отеле плюс два морских дня в Рас-Мохаммед и на острове Тиран.",
      tr: "5★ sahil otelinde yedi gece her şey dahil; Ras Muhammed ve Tiran Adası'nda iki rehberli deniz günü."
    },
    highlights: {
      en: ["5★ all-inclusive beach resort", "Ras Mohammed snorkel cruise", "Tiran Island day trip", "Optional PADI Open Water"],
      ru: ["5★ all-inclusive пляжный отель", "Снорклинг-круиз в Рас-Мохаммед", "Поездка на остров Тиран", "Опциональный курс PADI Open Water"],
      tr: ["5★ her şey dahil sahil oteli", "Ras Muhammed şnorkel turu", "Tiran Adası günlük turu", "Opsiyonel PADI Open Water"]
    },
    includes: {
      en: ["7 nights all-inclusive", "Airport transfers", "2 day-cruises with lunch", "Resort welcome pack"],
      ru: ["7 ночей all-inclusive", "Трансферы из аэропорта", "2 морские прогулки с обедом", "Приветственный пакет отеля"],
      tr: ["7 gece her şey dahil", "Havalimanı transferleri", "Öğle yemekli 2 tekne turu", "Otel hoş geldin paketi"]
    },
    excludes: {
      en: ["International flights", "Diving certification (add USD 380)", "Spa treatments", "Excursions outside the resort"],
      ru: ["Международные перелёты", "Сертификация по дайвингу (+$380)", "Спа-процедуры", "Экскурсии вне отеля"],
      tr: ["Uluslararası uçuşlar", "Dalış sertifikası (+380 USD)", "Spa hizmetleri", "Otel dışı turlar"]
    },
    itinerary: [
      { day: 1, title: { en: "Arrive Sharm", ru: "Прилёт в Шарм", tr: "Şarm'a varış" }, details: { en: "Transfer to resort, beach welcome.", ru: "Трансфер в отель, приветствие на пляже.", tr: "Otele transfer, sahilde karşılama." } },
      { day: 2, title: { en: "Free day", ru: "Свободный день", tr: "Serbest gün" }, details: { en: "Beach, pools, optional spa.", ru: "Пляж, бассейны, опциональное спа.", tr: "Plaj, havuzlar, opsiyonel spa." } },
      { day: 3, title: { en: "Ras Mohammed", ru: "Рас-Мохаммед", tr: "Ras Muhammed" }, details: { en: "Snorkel cruise with lunch on board.", ru: "Снорклинг-круиз с обедом на борту.", tr: "Teknede öğle yemekli şnorkel turu." } },
      { day: 4, title: { en: "Free day", ru: "Свободный день", tr: "Serbest gün" }, details: { en: "Optional sunset quad-bike in the desert.", ru: "Опциональная поездка на квадроцикле в пустыне на закате.", tr: "Opsiyonel gün batımı çöl ATV turu." } },
      { day: 5, title: { en: "Tiran Island", ru: "Остров Тиран", tr: "Tiran Adası" }, details: { en: "Catamaran trip to the best reefs in Sharm.", ru: "Поездка на катамаране к лучшим рифам Шарма.", tr: "Şarm'ın en iyi resiflerine katamaran turu." } },
      { day: 6, title: { en: "Free day", ru: "Свободный день", tr: "Serbest gün" }, details: { en: "Old Market evening optional.", ru: "Опциональный вечер на Старом рынке.", tr: "Opsiyonel Old Market akşamı." } },
      { day: 7, title: { en: "Depart", ru: "Отъезд", tr: "Ayrılış" }, details: { en: "Transfer to airport.", ru: "Трансфер в аэропорт.", tr: "Havalimanına transfer." } }
    ]
  },
  {
    slug: "egypt-family-10-days",
    destinationSlug: "hurghada",
    category: "Family",
    durationDays: 10,
    priceUSD: 1980,
    rating: 4.9,
    reviewCount: 86,
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    groupSize: { en: "Private family", ru: "Только ваша семья", tr: "Aileye özel" },
    title: {
      en: "Family Egypt: Pyramids, Nile & Beach",
      ru: "Семейный Египет: Пирамиды, Нил и пляж",
      tr: "Aile Mısır: Piramitler, Nil ve Sahil"
    },
    summary: {
      en: "A private, kid-friendly itinerary: 3 nights Cairo, 3-night Nile cruise, 3 nights Hurghada beach. Connecting rooms, child seats, and a guide trained for families.",
      ru: "Частный маршрут для семей с детьми: 3 ночи в Каире, 3-дневный круиз по Нилу, 3 ночи на пляже Хургады. Смежные номера, детские кресла и гид, обученный для семей.",
      tr: "Çocuk dostu özel rota: Kahire'de 3 gece, 3 gece Nil teknesi, Hurgada sahilinde 3 gece. Bağlantılı odalar, çocuk koltukları ve aileler için eğitimli rehber."
    },
    highlights: {
      en: ["Private guide & vehicle throughout", "Family-friendly hotels", "Storytelling-style guiding", "Beach finale in Hurghada"],
      ru: ["Частный гид и автомобиль весь тур", "Семейные отели", "Гид в формате сторителлинга", "Финал на пляже в Хургаде"],
      tr: ["Tur boyunca özel rehber ve araç", "Aile dostu oteller", "Hikâye anlatımıyla rehberlik", "Hurgada sahilinde final"]
    },
    includes: {
      en: ["9 nights accommodation", "All breakfasts and most dinners", "Domestic flights", "Private transfers with child seats"],
      ru: ["9 ночей проживания", "Все завтраки и большинство ужинов", "Внутренние перелёты", "Частные трансферы с детскими креслами"],
      tr: ["9 gece konaklama", "Tüm kahvaltılar ve çoğu akşam yemeği", "İç hat uçuşlar", "Çocuk koltuklu özel transferler"]
    },
    excludes: {
      en: ["International flights", "Tourist visa", "Optional ATV / camel rides", "Travel insurance"],
      ru: ["Международные перелёты", "Туристическая виза", "Опциональные катания на квадроциклах / верблюдах", "Туристическая страховка"],
      tr: ["Uluslararası uçuşlar", "Turist vizesi", "Opsiyonel ATV / deve turu", "Seyahat sigortası"]
    },
    itinerary: [
      { day: 1, title: { en: "Arrive Cairo", ru: "Прилёт в Каир", tr: "Kahire'ye varış" }, details: { en: "Family welcome, dinner at the hotel.", ru: "Семейная встреча, ужин в отеле.", tr: "Aile karşılaması, otelde akşam yemeği." } },
      { day: 2, title: { en: "Pyramids day", ru: "День пирамид", tr: "Piramitler günü" }, details: { en: "Pyramids, camel ride, lunch, Sphinx.", ru: "Пирамиды, прогулка на верблюде, обед, Сфинкс.", tr: "Piramitler, deve turu, öğle yemeği, Sfenks." } },
      { day: 3, title: { en: "Museum & bazaar", ru: "Музей и базар", tr: "Müze ve çarşı" }, details: { en: "Grand Egyptian Museum and Khan El Khalili treasure hunt.", ru: "Большой Египетский музей и поиск сокровищ на Хан-эль-Халили.", tr: "Büyük Mısır Müzesi ve Han El Halili hazine avı." } },
      { day: 4, title: { en: "Fly to Luxor", ru: "Перелёт в Луксор", tr: "Luksor uçuşu" }, details: { en: "Board cruise, gentle afternoon walk in Karnak.", ru: "Посадка на круиз, неспешная прогулка по Карнаку.", tr: "Tekneye biniş, Karnak'ta yumuşak bir öğleden sonra yürüyüşü." } },
      { day: 5, title: { en: "West Bank", ru: "Западный берег", tr: "Batı Yakası" }, details: { en: "Tombs, then sail south.", ru: "Гробницы, затем отплытие на юг.", tr: "Mezarlar, ardından güneye yelken." } },
      { day: 6, title: { en: "Edfu & Kom Ombo", ru: "Эдфу и Ком-Омбо", tr: "Edfu ve Kom Ombo" }, details: { en: "Horse-carriage rides for the kids.", ru: "Поездки на конных повозках для детей.", tr: "Çocuklar için at arabası turları." } },
      { day: 7, title: { en: "Aswan & fly to Hurghada", ru: "Асуан и перелёт в Хургаду", tr: "Asuan ve Hurgada uçuşu" }, details: { en: "Philae temple, afternoon flight to the coast.", ru: "Храм Филе, дневной перелёт на побережье.", tr: "Philae tapınağı, öğleden sonra sahile uçuş." } },
      { day: 8, title: { en: "Beach day", ru: "День на пляже", tr: "Plaj günü" }, details: { en: "Resort beach and pools.", ru: "Пляж отеля и бассейны.", tr: "Otel plajı ve havuzları." } },
      { day: 9, title: { en: "Giftun Island", ru: "Остров Гифтун", tr: "Giftun Adası" }, details: { en: "Boat trip and snorkel for the family.", ru: "Морская прогулка и снорклинг для всей семьи.", tr: "Aileye özel tekne ve şnorkel turu." } },
      { day: 10, title: { en: "Depart", ru: "Отъезд", tr: "Ayrılış" }, details: { en: "Transfer to airport.", ru: "Трансфер в аэропорт.", tr: "Havalimanına transfer." } }
    ]
  },
  {
    slug: "egypt-jordan-12-days",
    destinationSlug: "petra",
    category: "Luxury",
    durationDays: 12,
    priceUSD: 3290,
    rating: 4.9,
    reviewCount: 64,
    image:
      "https://images.unsplash.com/photo-1518306727298-4c17e1bf6942?auto=format&fit=crop&w=1600&q=80",
    groupSize: { en: "Up to 10", ru: "До 10", tr: "10'a kadar" },
    title: {
      en: "Egypt & Jordan: Pharaohs to Petra",
      ru: "Египет и Иордания: От фараонов до Петры",
      tr: "Mısır ve Ürdün: Firavunlardan Petra'ya"
    },
    summary: {
      en: "The two greatest civilisations of the ancient world in one trip. Cairo, a Nile cruise, then a flight to Amman for Jerash, Petra and a night under the stars in Wadi Rum.",
      ru: "Две великие цивилизации древности в одной поездке. Каир, круиз по Нилу, затем перелёт в Амман — Джераш, Петра и ночь под звёздами в Вади-Рам.",
      tr: "Antik dünyanın en büyük iki uygarlığı tek bir gezide. Kahire, Nil yelkeni, ardından Amman uçuşu, Cerash, Petra ve Wadi Rum'da yıldızlar altında bir gece."
    },
    highlights: {
      en: ["5★ hotels and cruise throughout", "Petra by candlelight", "Bubble camp in Wadi Rum", "Two countries, one seamless trip"],
      ru: ["5★ отели и круиз весь маршрут", "Петра при свечах", "Палатка-купол в Вади-Рам", "Две страны, одно бесшовное путешествие"],
      tr: ["Tur boyunca 5★ otel ve tekne", "Mum ışığında Petra", "Wadi Rum'da kubbe kamp", "İki ülke, kusursuz tek seyahat"]
    },
    includes: {
      en: ["11 nights 5★ accommodation", "All internal flights", "Private guides in both countries", "Most meals"],
      ru: ["11 ночей в 5★ отелях", "Все внутренние перелёты", "Частные гиды в обеих странах", "Большинство приёмов пищи"],
      tr: ["11 gece 5★ konaklama", "Tüm iç hat uçuşlar", "Her iki ülkede özel rehberler", "Çoğu öğün"]
    },
    excludes: {
      en: ["International flights", "Jordan & Egypt visas", "Travel insurance", "Some lunches"],
      ru: ["Международные перелёты", "Визы Иордании и Египта", "Туристическая страховка", "Некоторые обеды"],
      tr: ["Uluslararası uçuşlar", "Ürdün ve Mısır vizeleri", "Seyahat sigortası", "Bazı öğle yemekleri"]
    },
    itinerary: [
      { day: 1, title: { en: "Arrive Cairo", ru: "Прилёт в Каир", tr: "Kahire'ye varış" }, details: { en: "Welcome dinner with Nile view.", ru: "Приветственный ужин с видом на Нил.", tr: "Nil manzaralı karşılama yemeği." } },
      { day: 2, title: { en: "Pyramids & GEM", ru: "Пирамиды и GEM", tr: "Piramitler ve GEM" }, details: { en: "Full pyramids day, evening at Grand Egyptian Museum.", ru: "Целый день пирамид, вечер в Большом Египетском музее.", tr: "Tüm gün piramitler, akşam Büyük Mısır Müzesi." } },
      { day: 3, title: { en: "Fly to Luxor", ru: "Перелёт в Луксор", tr: "Luksor uçuşu" }, details: { en: "Board cruise, sunset at Karnak.", ru: "Посадка на круиз, закат в Карнаке.", tr: "Tekneye biniş, Karnak'ta gün batımı." } },
      { day: 4, title: { en: "West Bank", ru: "Западный берег", tr: "Batı Yakası" }, details: { en: "Valley of the Kings & balloon option.", ru: "Долина Царей, опциональный воздушный шар.", tr: "Krallar Vadisi ve balon seçeneği." } },
      { day: 5, title: { en: "Sail south", ru: "Плавание на юг", tr: "Güneye yelken" }, details: { en: "Edfu, Kom Ombo, cocktails on deck.", ru: "Эдфу, Ком-Омбо, коктейли на палубе.", tr: "Edfu, Kom Ombo, güvertede kokteyl." } },
      { day: 6, title: { en: "Aswan", ru: "Асуан", tr: "Asuan" }, details: { en: "Philae and felucca sail.", ru: "Филе и прогулка на фелуке.", tr: "Philae ve felukayla yelken." } },
      { day: 7, title: { en: "Fly to Amman", ru: "Перелёт в Амман", tr: "Amman uçuşu" }, details: { en: "Via Cairo, evening rest in Amman.", ru: "Через Каир, вечерний отдых в Аммане.", tr: "Kahire üzerinden, Amman'da akşam dinlenme." } },
      { day: 8, title: { en: "Jerash & Dead Sea", ru: "Джераш и Мёртвое море", tr: "Cerash ve Ölü Deniz" }, details: { en: "Roman ruins then float in the Dead Sea.", ru: "Римские руины, затем купание в Мёртвом море.", tr: "Roma kalıntıları ve Ölü Deniz'de yüzme." } },
      { day: 9, title: { en: "Drive to Petra", ru: "Поездка в Петру", tr: "Petra'ya yolculuk" }, details: { en: "Kings' Highway scenic route, dinner in Petra.", ru: "Живописная Королевская дорога, ужин в Петре.", tr: "Krallar Yolu manzaralı güzergâh, Petra'da akşam yemeği." } },
      { day: 10, title: { en: "Petra full day", ru: "Полный день в Петре", tr: "Tüm gün Petra" }, details: { en: "Treasury, Monastery hike, Petra by candlelight.", ru: "Сокровищница, поход к Монастырю, Петра при свечах.", tr: "Hazine, Manastır yürüyüşü, mum ışığında Petra." } },
      { day: 11, title: { en: "Wadi Rum", ru: "Вади-Рам", tr: "Wadi Rum" }, details: { en: "4x4 desert tour, bubble camp overnight.", ru: "Поездка по пустыне на 4x4, ночёвка в палатке-куполе.", tr: "4x4 çöl turu, kubbe kampta gece." } },
      { day: 12, title: { en: "Fly home", ru: "Возвращение", tr: "Eve dönüş" }, details: { en: "Drive to Amman, depart.", ru: "Поездка в Амман, отъезд.", tr: "Amman'a yolculuk, ayrılış." } }
    ]
  },
  {
    slug: "white-desert-4-days",
    destinationSlug: "cairo",
    category: "Adventure",
    durationDays: 4,
    priceUSD: 540,
    rating: 4.8,
    reviewCount: 52,
    image:
      "https://images.unsplash.com/photo-1547637205-fde0f8c6a6cd?auto=format&fit=crop&w=1600&q=80",
    groupSize: { en: "Up to 8", ru: "До 8", tr: "8'e kadar" },
    title: {
      en: "White Desert Safari",
      ru: "Сафари по Белой пустыне",
      tr: "Beyaz Çöl Safarisi"
    },
    summary: {
      en: "Four-day 4x4 expedition from Cairo into the Western Desert: Bahariya oasis, the Black Desert, Crystal Mountain and an overnight camp under the white chalk formations.",
      ru: "Четырёхдневная экспедиция на 4x4 из Каира в Западную пустыню: оазис Бахария, Чёрная пустыня, Хрустальная гора и ночёвка среди белых меловых скал.",
      tr: "Kahire'den Batı Çölü'ne dört günlük 4x4 keşfi: Bahariye vahası, Kara Çöl, Kristal Dağı ve beyaz tebeşir kayaları altında bir gece kampı."
    },
    highlights: {
      en: ["Overnight camp under the stars", "Crystal Mountain & Black Desert", "Bedouin guides and cuisine", "Salt lakes of Bahariya"],
      ru: ["Ночёвка под звёздами", "Хрустальная гора и Чёрная пустыня", "Бедуинские гиды и кухня", "Солёные озёра Бахарии"],
      tr: ["Yıldızlar altında geceleme", "Kristal Dağı ve Kara Çöl", "Bedevi rehberler ve mutfak", "Bahariye tuz gölleri"]
    },
    includes: {
      en: ["3 nights accommodation (1 hotel + 2 desert camps)", "4x4 with experienced driver", "All meals on safari", "Cairo round-trip transport"],
      ru: ["3 ночи проживания (1 отель + 2 пустынных лагеря)", "4x4 с опытным водителем", "Все приёмы пищи на сафари", "Транспорт Каир – туда и обратно"],
      tr: ["3 gece konaklama (1 otel + 2 çöl kampı)", "Deneyimli sürücülü 4x4", "Safaride tüm öğünler", "Kahire gidiş-dönüş ulaşım"]
    },
    excludes: {
      en: ["Sleeping bag rental", "Drinks beyond water & tea", "Personal gear", "Travel insurance"],
      ru: ["Аренда спального мешка", "Напитки сверх воды и чая", "Личное снаряжение", "Туристическая страховка"],
      tr: ["Uyku tulumu kirası", "Su ve çay dışı içecekler", "Kişisel ekipman", "Seyahat sigortası"]
    },
    itinerary: [
      { day: 1, title: { en: "Cairo → Bahariya", ru: "Каир → Бахария", tr: "Kahire → Bahariye" }, details: { en: "Drive into the desert, hot spring afternoon.", ru: "Дорога в пустыню, горячие источники во второй половине дня.", tr: "Çöle yolculuk, öğleden sonra kaplıcalar." } },
      { day: 2, title: { en: "Black Desert & camp", ru: "Чёрная пустыня и лагерь", tr: "Kara Çöl ve kamp" }, details: { en: "Crystal Mountain, sunset over the white chalk.", ru: "Хрустальная гора, закат над белым мелом.", tr: "Kristal Dağı, beyaz tebeşir üzerinde gün batımı." } },
      { day: 3, title: { en: "Desert hike & drive back", ru: "Поход и обратная дорога", tr: "Çöl yürüyüşü ve dönüş" }, details: { en: "Morning hike, salt lakes, drive towards Cairo.", ru: "Утренний поход, солёные озёра, дорога в Каир.", tr: "Sabah yürüyüşü, tuz gölleri, Kahire'ye doğru yol." } },
      { day: 4, title: { en: "Cairo arrival", ru: "Прибытие в Каир", tr: "Kahire'ye varış" }, details: { en: "Reach Cairo by lunch, optional museum afternoon.", ru: "Прибытие в Каир к обеду, опциональный визит в музей.", tr: "Öğleye Kahire, opsiyonel müze öğleden sonrası." } }
    ]
  }
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function getToursByDestination(slug: string) {
  return tours.filter((t) => t.destinationSlug === slug);
}
