import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentSection } from "@/hooks/use-current-section";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Latest Work", href: "#latest" },
  { label: "Our Partners", href: "#partners" },
  { label: "Works", href: "#works" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = useCurrentSection(["hero", "about", "latest", "partners", "works", "contact"]);

  const onNav = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between">
        <a href="#hero" className="font-semibold tracking-tight">LWEE FILM</a>
        <Button variant="nav" onClick={() => setOpen(true)} aria-label="Open menu">
          MENU
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/90">
          <div className="container h-full flex flex-col">
            <div className="h-16 flex items-center justify-between border-b border-border">
              <span className="font-semibold tracking-tight">LWEE FILM</span>
              <Button variant="nav" onClick={() => setOpen(false)} aria-label="Close menu">
                CLOSE
              </Button>
            </div>

            <nav className="flex-1 flex items-center">
              <ul className="space-y-6 md:space-y-8">
                {navItems.map((item) => {
                  const isActive = item.href === `#${current}`;
                  return (
                    <li key={item.href}>
                      <button
                        className={`text-3xl md:text-5xl font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/90 hover:text-foreground"}`}
                        onClick={() => onNav(item.href)}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
