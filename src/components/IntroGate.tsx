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
  const [httpInfo, setHttpInfo] = useState<string>("(checking…)");

  const start = useRef<number>(Date.now());
  const videoRef = useRef<HTMLVideoElement>(null);

  // BASE_URL + 한글/공백 경로 안전 처리
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

  // 파일 존재/상태 사전 체크
  useEffect(() => {
    const url = withBase(src);
    setResolvedSrc(url);
    setHttpInfo("(checking…)");
    fetch(url, { headers: { Range: "bytes=0-0" } })
      .then((r) => {
        setHttpInfo(`HTTP ${r.status} ${r.statusText}`);
        if (!r.ok && r.status !== 206) {
          setErr("영상 로드 실패 (경로/대소문자/권한)");
        }
      })
      .catch(() => {
        setHttpInfo("(fetch error)");
        setErr("네트워크 오류 또는 경로 문제");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (hidden) return;

    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const v = videoRef.current!;
    v.muted = true;
    (v as any).playsInline = true;

    const tryPlay = () => {
      v.play().then(() => setNeedTap(false)).catch(() => setNeedTap(true));
    };

    const onCanPlay = () => { if (v.paused) tryPlay(); };
    const onEnded = () => endIntro();
    const onError = () => setErr("영상 재생 에러(코덱/손상/권한)");

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
        <source src={resolvedSrc} type="video/mp4" />
      </video>

      {/* 디버그/가이드 UI */}
      <div className="absolute inset-0 flex items-end justify-between p-4">
        <div className="text-xs text-white/80 max-w-[70%] space-y-1">
          <div>URL: <code>{resolvedSrc}</code></div>
          <div>Status: {httpInfo}</div>
          {err && <div className="text-red-300">❌ {err}</div>}
          <a className="underline" href={resolvedSrc} target="_blank" rel="noreferrer">
            원본 열기(직접 재생 테스트)
          </a>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              videoRef.current?.play().then(()=>setNeedTap(false)).catch(()=>setNeedTap(true))
            }
            className="rounded-full border border-white/40 px-4 py-2 text-white/90 text-sm bg-black/40 backdrop-blur hover:bg-black/60"
          >
            {needTap ? "Tap to start" : "Replay"}
          </button>
          <button
            onClick={endIntro}
            className="rounded-full border border-white/40 px-3 py-1 text-white/90 text-sm bg-black/40 backdrop-blur hover:bg-black/60"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
