"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconUsers,
  IconFileAnalytics,
  IconCalculator,
  IconSparkles,
  IconGift,
  IconSettings,
  IconChevronLeft,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { useUIStore } from "@/store/ui.store";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { name: "Book Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { name: "Household Dashboard", href: "/household", icon: IconUsers },
  { name: "Reap Reports", href: "/reports", icon: IconFileAnalytics },
  { name: "IRR Calculator", href: "/irr", icon: IconCalculator },
  {
    name: "Scenarios",
    href: "/scenarios",
    icon: IconSparkles,
    comingSoon: true,
  },
  { name: "Reap AI", href: "/ai", icon: IconSparkles, comingSoon: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {sidebarOpen && (
          <span className="text-xl font-bold text-primary">REAPPRO</span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 hover:bg-accent"
        >
          <IconChevronLeft
            className={cn("transition-transform", !sidebarOpen && "rotate-180")}
          />
        </button>
      </div>

      <div className="flex h-[calc(100%-4rem)] flex-col justify-between p-4">
        <nav className="space-y-2">
          {!sidebarOpen ? null : (
            <p className="mb-4 text-xs font-semibold text-muted-foreground">
              QUICK ACTIONS
            </p>
          )}
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.comingSoon ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent",
                  item.comingSoon && "cursor-not-allowed opacity-50",
                )}
                onClick={(e) => item.comingSoon && e.preventDefault()}
              >
                <item.icon size={22} />
                {sidebarOpen && (
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.comingSoon && (
                      <Badge variant="secondary" className="text-[10px]">
                        Soon
                      </Badge>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t pt-4">
          <Link
            href="/referrals"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
          >
            <IconGift size={22} />
            {sidebarOpen && (
              <span className="text-sm font-medium">Referral Rewards</span>
            )}
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
          >
            <IconSettings size={22} />
            {sidebarOpen && (
              <span className="text-sm font-medium">Settings</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
