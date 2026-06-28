"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  search: string;
  status: "all" | "UPLOADED" | "PROCESSED";
  hasSummary: boolean | null;
  hasFlashcards: boolean | null;
  hasQuiz: boolean | null;
}

interface DocumentFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function DocumentFilters({ onFilterChange }: DocumentFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    hasSummary: null,
    hasFlashcards: null,
    hasQuiz: null,
  });

  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      search: "",
      status: "all",
      hasSummary: null,
      hasFlashcards: null,
      hasQuiz: null,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.hasSummary !== null ||
    filters.hasFlashcards !== null ||
    filters.hasQuiz !== null;

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari dokumen..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {filters.search && (
            <button
              onClick={() => updateFilters({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
            showFilters || hasActiveFilters
              ? "border-primary bg-primary/10 text-primary"
              : "border-input hover:bg-muted"
          )}
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Filter Options</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Semua" },
                  { value: "PROCESSED", label: "Diproses" },
                  { value: "UPLOADED", label: "Menunggu" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilters({ status: option.value as FilterState["status"] })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      filters.status === option.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Summary</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: null, label: "Semua" },
                  { value: true, label: "Ada" },
                  { value: false, label: "Belum" },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    onClick={() => updateFilters({ hasSummary: option.value as boolean | null })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      filters.hasSummary === option.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flashcards Filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Flashcard</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: null, label: "Semua" },
                  { value: true, label: "Ada" },
                  { value: false, label: "Belum" },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    onClick={() => updateFilters({ hasFlashcards: option.value as boolean | null })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      filters.hasFlashcards === option.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Document card component
interface DocumentCardProps {
  doc: {
    id: string;
    title: string;
    fileName: string;
    status: string;
    createdAt: Date;
    summary: { id: string } | null;
    flashcards: { id: string }[];
    quizzes: { id: string }[];
  };
}

export function DocumentCard({ doc }: DocumentCardProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 transition-all hover:shadow-md hover:shadow-black/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{doc.title}</h3>
              <p className="text-sm text-muted-foreground">{doc.fileName}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-2.5 py-1">{doc.status}</span>
            <span className="flex items-center gap-1">
              {doc.summary ? "✓" : "○"} Summary
            </span>
            <span className="flex items-center gap-1">
              {doc.flashcards.length > 0 ? "✓" : "○"} {doc.flashcards.length} Flashcard
            </span>
            <span className="flex items-center gap-1">
              {doc.quizzes.length > 0 ? "✓" : "○"} {doc.quizzes.length} Quiz
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:mt-0">
        <a
          href={`/dashboard/documents/${doc.id}`}
          className="rounded-lg border border-border bg-background px-4 py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
        >
          Detail
        </a>
      </div>
    </div>
  );
}

// Filtered documents hook
export function useFilteredDocuments(
  documents: DocumentCardProps["doc"][],
  filters: FilterState
) {
  return useMemo(() => {
    return documents.filter((doc) => {
      // Search filter
      if (
        filters.search &&
        !doc.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !doc.fileName.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && doc.status !== filters.status) {
        return false;
      }

      // Summary filter
      if (filters.hasSummary === true && !doc.summary) return false;
      if (filters.hasSummary === false && doc.summary) return false;

      // Flashcards filter
      if (filters.hasFlashcards === true && doc.flashcards.length === 0) return false;
      if (filters.hasFlashcards === false && doc.flashcards.length > 0) return false;

      // Quiz filter
      if (filters.hasQuiz === true && doc.quizzes.length === 0) return false;
      if (filters.hasQuiz === false && doc.quizzes.length > 0) return false;

      return true;
    });
  }, [documents, filters]);
}