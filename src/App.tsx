// src/App.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { HashRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Latest from "./pages/Latest";
import Partners from "./pages/Partners";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Footer from "@/components/layout/Footer";
import IntroGate from "@/components/IntroGate";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          {/* 인트로: public//.mp4 업로드 필요 */}
         <IntroGate
  src="intro/Intro.mp4"   // public/intro/Intro.mp4
  poster="intro/poster.jpg"
  showOnceKey={undefined}
  minShowMs={1200}
  fadeMs={600}
/>
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
}
