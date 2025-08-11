import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Latest from "./pages/Latest";
import Partners from "./pages/Partners";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import WorkDetail from "./pages/WorkDetail";
import Footer from "@/components/layout/Footer";

const queryClient = new QueryClient();

// 🛠 퍼블릭 자산(src/href 등) 경로를 GitHub Pages 베이스(/LWEEFILM/)에 맞춰 보정
function BaseUrlFixer() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL || "/";
    const fix = (url: string | null) => {
      if (!url) return url;
      // 이미 절대 URL이거나 data URI면 건너뜀
      if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) return url;
      // 이미 base로 시작하면 OK
      if (url.startsWith(base)) return url;
      // 루트(/)로 시작하거나 상대경로인 경우 base 붙임
      const normalized = url.startsWith("/") ? url.slice(1) : url;
      return base + normalized;
    };

    // img, video, source, audio, link(rel="preload"/"prefetch") 등 보정
    document.querySelectorAll<HTMLImageElement>("img[src]").forEach((el) => {
      const next = fix(el.getAttribute("src"));
      if (next && next !== el.src) el.setAttribute("src", next);
    });
    document.querySelectorAll<HTMLSourceElement>("source[src]").forEach((el) => {
      const next = fix(el.getAttribute("src"));
      if (next && next !== el.src) el.setAttribute("src", next);
    });
    document.querySelectorAll<HTMLVideoElement>("video[poster]").forEach((el) => {
      const next = fix(el.getAttribute("poster"));
      if (next && next !== el.poster) el.setAttribute("poster", next);
    });
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="preload"][href], link[rel="prefetch"][href]')
      .forEach((el) => {
        const next = fix(el.getAttribute("href"));
        if (next && next !== el.href) el.setAttribute("href", next);
      });
    // a[href]는 다운로드 파일 등에만 선택적으로 보정하고 싶으면 아래 주석 해제
    // document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((el) => {
    //   const next = fix(el.getAttribute("href"));
    //   if (next && next !== el.href) el.setAttribute("href", next);
    // });
  }, []);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        {/* 🔧 자산 경로 자동 보정기 */}
        <BaseUrlFixer />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
