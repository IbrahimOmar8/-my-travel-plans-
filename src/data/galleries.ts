import { tours } from "./tours";
import type { Tour } from "@/lib/types";

const galleries: Record<string, string[]> = {
  "classic-egypt-8-days": [
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1568322445389-f64ac2515099?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=1600&q=80"
  ],
  "nile-cruise-5-days": [
    "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1542470616-39fed62de8fb?auto=format&fit=crop&w=1600&q=80"
  ],
  "red-sea-7-days": [
    "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1559554498-c8c45fc88c64?auto=format&fit=crop&w=1600&q=80"
  ],
  "egypt-family-10-days": [
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1568322445389-f64ac2515099?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1600&q=80"
  ],
  "egypt-jordan-12-days": [
    "https://images.unsplash.com/photo-1563177978-4c5f5e1f6c7b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1579606037885-2c89e3a99e9b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1568322445389-f64ac2515099?auto=format&fit=crop&w=1600&q=80"
  ],
  "white-desert-4-days": [
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1538150420051-bd1de8d4d40c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
  ]
};

export function getGallery(tour: Tour): string[] {
  const list = galleries[tour.slug];
  if (list && list.length > 0) return list;
  return [tour.image];
}

export function getAllGalleries() {
  return tours.map((t) => ({ slug: t.slug, images: getGallery(t) }));
}
