import type { Locale } from "@/i18n/config";
import type { FAQItem } from "@/components/FAQ";

type LocalizedFAQ = Record<Locale, FAQItem[]>;

export const tourFAQ: LocalizedFAQ = {
  en: [
    {
      q: "How far in advance should I book?",
      a: "For peak season (Oct–March), we recommend at least 4 months. Off-peak is usually fine 4–6 weeks out, though Nile cruise cabins fill faster than land-only trips."
    },
    {
      q: "Is the 20% deposit refundable?",
      a: "Yes, fully refundable up to 30 days before departure. Inside 30 days the deposit is non-refundable, but you can reschedule once at no charge."
    },
    {
      q: "Are flights included?",
      a: "Internal flights between Cairo, Luxor and Aswan are included on every multi-city tour. International flights are not — we can quote them separately if you'd like."
    },
    {
      q: "Do I need a visa for Egypt?",
      a: "Most passports are eligible for the e-Visa at visa2egypt.gov.eg (USD 25, 24–72h). Visa-on-arrival is also available. See our journal entry on Egypt entry for details."
    },
    {
      q: "Can you accommodate dietary restrictions?",
      a: "Yes — vegetarian, vegan, halal, kosher, gluten-free and most allergies can be handled across hotels and the Nile cruise. Tell us at booking and we confirm with each property."
    }
  ],
  ru: [
    {
      q: "За сколько до поездки лучше бронировать?",
      a: "В высокий сезон (октябрь–март) — минимум за 4 месяца. В межсезонье обычно достаточно 4–6 недель, но каюты на нильском круизе уходят быстрее, чем сухопутные туры."
    },
    {
      q: "Возвращается ли депозит 20%?",
      a: "Да, полностью возвращается за 30 дней до вылета и более. В пределах 30 дней депозит не возвращается, но один раз можно бесплатно перенести даты."
    },
    {
      q: "Включены ли перелёты?",
      a: "Внутренние перелёты между Каиром, Луксором и Асуаном включены во все мультигородские туры. Международные не включены — можем посчитать отдельно."
    },
    {
      q: "Нужна ли виза в Египет?",
      a: "Большинству паспортов доступна e-Visa на visa2egypt.gov.eg (25 USD, 24–72 часа). Виза по прилёту тоже работает. Подробности — в нашем журнале."
    },
    {
      q: "Учитываете ли вы особенности питания?",
      a: "Да — вегетарианская, веганская, халяльная, кошерная, без глютена и большинство аллергий. Сообщите при бронировании, подтверждаем с каждым отелем."
    }
  ],
  tr: [
    {
      q: "Ne kadar önceden rezervasyon yapmalıyım?",
      a: "Yoğun sezonda (Ekim–Mart) en az 4 ay önceden öneririz. Düşük sezonda 4–6 hafta yeterli oluyor, ama Nil kruvaziyer kabinleri kara turlarından daha hızlı doluyor."
    },
    {
      q: "%20 depozito iade edilir mi?",
      a: "Evet, kalkıştan 30 gün öncesine kadar tamamen iade. 30 gün içinde iade edilmez ama bir kez ücretsiz tarih değişikliği yapabilirsiniz."
    },
    {
      q: "Uçuşlar dahil mi?",
      a: "Kahire, Luksor ve Aswan arası iç hat uçuşları her çok şehirli turda dahildir. Uluslararası uçuşlar dahil değildir — ayrı teklif verebiliriz."
    },
    {
      q: "Mısır için vize gerekli mi?",
      a: "Çoğu pasaport visa2egypt.gov.eg üzerinden e-Vize alabilir (25 USD, 24–72 saat). Varışta vize de mevcut. Detaylar günlüğümüzde."
    },
    {
      q: "Özel diyet talepleri karşılanır mı?",
      a: "Evet — vejetaryen, vegan, helal, koşer, glutensiz ve çoğu alerji oteller ve kruvaziyer boyunca yönetilebilir. Rezervasyonda bildirin, her tesisle teyit ediyoruz."
    }
  ]
};
