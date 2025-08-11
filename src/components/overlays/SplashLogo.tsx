import { useEffect, useState } from "react";

type Props = { onDone: () => void };

export default function SplashLogo({ onDone }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 4200);
    const t2 = setTimeout(() => onDone(), 4800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[60] grid place-items-center bg-background ${exiting ? "animate-fade-out" : "animate-fade-in"}`}
      aria-hidden="true"
    >
      <div className="select-none">
        <span className="text-3xl md:text-5xl font-semibold tracking-tight pulse">LWEE FILM</span>
      </div>
    </div>
  );
}
