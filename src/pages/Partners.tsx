import Header from "@/components/layout/Header";
import { useEffect } from "react";

export default function Partners() {
  useEffect(() => { document.title = "Our Partners — LWEE FILM"; }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="py-12 border-b border-border">
          <div className="container">
            <h1 className="text-base font-semibold mb-6">Our Partners</h1>
            <p className="text-sm text-muted-foreground">파트너 로고/케이스 스터디 상세 페이지입니다.</p>
          </div>
        </section>
      </main>
    </div>
  );
}