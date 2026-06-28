"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SidebarStats } from "@/components/sidebar-stats";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Dokumen",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    name: "Upload PDF",
    href: "/dashboard/upload",
    icon: Upload,
  },
];

const secondaryNav = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="flex h-16 items-center gap-3 border-b border-border/50 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight">SINAUWU</span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            AI Learning
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="mb-6">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Menu Utama
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:scale-110"
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <ChevronRight className="ml-auto h-3 w-3 text-primary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Stats - Real-time */}
        <SidebarStats />
      </nav>

      {/* Secondary Navigation */}
      <div className="border-t border-border/50 px-3 py-4">
        {secondaryNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-border/50 px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Powered by AI
          </p>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}