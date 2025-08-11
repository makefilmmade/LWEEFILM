eader from "@/components/layout/Header";
import HeroSlider from "@/components/sections/HeroSlider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { Link } from "react-router-dom";
import { useState, type ReactNode } from "react";
import SplashLogo from "@/components/overlays/SplashLogo";

const placeholder = "/placeholder.svg";

type Work = { id: number; title: string; tags: string[]; src: string };
const latestWorks: Work[] = [
  { id: 1, title: "Branded Film — AURA", tags: ["Branded", "Film"], src: placeholder },
  { id: 2, title: "Documentary — TRACE", tags: ["Documentary"], src: placeholder },
  { id: 3, title: "Commercial — MOVE", tags: ["Commercial"], src: placeholder },
  { id: 4, title: "Music Video — VAST", tags: ["Music Video"], src: placeholder },
  { id: 5, title: "Campaign — GLOW", tags: ["Campaign"], src: placeholder },
  { id: 6, title: "Short — SILENT", tags: ["Short"], src: placeholder },
];

const moreWorks: Work[] = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1, title: `Work #${i + 1}`, tags: ["Branded", "Film"], src: placeholder }));



function SectionTitle({ children, action, linkTo }: { children: ReactNode; action?: ReactNode; linkTo?: string }) {
  const Title = (
    <h2 className="text-base font-semibold text-primary">{children}</h2>
  );
  return (
    <div className="flex items-center justify-between mb-6">
      {linkTo ? <a href={linkTo} className="hover:opacity-80 transition-opacity" aria-label={`${children} 상세보기`}>{Title}</a> : Title}
      {action}
    </div>
  );
}

function WorkCard({ item }: { item: Work }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <Link to={`/works/${item.id}`} aria-label={`Open work detail ${item.title}`} ref={ref as any}>
      <article
        className={`border border-border rounded-md overflow-hidden transition-transform duration-200 will-change-transform hover:-translate-y-1 ${inView ? "animate-fade-in" : "opacity-0 translate-y-2"}`}
      >
        <AspectRatio ratio={9 / 16}>
          <img src={item.src} alt={`LWEE FILM latest work ${item.title}`} loading="lazy" className="w-full h-full object-cover" />
        </AspectRatio>
        <div className="p-4 space-y-1">
          <h3 className="text-sm font-semibold">{item.title}</h3>
          <p className="text-xs text-muted-foreground">{item.tags.join(" · ")}</p>
        </div>
      </article>
    </Link>
  );
}


export default function Index() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("splashShown"));
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      {showSplash && <SplashLogo onDone={() => { sessionStorage.setItem("splashShown", "1"); setShowSplash(false); }} />}
      <main className="pt-0">
        <h1 className="sr-only">LWEE FILM — Brand · Film · Post</h1>

        <section id="hero">
          <HeroSlider />
        </section>

        {/* About */}
        <section id="about" className="py-16 md:py-24 border-b border-border">
          <div className="container">
            <SectionTitle linkTo="/about">About</SectionTitle>
            <div className="max-w-3xl space-y-4 text-base leading-7">
              <p>영상의 리듬감은 뤼필름이 가장 중요하게 생각하는 핵심 요소입니다.</p>
              <p>장면마다 흐르는 감정의 파동과, 타이밍 하나하나의 호흡은 관객의 몰입을 이끌어내는 리듬으로 완성됩니다.</p>
              <p>우리는 그 리듬 속에 감정을 설계하고, 그 감정에 정확한 리듬을 입혀 이야기를 빚어내는 영상 예술 스튜디오입니다.</p>
              <p>감정을 전달하는 리듬의 언어로 다듬어내. 우리는 그 리듬을 통해 기억에 남을 영상 경험을 만들어갑니다.</p>
            </div>
          </div>
        </section>

        {/* Latest Work */}
        <section id="latest" className="py-16 md:py-24 border-b border-border">
          <div className="container">
            <SectionTitle linkTo="/latest">Latest Work</SectionTitle>
            <Carousel opts={{ align: "start" }}>
              <CarouselContent>
                {latestWorks.map((w) => (
                  <CarouselItem key={w.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
                    <WorkCard item={w} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>


        {/* Works */}
        <section id="works" className="py-16 md:py-24 border-b border-border">
          <div className="container">
            <SectionTitle linkTo="/works">Works</SectionTitle>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {moreWorks.slice(0, 12).map((w) => (
                <WorkCard item={w} key={`more-${w.id}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container">
            <SectionTitle linkTo="/contact">Contact Us</SectionTitle>
            <article className="border border-border rounded-xl p-6 md:p-8 bg-background/60 backdrop-blur">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground">강원도 원주시 모란1길 52</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Open Hours</h3>
                  <p className="text-sm text-muted-foreground">Weekdays 10:00–19:00 / Weekend Closed (Studio only)</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Call / Mail</h3>
                  <p className="text-sm text-muted-foreground">010-5801-8980 / ehrha44@gmail.com</p>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/contact" aria-label="프로젝트 문의 이동">
                  <Button variant="outline">프로젝트 문의</Button>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
