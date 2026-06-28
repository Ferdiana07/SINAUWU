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
          "relative h-48 w-full transition-transform duration-500 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front - Question */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-border/50 bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex h-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                {index + 1}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pertanyaan
              </span>
            </div>
            <p className="flex-1 text-sm font-medium leading-relaxed">
              {card.question}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Klik untuk melihat jawaban</span>
              <ChevronRight className={cn("h-3 w-3 transition-transform", isFlipped && "rotate-180")} />
            </div>
          </div>
        </div>

        {/* Back - Answer */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-5 shadow-sm dark:border-violet-800 dark:from-violet-950/30 dark:to-purple-950/30">
          <div className="flex h-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                {index + 1}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Jawaban
              </span>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-violet-900 dark:text-violet-100">
              {card.answer}
            </p>
            <div className="mt-3 text-xs text-violet-600 dark:text-violet-400">
              Klik untuk melihat pertanyaan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
