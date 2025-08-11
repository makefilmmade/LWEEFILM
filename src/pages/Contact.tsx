import Header from "@/components/layout/Header";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => { document.title = "Contact — LWEE FILM"; }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="py-12 border-b border-border">
          <div className="container">
            <h1 className="text-base font-semibold mb-6">Contact</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <article className="border border-border rounded-md p-6">
                <h3 className="text-sm font-semibold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">강원도 원주시 모란1길 52</p>
              </article>
              <article className="border border-border rounded-md p-6">
                <h3 className="text-sm font-semibold mb-2">Open Hours</h3>
                <p className="text-sm text-muted-foreground">Weekdays 10:00–19:00 / Weekend Closed (Studio only)</p>
              </article>
              <article className="border border-border rounded-md p-6">
                <h3 className="text-sm font-semibold mb-2">Call / Mail</h3>
                <p className="text-sm text-muted-foreground">010-5801-8980 / ehrha44@gmail.com</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}