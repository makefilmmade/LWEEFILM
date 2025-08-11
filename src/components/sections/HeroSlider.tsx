import { useEffect, useMemo, useRef, useState } from "react";
import v1 from "@/assets/hero-v1.mp4";
import v2 from "@/assets/hero-v2.mp4";
import v3 from "@/assets/hero-v3.mp4";
import { Button } from "@/components/ui/button";

export function HeroSlider() {
  const slides = useMemo(() => [
    { src: v1, alt: "LWEE FILM hero video 1" },
    { src: v2, alt: "LWEE FILM hero video 2" },
    { src: v3, alt: "LWEE FILM hero video 3" },
  ], []);

  const [index, setIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  useEffect(() => {
    // Pause all, play current
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        // Ensure plays inline without sound
        v.muted = true;
        const p = v.play();
        if (p) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, slides.length]);

  return (
    <section id="hero" aria-label="Hero slider" className="relative h-[100vh] overflow-hidden border-b border-border select-none">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative shrink-0 w-full h-full">
            <video
              ref={(el) => { if (el) videoRefs.current[i] = el; }}
              src={s.src}
              playsInline
              muted
              loop
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/20" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
        <Button onClick={() => go(-1)} variant="nav" size="icon" className="pointer-events-auto h-10 w-10 rounded-full bg-background/50 hover:bg-background/70">
          ‹
        </Button>
        <Button onClick={() => go(1)} variant="nav" size="icon" className="pointer-events-auto h-10 w-10 rounded-full bg-background/50 hover:bg-background/70">
          ›
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-foreground' : 'bg-foreground/30'}`}
            aria-label={`Slide ${i + 1}${i === index ? ' (current)' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
