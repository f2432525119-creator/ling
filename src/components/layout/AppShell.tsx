"use client";

import { ReactNode } from "react";

import { MainWorkspace } from "@/components/layout/MainWorkspace";
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
      <MainWorkspace left={left} center={center} right={right} />
    </div>
  );
}
