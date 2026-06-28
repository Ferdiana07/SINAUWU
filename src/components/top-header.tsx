"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Skip dashboard prefix for cleaner display
    if (segment === "dashboard") {
      breadcrumbs.push({
        label: "Dashboard",
        href: "/dashboard",
      });
      continue;
    }

    // Format segment to readable label
    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Handle ID segments (CUIDs look like random strings)
    if (segment.length > 20) {
      label = "Detail";
    }

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

interface TopHeaderProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function TopHeader({ title, description, actions }: TopHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        {/* Breadcrumbs */}
        <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              {crumb.href && index < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {title || crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Title & Description */}
        {title && (
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        )}
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-3">{actions}</div>
      )}
    </header>
  );
}