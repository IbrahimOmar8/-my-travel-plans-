"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: Props) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i! - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, images.length]);

  if (images.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-3xl">
        <button
          type="button"
          onClick={() => setActive(0)}
          className="relative col-span-4 aspect-[16/9] overflow-hidden sm:col-span-2 sm:row-span-2 sm:aspect-auto"
        >
          <img
            src={images[0]}
            alt={alt}
            className="h-full w-full object-cover transition hover:scale-105"
          />
        </button>
        {images.slice(1, 5).map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setActive(i + 1)}
            className="relative hidden aspect-[4/3] overflow-hidden sm:block"
          >
            <img
              src={src}
              alt={`${alt} — ${i + 2}`}
              className="h-full w-full object-cover transition hover:scale-105"
            />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
                +{images.length - 5}
              </span>
            )}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            ‹
          </button>
          <img
            src={images[active]}
            alt={`${alt} — ${active + 1}`}
            className="max-h-[88vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! + 1) % images.length);
            }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
