import React, { useEffect, useRef, useState } from "react";

type Props = {
  /** public/ 기준 상대경로 또는 절대 URL */
  src: string;
  poster?: string;
  /** 같은 브라우저에서 한 번 봤으면 다시 안 보이게 (키 이름) */
  showOnceKey?: string; // 예: "introSeen_v1"
  /** 너무 빨리 사라지는 걸 방지 (ms) */
  minShowMs?: number;
  /** 페이드아웃 시간 (ms) */
  fadeMs?: number;
};

export default function IntroGate({
  src,
  poster,
  showOnceKey = "introSeen_v1",
  minShowMs = 1200,
  fadeMs = 600,
}: Props) {
  const [hidden, setHidden] = useState(() =>
    showOnceKey ? !!localStorage.getItem(showOnceKey) : false
  );
  const [fade, setFade] = useState(false);
  const start = useRef<number>(Date.now());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (hidden) return;

    // 스크롤 잠금
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const v = videoRef.current;

    const endIntro = () => {
      const elapsed = Date.now() - start.current;
      const rest = Math.max(0, minShowMs - elapsed);
      setTimeout(() => {
        setFade(true);
        setTimeout(() => {
          if (showOnceKey) localStorage.setItem(showOnceKey, "1");
          setHidden(true);
          document.documentElement.classList.remove("overflow-hidden");
          document.body.classList.remove("overflow-hidden");
        }, fadeMs);
      }, rest);
    };

    const onEnded = () => endIntro();
    const onError = () => endIntro();

    v?.addEventListener("ended", onEnded);
    v?.addEventListener("error", onError);

    // 네트워크/모바일 이슈 대비 타임아웃(10초)
    const t = setTimeout(endIntro, 10000);

    return () => {
      clearTimeout(t);
      v?.removeEventListener("ended", onEnded);
      v?.removeEventListener("error", onError);
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [hidden, fadeMs, minShowMs, showOnceKey]);

  if (hidden) return null;

  const withBase = (p?: string) =>
    !p
      ? undefined
      : /^https?:\/\//.test(p) || p.startsWith("data:")
      ? p
      : `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={withBase(src)}
        poster={withBase(poster)}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <button
        onClick={() => videoRef.current?.dispatchEvent(new Event("ended"))}
        className="absolute right-4 bottom-4 rounded-full border border-white/40 px-3 py-1 text-white/90 text-sm bg-black/40 backdrop-blur hover:bg-black/60"
      >
        Skip
      </button>
    </div>
  );
}
