"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <Header />
      <main className="pt-16 transition-all duration-300 pl-[var(--sidebar-width)]">
        {children}
      </main>
    </div>
  );
}
