"use client";

import { useEffect, useState } from "react";

interface SidebarStats {
  totalDocuments: number;
  totalQuizzes: number;
}

export function SidebarStats() {
  const [stats, setStats] = useState<SidebarStats>({
    totalDocuments: 0,
    totalQuizzes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch from API or use direct prisma call
        // For now, we'll use a simple approach
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <>
      <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900/50 dark:to-slate-900">
        <p className="mb-3 text-xs font-semibold text-muted-foreground">Statistik</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {loading ? "..." : stats.totalDocuments}
            </div>
            <div className="text-[10px] text-muted-foreground">Dokumen</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {loading ? "..." : stats.totalQuizzes}
            </div>
            <div className="text-[10px] text-muted-foreground">Quiz</div>
          </div>
        </div>
      </div>
    </>
  );
}
