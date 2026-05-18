import type { LocalizedString } from "@/lib/types";

export type TeamMember = {
  slug: string;
  name: string;
  role: LocalizedString;
  city: string;
  photo: string;
  languages: string[];
  bio: LocalizedString;
  yearsOnTeam: number;
};

export const team: TeamMember[] = [
  {
    slug: "yasmin-hassan",
    name: "Yasmin Hassan",
    role: {
      en: "Lead trip designer · Cairo",
      ru: "Ведущий дизайнер маршрутов · Каир",
      tr: "Baş tur tasarımcısı · Kahire"
    },
    city: "Cairo",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    languages: ["EN", "AR", "FR"],
    bio: {
      en: "Cairo-born Egyptologist who has been guiding small groups through the pyramids for nine years. Yasmin writes most of our journal entries about Cairo and the GEM.",
      ru: "Уроженка Каира, египтолог. Девять лет водит малые группы по пирамидам. Ясмин пишет большинство наших журнальных материалов о Каире и GEM.",
      tr: "Kahire doğumlu Mısırbilimci. Dokuz yıldır piramitler etrafında küçük gruplar yönetiyor. Kahire ve GEM hakkındaki günlük yazılarımızın çoğu Yasmin'den."
    },
    yearsOnTeam: 9
  },
  {
    slug: "karim-saleh",
    name: "Karim Saleh",
    role: {
      en: "Ground operations · Luxor & Aswan",
      ru: "Операции на местах · Луксор и Асуан",
      tr: "Saha operasyonları · Luksor ve Aswan"
    },
    city: "Luxor",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    languages: ["EN", "AR", "DE"],
    bio: {
      en: "Karim runs our Upper Egypt cruise ops out of Luxor. If a flight cancels or a sandstorm hits, he is the person who reshapes the day in under an hour.",
      ru: "Карим руководит круизными операциями Верхнего Египта из Луксора. Если рейс отменили или налетел хамсин, именно он перестраивает день меньше чем за час.",
      tr: "Karim, Yukarı Mısır kruvaziyer operasyonlarını Luksor'dan yürütüyor. Uçuş iptal olursa ya da kum fırtınası vurursa, günü bir saatten kısa sürede yeniden kuran kişi odur."
    },
    yearsOnTeam: 7
  },
  {
    slug: "mariam-el-sayed",
    name: "Mariam El-Sayed",
    role: {
      en: "Guest experience",
      ru: "Сервис гостей",
      tr: "Misafir deneyimi"
    },
    city: "Cairo",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    languages: ["EN", "AR", "ES"],
    bio: {
      en: "Mariam is the voice on WhatsApp at 11pm when your flight lands and the driver is somehow not at the curb. She also handles every special request we get.",
      ru: "Мариам — это голос в WhatsApp в 23:00, когда ваш рейс приземлился, а водителя у выхода почему-то нет. Она же обрабатывает все особые пожелания.",
      tr: "Mariam, uçağınız geceyarısı indiğinde ve şoför bir nedenle arabada olmadığında WhatsApp'taki sestir. Tüm özel istekleri de o yönetir."
    },
    yearsOnTeam: 5
  },
  {
    slug: "omar-fathy",
    name: "Omar Fathy",
    role: {
      en: "Red Sea desk · Hurghada",
      ru: "Красноморский офис · Хургада",
      tr: "Kızıldeniz masası · Hurghada"
    },
    city: "Hurghada",
    photo:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
    languages: ["EN", "AR", "RU"],
    bio: {
      en: "Dive instructor turned operations lead. Omar curates the Red Sea + culture combos and personally inspects every dive boat we put guests on.",
      ru: "Бывший инструктор по дайвингу, теперь руководитель операций. Омар собирает комбинации Красное море + культура и лично проверяет каждый дайв-бот, на который мы сажаем гостей.",
      tr: "Eski dalış eğitmeni, şimdi operasyon lideri. Omar Kızıldeniz + kültür kombinasyonlarını hazırlıyor ve misafirleri bindirdiğimiz her dalış teknesini bizzat denetliyor."
    },
    yearsOnTeam: 6
  }
];
