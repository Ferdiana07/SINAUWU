"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  Sparkles,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { SidebarStats } from "@/components/sidebar-stats";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Handle responsive class for main content
  const sidebarClasses = cn(
    "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl",
    "transition-transform duration-300 ease-in-out",
    "lg:translate-x-0",
    isMobileOpen ? "translate-x-0" : "-translate-x-full"
  );

  const overlayClasses = cn(
    "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden",
    "transition-opacity duration-300",
    isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  );

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg bg-card p-2 shadow-lg ring-1 ring-border/50 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      <div
        className={overlayClasses}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute right-4 top-4 rounded-lg p-1.5 hover:bg-muted lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

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
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border-l-2 border-violet-500"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 flex-shrink-0",
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
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 border-l-2 border-violet-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive ? "text-violet-600 dark:text-violet-400" : ""
                )} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-border/50 px-4 py-4">
          {/* User Info */}
          {session?.user && (
            <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/50 p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Powered by AI
            </p>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Logout"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}