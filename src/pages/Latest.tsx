import Header from "@/components/layout/Header";
import { useEffect } from "react";

export default function Latest() {
  useEffect(() => { document.title = "Latest Work — LWEE FILM"; }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="py-12 border-b border-border">
          <div className="container">
            <h1 className="text-base font-semibold mb-6">Latest Work</h1>
            <p className="text-sm text-muted-foreground">최신 작업 상세 페이지입니다. 추후 실제 콘텐츠로 대체합니다.</p>
          </div>
        </section>
      </main>
    </div>
  );
}