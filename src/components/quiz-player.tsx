"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/toast";
import { CheckCircle2, XCircle, RefreshCw, Clock, Trophy, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Props {
  quizId: string;
  questions: Question[];
}

type QuestionResult = {
  questionId: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string | null;
};

type AttemptResult = {
  score: number;
  total: number;
  results: QuestionResult[];
};

const QUIZ_TIME_MINUTES = 10; // 10 minutes per quiz

export default function QuizPlayer({ quizId, questions }: Props) {
  const router = useRouter();
  const { addToast } = useToast();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attemptResult, setAttemptResult] = useState<AttemptResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_MINUTES * 60); // seconds
  const [timerActive, setTimerActive] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const allAnswered = answeredCount === totalQuestions;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);
  const scorePercentage = attemptResult
    ? Math.round((attemptResult.score / attemptResult.total) * 100)
    : 0;

  // Timer effect
  useEffect(() => {
    if (!timerActive || attemptResult) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, attemptResult]);

  // Start timer when user answers first question
  useEffect(() => {
    if (answeredCount === 1 && !timerActive) {
      setTimerActive(true);
    }
  }, [answeredCount, timerActive]);

  const handleTimeUp = useCallback(async () => {
    addToast({
      type: "warning",
      title: "Waktu Habis!",
      description: "Quiz akan disubmit otomatis.",
    });
    await handleSubmit(true);
  }, [answers]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function handleAnswer(questionId: string, answer: string) {
    if (attemptResult) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  async function handleSubmit(isTimeUp = false) {
    if (!allAnswered && !isTimeUp) {
      addToast({
        type: "error",
        title: "Belum Selesai",
        description: "Harap jawab semua soal terlebih dahulu.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setTimerActive(false);

      const response = await fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to submit quiz");
      }

      setAttemptResult({
        score: data.score,
        total: data.total,
        results: data.results,
      });

      if (isTimeUp) {
        addToast({
          type: "info",
          title: "Waktu Habis",
          description: `Score: ${data.score}/${data.total}`,
        });
      } else {
        addToast({
          type: "success",
          title: "Quiz Selesai!",
          description: `Skor kamu: ${data.score}/${data.total}`,
        });
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        title: "Gagal Submit",
        description: "Tidak dapat menyimpan jawaban. Silakan coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setAnswers({});
    setAttemptResult(null);
    setTimeLeft(QUIZ_TIME_MINUTES * 60);
    setTimerActive(false);
  }

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return { text: "Luar Biasa!", emoji: "🎉", color: "text-emerald-600" };
    if (scorePercentage >= 70) return { text: "Bagus!", emoji: "👏", color: "text-blue-600" };
    if (scorePercentage >= 50) return { text: "Cukup Baik", emoji: "💪", color: "text-amber-600" };
    return { text: "Tetap Semangat!", emoji: "📚", color: "text-violet-600" };
  };

  const scoreInfo = getScoreMessage();

  return (
    <div className="space-y-6">
      {/* PROGRESS & TIMER SECTION */}
      <Card className="border-border/50 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Progress */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">
                    {answeredCount}/{totalQuestions} soal dijawab
                  </span>
                </div>
                {allAnswered && !attemptResult && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    ✓ Siap Submit
                  </span>
                )}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-4">
              {!attemptResult && (
                <div className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-bold",
                  timeLeft <= 60 ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-100 text-blue-600"
                )}>
                  <Clock className="h-5 w-5" />
                  {formatTime(timeLeft)}
                </div>
              )}
              {attemptResult && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2">
                  <Trophy className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold text-emerald-600">
                    {attemptResult.score}/{attemptResult.total}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QUESTIONS SECTION */}
      <div className="space-y-4">
        {questions.map((question, index) => {
          const result = attemptResult?.results.find((item) => item.questionId === question.id);
          const userAnswer = answers[question.id];

          return (
            <Card
              key={question.id}
              className={cn(
                "overflow-hidden border-border/50 transition-all duration-300",
                result?.isCorrect === true && "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20",
                result?.isCorrect === false && "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20"
              )}
            >
              <div className={cn(
                "border-b border-border/50 px-4 py-3",
                result?.isCorrect === true && "bg-emerald-100/50 dark:bg-emerald-900/30",
                result?.isCorrect === false && "bg-red-100/50 dark:bg-red-900/30"
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl font-bold text-sm",
                    result?.isCorrect === true && "bg-emerald-500 text-white",
                    result?.isCorrect === false && "bg-red-500 text-white",
                    !result && "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  )}>
                    {index + 1}
                  </div>
                  <h2 className="flex-1 text-sm font-semibold leading-relaxed">
                    {question.question}
                  </h2>
                  {result && (
                    result.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )
                  )}
                </div>
              </div>

              {/* Options */}
              <CardContent className="p-4">
                <div className="space-y-2">
                  {[
                    { letter: "A", text: question.optionA },
                    { letter: "B", text: question.optionB },
                    { letter: "C", text: question.optionC },
                    { letter: "D", text: question.optionD },
                  ].map(({ letter, text }) => {
                    const isSelected = userAnswer === letter;
                    const isCorrectAnswer = result?.correctAnswer === letter;
                    const isUserWrongChoice = result && isSelected && !isCorrectAnswer;

                    let bgColor = "bg-white dark:bg-slate-900";
                    let borderColor = "border-border";
                    let textColor = "text-foreground";
                    let hoverEffect = !attemptResult ? "hover:border-blue-300 cursor-pointer" : "";

                    if (result) {
                      if (isCorrectAnswer) {
                        bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
                        borderColor = "border-emerald-300 dark:border-emerald-700";
                        textColor = "text-emerald-900 dark:text-emerald-100";
                      } else if (isUserWrongChoice) {
                        bgColor = "bg-red-50 dark:bg-red-950/30";
                        borderColor = "border-red-300 dark:border-red-700";
                        textColor = "text-red-900 dark:text-red-100";
                      } else {
                        bgColor = "bg-muted/30";
                        textColor = "text-muted-foreground";
                      }
                    } else if (isSelected) {
                      bgColor = "bg-blue-50 dark:bg-blue-950/30";
                      borderColor = "border-blue-400 dark:border-blue-600";
                      textColor = "text-blue-900 dark:text-blue-100";
                    }

                    return (
                      <label
                        key={letter}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border-2 p-4 transition-all",
                          bgColor, borderColor, textColor, hoverEffect
                        )}
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted font-bold text-sm">
                          {letter}
                        </div>
                        <div className="flex-1 text-sm">{text}</div>
                        {!attemptResult && (
                          <input
                            type="radio"
                            name={question.id}
                            value={letter}
                            checked={isSelected}
                            onChange={() => handleAnswer(question.id, letter)}
                            className="h-4 w-4 accent-blue-600"
                          />
                        )}
                        {result && isCorrectAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        )}
                        {result && isUserWrongChoice && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Explanation */}
                {result?.explanation && (
                  <div className="mt-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Penjelasan</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{result.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {!attemptResult ? (
          <Button
            onClick={() => handleSubmit(false)}
            disabled={submitting || !allAnswered}
            className="flex-1 h-12 text-base"
          >
            {submitting ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Mengirim...
              </>
            ) : allAnswered ? (
              "Submit Quiz"
            ) : (
              `Jawab ${totalQuestions - answeredCount} Soal Lagi`
            )}
          </Button>
        ) : (
          <>
            <Button onClick={handleRetry} variant="outline" className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Coba Lagi
            </Button>
            <Button asChild className="flex-1">
              <a href="/dashboard/documents">Kembali ke Dashboard</a>
            </Button>
          </>
        )}
      </div>

      {/* RESULT SUMMARY */}
      {attemptResult && (
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 dark:border-emerald-800 dark:from-emerald-950/30 dark:to-teal-950/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-4 text-5xl">{scoreInfo.emoji}</div>
              <h2 className={cn("text-3xl font-bold", scoreInfo.color)}>
                {scorePercentage}%
              </h2>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {scoreInfo.text} Kamu mendapat {attemptResult.score} dari {attemptResult.total} jawaban benar!
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/60 p-4 text-center dark:bg-slate-900/60">
                <p className="text-2xl font-bold text-emerald-600">{attemptResult.score}</p>
                <p className="text-sm text-muted-foreground">Benar</p>
              </div>
              <div className="rounded-xl bg-white/60 p-4 text-center dark:bg-slate-900/60">
                <p className="text-2xl font-bold text-blue-600">{attemptResult.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="rounded-xl bg-white/60 p-4 text-center dark:bg-slate-900/60">
                <p className="text-2xl font-bold text-red-600">{attemptResult.total - attemptResult.score}</p>
                <p className="text-sm text-muted-foreground">Salah</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}