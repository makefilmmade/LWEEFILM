import Header from "@/components/layout/Header";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About — LWEE FILM";
  }, []);
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="pt-24">
        <section className="py-12 border-b border-border">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">About</h1>
            <div className="max-w-3xl space-y-4 text-base leading-7">
              <p className="font-semibold">영상의 리듬감은 뤼필름이 가장 중요하게 생각하는 핵심 요소입니다.</p>
              <p>장면마다 흐르는 감정의 파동과, 타이밍 하나하나의 호흡은 관객의 몰입을 이끌어내는 리듬으로 완성됩니다.</p>
              <p>우리는 그 리듬 속에 감정을 설계하고, 그 감정에 정확한 리듬을 입혀 이야기를 빚어내는 영상 예술 스튜디오입니다.</p>
              <p>감정을 전달하는 리듬의 언어로 다듬어내. 우리는 그 리듬을 통해 기억에 남을 영상 경험을 만들어갑니다.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
