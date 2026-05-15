import type { Destination } from "@/lib/types";

export const destinations: Destination[] = [
  {
    slug: "cairo",
    country: { en: "Egypt", ru: "Египет", tr: "Mısır" },
    bestSeason: {
      en: "October – April",
      ru: "Октябрь – Апрель",
      tr: "Ekim – Nisan"
    },
    heroImage:
      "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1600&q=80",
    name: {
      en: "Cairo & Giza",
      ru: "Каир и Гиза",
      tr: "Kahire ve Giza"
    },
    tagline: {
      en: "Where pyramids meet a city that never sleeps",
      ru: "Пирамиды и город, который никогда не спит",
      tr: "Piramitlerin hiç uyumayan şehirle buluştuğu yer"
    },
    description: {
      en: "Stand in the shadow of the Great Pyramid, lock eyes with the Sphinx, then lose yourself in the alleys of Khan El Khalili. Cairo blends 4,500 years of history with the buzz of a 22-million-person metropolis.",
      ru: "Постойте в тени Великой пирамиды, встретьтесь взглядом со Сфинксом, а затем затеряйтесь в переулках Хан-эль-Халили. Каир сочетает 4500 лет истории с энергией мегаполиса на 22 миллиона человек.",
      tr: "Büyük Piramit'in gölgesinde durun, Sfenks'le göz göze gelin ve ardından Han El Halili sokaklarında kaybolun. Kahire, 4.500 yıllık tarihi 22 milyon nüfuslu bir metropolün enerjisiyle birleştirir."
    },
    highlights: {
      en: ["Pyramids of Giza & the Sphinx", "Grand Egyptian Museum", "Khan El Khalili bazaar", "Coptic & Islamic Cairo"],
      ru: ["Пирамиды Гизы и Сфинкс", "Большой Египетский музей", "Базар Хан-эль-Халили", "Коптский и Исламский Каир"],
      tr: ["Giza Piramitleri ve Sfenks", "Büyük Mısır Müzesi", "Han El Halili çarşısı", "Kıpti ve İslami Kahire"]
    }
  },
  {
    slug: "luxor",
    country: { en: "Egypt", ru: "Египет", tr: "Mısır" },
    bestSeason: {
      en: "November – March",
      ru: "Ноябрь – Март",
      tr: "Kasım – Mart"
    },
    heroImage:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80",
    name: { en: "Luxor", ru: "Луксор", tr: "Luksor" },
    tagline: {
      en: "The world's greatest open-air museum",
      ru: "Крупнейший музей под открытым небом",
      tr: "Dünyanın en büyük açık hava müzesi"
    },
    description: {
      en: "Ancient Thebes packs more wonders per square mile than anywhere on earth. Cross the Nile at dawn to the Valley of the Kings, then return for sunset over Karnak's towering columns.",
      ru: "Древние Фивы вмещают больше чудес на квадратный километр, чем любое другое место на Земле. Пересеките Нил на рассвете к Долине Царей, а вечером встретьте закат у колонн Карнака.",
      tr: "Antik Thebes, dünyanın hiçbir yerinde olmadığı kadar çok mucizeyi bir araya getirir. Şafakta Nil'i geçerek Krallar Vadisi'ne ulaşın, akşam ise Karnak'ın devasa sütunları üzerinde gün batımına dönün."
    },
    highlights: {
      en: ["Valley of the Kings", "Karnak & Luxor Temples", "Hot-air balloon at sunrise", "Hatshepsut Temple"],
      ru: ["Долина Царей", "Храмы Карнак и Луксор", "Полёт на воздушном шаре на рассвете", "Храм Хатшепсут"],
      tr: ["Krallar Vadisi", "Karnak ve Luksor Tapınakları", "Şafakta sıcak hava balonu", "Hatşepsut Tapınağı"]
    }
  },
  {
    slug: "aswan",
    country: { en: "Egypt", ru: "Египет", tr: "Mısır" },
    bestSeason: {
      en: "October – April",
      ru: "Октябрь – Апрель",
      tr: "Ekim – Nisan"
    },
    heroImage:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    name: { en: "Aswan", ru: "Асуан", tr: "Asuan" },
    tagline: {
      en: "Nubian soul on the calm Nile",
      ru: "Нубийская душа на спокойном Ниле",
      tr: "Sakin Nil'de Nubya'nın ruhu"
    },
    description: {
      en: "Aswan is where the Nile slows down and the desert glows pink at dusk. Sail in a felucca, visit Philae temple by boat, and overnight on a colourful Nubian island.",
      ru: "В Асуане Нил замедляет течение, а пустыня в сумерках светится розовым. Поплавайте на фелуке, посетите храм Филе на лодке и переночуйте на красочном нубийском острове.",
      tr: "Asuan, Nil'in yavaşladığı ve çölün alacakaranlıkta pembe parıldadığı yerdir. Bir felukayla yelken açın, Philae tapınağına tekneyle gidin ve rengârenk bir Nubya adasında geceleyin."
    },
    highlights: {
      en: ["Philae Temple", "Abu Simbel day trip", "Felucca sail at sunset", "Nubian village homestay"],
      ru: ["Храм Филе", "Однодневная поездка в Абу-Симбел", "Прогулка на фелуке на закате", "Ночёвка в нубийской деревне"],
      tr: ["Philae Tapınağı", "Günübirlik Abu Simbel turu", "Gün batımında felukayla yelken", "Nubya köyünde konaklama"]
    }
  },
  {
    slug: "sharm-el-sheikh",
    country: { en: "Egypt", ru: "Египет", tr: "Mısır" },
    bestSeason: { en: "Year-round", ru: "Круглый год", tr: "Yıl boyu" },
    heroImage:
      "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1600&q=80",
    name: {
      en: "Sharm El Sheikh",
      ru: "Шарм-эль-Шейх",
      tr: "Şarm El Şeyh"
    },
    tagline: {
      en: "Coral gardens on the Red Sea",
      ru: "Коралловые сады Красного моря",
      tr: "Kızıldeniz'de mercan bahçeleri"
    },
    description: {
      en: "Sun, sand, and some of the best reef diving on the planet. Sharm is built for travellers who want luxury resorts a fin-kick from world-class dive sites at Ras Mohammed.",
      ru: "Солнце, песок и одни из лучших мест для дайвинга на планете. Шарм создан для тех, кто хочет жить в люкс-отелях в двух шагах от рифов Рас-Мохаммед.",
      tr: "Güneş, kum ve dünyanın en iyi resif dalış noktalarından bazıları. Şarm; Ras Muhammed'in birinci sınıf dalış noktalarına yüzme mesafesinde lüks tatil köyleri arayan yolcular için yapılmış."
    },
    highlights: {
      en: ["Ras Mohammed snorkelling", "Tiran Island boat trip", "Desert quad-bike sunset", "All-inclusive beach resorts"],
      ru: ["Снорклинг в Рас-Мохаммед", "Морская прогулка к острову Тиран", "Закат на квадроцикле в пустыне", "All-inclusive пляжные отели"],
      tr: ["Ras Muhammed'de şnorkel", "Tiran Adası tekne turu", "Çölde gün batımı ATV turu", "Her şey dahil sahil tatil köyleri"]
    }
  },
  {
    slug: "hurghada",
    country: { en: "Egypt", ru: "Египет", tr: "Mısır" },
    bestSeason: { en: "Year-round", ru: "Круглый год", tr: "Yıl boyu" },
    heroImage:
      "https://images.unsplash.com/photo-1583265627959-fb7042f5133b?auto=format&fit=crop&w=1600&q=80",
    name: { en: "Hurghada", ru: "Хургада", tr: "Hurgada" },
    tagline: {
      en: "Family beaches on the Red Sea Riviera",
      ru: "Семейные пляжи на Ривьере Красного моря",
      tr: "Kızıldeniz Rivierası'nda aile plajları"
    },
    description: {
      en: "A laid-back Red Sea base with shallow turquoise bays, big family resorts, and easy day trips out to Giftun Island and the desert.",
      ru: "Спокойная база на Красном море с бирюзовыми бухтами, большими семейными курортами и лёгкими экскурсиями на остров Гифтун и в пустыню.",
      tr: "Sığ turkuaz koylar, geniş aile tatil köyleri ve Giftun Adası ile çöle kolay günlük turlarla rahat bir Kızıldeniz üssü."
    },
    highlights: {
      en: ["Giftun Island snorkel cruise", "Submarine reef tour", "Bedouin desert dinner", "Kitesurfing in El Gouna"],
      ru: ["Снорклинг-круиз к острову Гифтун", "Подводный риф-тур", "Ужин в бедуинской пустыне", "Кайтсёрфинг в Эль-Гуне"],
      tr: ["Giftun Adası şnorkel turu", "Denizaltıyla resif turu", "Bedevi çöl yemeği", "El Gouna'da uçurtma sörfü"]
    }
  },
  {
    slug: "petra",
    country: { en: "Jordan", ru: "Иордания", tr: "Ürdün" },
    bestSeason: {
      en: "March – May & September – November",
      ru: "Март – Май и Сентябрь – Ноябрь",
      tr: "Mart – Mayıs & Eylül – Kasım"
    },
    heroImage:
      "https://images.unsplash.com/photo-1563177978-4c5cabd2cad9?auto=format&fit=crop&w=1600&q=80",
    name: { en: "Petra", ru: "Петра", tr: "Petra" },
    tagline: {
      en: "The rose-red city carved in stone",
      ru: "Розово-красный город, высеченный в скале",
      tr: "Taşa oyulmuş gül kırmızısı şehir"
    },
    description: {
      en: "Walk the Siq at first light and watch the Treasury reveal itself between the cliffs. Petra is a once-in-a-lifetime add-on for travellers crossing the Middle East.",
      ru: "Пройдитесь по Сику на рассвете и увидите, как из скал выступает Сокровищница. Петра — это эпизод на всю жизнь для тех, кто путешествует по Ближнему Востоку.",
      tr: "Şafakta Siq vadisinden geçin ve Hazine binasının kayalıkların arasından göründüğünü izleyin. Petra, Orta Doğu'yu gezenler için bir ömürde bir kez yaşanacak bir deneyimdir."
    },
    highlights: {
      en: ["The Treasury at sunrise", "Monastery hike", "Petra by candlelight", "Wadi Rum desert overnight"],
      ru: ["Сокровищница на рассвете", "Поход к Монастырю", "Петра при свечах", "Ночёвка в пустыне Вади-Рам"],
      tr: ["Şafakta Hazine binası", "Manastır yürüyüşü", "Mum ışığında Petra", "Wadi Rum çölünde geceleme"]
    }
  }
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
