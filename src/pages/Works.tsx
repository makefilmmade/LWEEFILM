import Header from "@/components/layout/Header";
import { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

const works = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1, title: `Work #${i + 1}` }));

export default function Works() {
  useEffect(() => { document.title = "Works — LWEE FILM"; }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="py-12 border-b border-border">
          <div className="container">
            <h1 className="text-base font-semibold mb-6">Works</h1>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {works.map((w) => (
                <Link key={w.id} to={`/works/${w.id}`} className="block group" aria-label={`${w.title} 상세 보기`}>
                  <article className="border border-border rounded-md overflow-hidden">
                    <AspectRatio ratio={9 / 16}>
                      <img
                        src="/placeholder.svg"
                        alt={`${w.title} poster - LWEE FILM`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </article>
                  <p className="mt-2 text-xs text-muted-foreground">{w.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
