import { useEffect, useState } from "react";

export function useCurrentSection(ids: string[], options?: IntersectionObserverInit) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let max: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          const ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
          if (!max || ratio > max.ratio) {
            max = { id, ratio };
          }
        }
        if (max && max.ratio > 0) {
          setCurrent(max.id);
        }
      },
      { threshold: [0.3, 0.5, 0.7], root: null, rootMargin: "0px", ...options }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, options]);

  return current;
}
