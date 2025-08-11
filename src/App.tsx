import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;          // public/ 기준 또는 절대 URL
  poster?: string;
  showOnceKey?: string; // undefined면 매번 재생
  minShowMs?: number;
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
  const [fading, setFading] = useState(false);
  const [needTap, setNeedTap] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [resolvedSrc, setResolvedSrc] = useState<string>("");

  const start = useRef<number>(Date.now());
  const videoRef = useRef<HTMLVideoElement>(null);

  // BASE_URL + URL 인코딩
  const withBase = (p?: string) =>
    !p
      ? ""
      : encodeURI(
          /^(https?:)?\/\//.test(p) || p.startsWith("data:")
            ? p
            : `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`
        );

  const endIntro = () => {
    const elapsed = Date.now() - start.current;
    const rest = Math.max(0, minShowMs - elapsed);
    setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        if (showOnceKey) localStorage.setItem(showOnceKey, "1");
        setHidden(true);
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
      }, fadeMs);
    }, rest);
  };

  useEffect(() => {
    if (hidden) return;
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const v = videoRef.current!;
    const tryPlay = () => {
      v.play().then(() => setNeedTap(false)).catch(() => setNeedTap(true));
    };

    const onCanPlay = () => { if (v.paused) tryPlay(); };
    const onEnded = () => endIntro();
    const onError = () => setErr("영상 로드 실패 (경로/대소문자/코덱 확인)");

    // 초기 세팅
    v.muted = true;
    (v as any).playsInline = true;

    tryPlay();

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onError);

    const t = setTimeout(() => { if (!err) setNeedTap(true); }, 12000);

    return () => {
      clearTimeout(t);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onError);
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, minShowMs, fadeMs]);

  useEffect(() => {
    setResolvedSrc(withBase(src));
  }, [src]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={withBase(poster)}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        {/* iOS/사파리 호환을 위해 source+type 명시 */}
        <source src={resolvedSrc} type="video/mp4" />
      </video>

      {/* 안내/버튼/디버그 */}
      <div className="absolute inset-0 flex items-end justify-between p-4">
        <div className="text-xs text-white/70 max-w-[70%]">
          {err ? (
            <>
              <div className="mb-1 text-red-300">❌ {err}</div>
              <div>요청 URL: <code>{resolvedSrc}</code></div>
              <a
                className="underline"
                href={resolvedSrc}
                target="_blank"
                rel="noreferrer"
              >
                원본 열기(직접 재생 테스트)
              </a>
            </>
          ) : needTap ? (
            <div>자동재생이 차단되어 있습니다. 우측 버튼을 눌러 시작하세요.</div>
          ) : null}
        </div>

        <div className="flex gap-2">
          {needTap && !err && (
            <button
              onClick={() =>
                videoRef.current?.play().then(()=>setNeedTap(false)).catch(()=>setNeedTap(true))
              }
              className="rounded-full border border-white/40 px-4 py-2 text-white/90 text
