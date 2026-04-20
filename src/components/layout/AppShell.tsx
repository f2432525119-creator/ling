"use client";

import { ReactNode } from "react";

import { TopBar } from "@/components/layout/TopBar";

type AppShellProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export function AppShell({ left, center, right }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black">
      <TopBar />
      <main className="grid h-[calc(100vh-73px)] grid-cols-12 gap-4 p-4">
        <section className="col-span-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
          {left}
        </section>
        <section className="col-span-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
          {center}
        </section>
        <section className="col-span-3 overflow-hidden rounded-2xl border border-black/10 bg-white">
          {right}
        </section>
      </main>
    </div>
  );
}
