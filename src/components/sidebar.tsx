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
} from "lucide-react";
import { SidebarStats } from "@/components/sidebar-stats";
import { ThemeToggle } from "@/components/theme-toggle";

// Logo SVG - Robot with Book
function LogoIcon() {
  return (
    <svg
      viewBox="0 0 100 80"
      className="h-8 w-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book Base */}
      <path
        d="M10 55 Q15 50 25 52 Q35 54 40 52 L40 75 Q35 78 25 76 Q15 74 10 75 Z"
        fill="url(#bookLeftGradient)"
      />
      <path
        d="M60 52 Q65 50 75 52 Q85 54 90 55 L90 75 Q85 74 75 76 Q65 78 60 75 Z"
        fill="url(#bookRightGradient)"
      />

      {/* Robot Head */}
      <rect x="25" y="20" width="50" height="35" rx="6" fill="white" />
      <rect x="25" y="20" width="50" height="35" rx="6" fill="url(#headGradient)" fillOpacity="0.3" />

      {/* Antenna */}
      <rect x="48" y="8" width="4" height="14" rx="2" fill="#3B82F6" />
      <circle cx="50" cy="6" r="4" fill="#3B82F6" />

      {/* Eyes */}
      <circle cx="38" cy="33" r="6" fill="#93C5FD" />
      <circle cx="62" cy="33" r="6" fill="#93C5FD" />
      <circle cx="40" cy="31" r="2" fill="white" />
      <circle cx="64" cy="31" r="2" fill="white" />

      {/* Smile */}
      <path
        d="M40 43 Q50 52 60 43"
        stroke="#93C5FD"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blue accents on head sides */}
      <rect x="21" y="25" width="6" height="20" rx="2" fill="#93C5FD" fillOpacity="0.5" />
      <rect x="73" y="25" width="6" height="20" rx="2" fill="#93C5FD" fillOpacity="0.5" />

      {/* Stars */}
      <path
        d="M15 18 L17 23 L22 23 L18 27 L20 32 L15 28 L10 32 L12 27 L8 23 L13 23 Z"
        fill="#A855F7"
      />
      <path
        d="M78 15 L79.5 19 L84 19 L80.5 22 L82 26 L78 23 L74 26 L75.5 22 L72 19 L76.5 19 Z"
        fill="#3B82F6"
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="bookLeftGradient" x1="10" y1="52" x2="40" y2="52">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id="bookRightGradient" x1="60" y1="52" x2="90" y2="52">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="headGradient" x1="25" y1="20" x2="75" y2="55">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
    name: "Pengaturan",
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
        <LogoIcon />
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
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border-l-2 border-violet-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isActive ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground group-hover:scale-110"
                  )}
                />
                <span>{item.name}</span>
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
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border-l-2 border-violet-500"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-violet-600 dark:text-violet-400" : ""
              )} />
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