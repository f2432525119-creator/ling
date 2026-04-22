"use client";

import { ReactNode } from "react";

type MainWorkspaceProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export function MainWorkspace({ left, center, right }: MainWorkspaceProps) {
  return (
    <main className="grid h-[calc(100vh-73px)] grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-12">
      <section className="min-h-[220px] overflow-hidden rounded-2xl border border-black/10 bg-white xl:col-span-3">
        {left}
      </section>
      <section className="min-h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-white md:col-span-2 xl:col-span-6">
        {center}
      </section>
      <section className="min-h-[220px] overflow-hidden rounded-2xl border border-black/10 bg-white xl:col-span-3">
        {right}
      </section>
    </main>
  );
}
