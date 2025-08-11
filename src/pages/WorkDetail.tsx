import Header from "@/components/layout/Header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();

  const work = useMemo(
    () => ({ id, title: `Work #${id}`, tags: ["Branded", "Film"], description: "작품 상세 페이지입니다. 곧 실제 데이터로 대체됩니다." }),
    [id]
  );

  useEffect(() => {
    document.title = `${work.title} — LWEE FILM`;
  }, [work.title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="py-12 border-b border-border">
          <div className="container">
            <h1 className="text-base font-semibold mb-6">{work.title}</h1>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 items-start">
              <AspectRatio ratio={16 / 9}>
                <img
                  src="/placeholder.svg"
                  alt={`${work.title} poster - LWEE FILM`}
                  className="w-full h-full object-cover border border-border rounded-md"
                  loading="lazy"
                />
              </AspectRatio>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{work.description}</p>
                <p className="text-xs text-muted-foreground">Tags: {work.tags.join(" · ")}</p>
                <div className="flex gap-3 pt-2">
                  <Button asChild>
                    <Link to="/contact" aria-label="프로젝트 문의 페이지로 이동">프로젝트 문의</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/works" aria-label="작품 목록으로 돌아가기">목록으로</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
