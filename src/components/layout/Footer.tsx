import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-6" role="contentinfo">
      <div className="container text-xs text-muted-foreground">
        <p>&copy; {year} LWEE FILM. All rights reserved.</p>
      </div>
    </footer>
  );
}
