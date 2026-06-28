"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface FlashcardItemProps {
  card: {
    id: string;
    question: string;
    answer: string;
  };
  index: number;
}

export function FlashcardItem({ card, index }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="group cursor-pointer perspective"
    >
      <div
        className={cn(
          "relative h-40 sm:h-48 w-full transition-transform duration-500 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front - Question */}
        <div className="absolute inset-0 backface-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-card p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex h-full flex-col">
            <div className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-violet-100 text-[10px] sm:text-xs font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                {index + 1}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pertanyaan
              </span>
            </div>
            <p className="flex-1 text-xs sm:text-sm font-medium leading-relaxed overflow-hidden">
              {card.question}
            </p>
            <div className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
              <span>Klik untuk lihat</span>
              <ChevronRight className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform", isFlipped && "rotate-180")} />
            </div>
          </div>
        </div>

        {/* Back - Answer */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl sm:rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-3 sm:p-5 shadow-sm dark:border-violet-800 dark:from-violet-950/30 dark:to-purple-950/30">
          <div className="flex h-full flex-col">
            <div className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-violet-200 text-[10px] sm:text-xs font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                {index + 1}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Jawaban
              </span>
            </div>
            <p className="flex-1 text-xs sm:text-sm leading-relaxed text-violet-900 dark:text-violet-100 overflow-hidden">
              {card.answer}
            </p>
            <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-violet-600 dark:text-violet-400">
              Klik untuk lihat pertanyaan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
