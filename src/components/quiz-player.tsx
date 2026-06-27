"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

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

export default function QuizPlayer({
  quizId,
  questions,
}: Props) {
  const router = useRouter();

  const [answers, setAnswers] =
    useState<Record<string, string>>({});

  const [attemptResult, setAttemptResult] =
    useState<AttemptResult | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const allAnswered = answeredCount === totalQuestions;
  const progressPercentage = Math.round(
    (answeredCount / totalQuestions) * 100
  );
  const scorePercentage = attemptResult
    ? Math.round(
        (attemptResult.score / attemptResult.total) * 100
      )
    : 0;

  function handleAnswer(
    questionId: string,
    answer: string
  ) {
    // Jangan allow change jawaban setelah submit
    if (attemptResult) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  async function handleSubmit() {
    // Safety check: pastikan semua soal sudah dijawab
    if (!allAnswered) {
      alert("Harap jawab semua soal terlebih dahulu");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/quiz-attempts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId,
            answers,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Failed to submit quiz",
        );
      }

      setAttemptResult({
        score: data.score,
        total: data.total,
        results: data.results,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal submit quiz");
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    // Reset answers tapi keep attempt result history
    setAnswers({});
    setAttemptResult(null);
  }

  return (
    <div className="space-y-6 py-6">
      {/* PROGRESS SECTION */}
      <div className="sticky top-0 z-10 rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm dark:border-blue-900 dark:bg-blue-950">
        <div className="space-y-2">
          {/* Text Info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                {answeredCount}/{totalQuestions} soal
              </p>
            </div>

            {/* Status Badge */}
            {attemptResult ? (
              <div className="rounded bg-white px-2 py-1 dark:bg-slate-900">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Score
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  {attemptResult.score}/{attemptResult.total}
                </p>
              </div>
            ) : (
              <div
                className={`rounded px-2 py-1 text-xs font-semibold transition-all ${
                  allAnswered
                    ? "bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-300"
                    : "bg-orange-500/20 text-orange-700 dark:bg-orange-500/30 dark:text-orange-300"
                }`}
              >
                {allAnswered ? "✓ SIAP SUBMIT" : "⏳ MASIH ADA KOSONG"}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-blue-200 dark:bg-blue-900">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300 dark:bg-blue-400"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* QUESTIONS SECTION */}
      <div className="space-y-3">
        {questions.map((question, index) => {
          const result = attemptResult?.results.find(
            (item) => item.questionId === question.id
          );
          const userAnswer = answers[question.id];

          return (
            <div
              key={question.id}
              className="overflow-hidden rounded border border-slate-200 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900"
            >
              {/* Question Header */}
              <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    <span className="text-xs">
                      {index + 1}
                    </span>
                  </div>
                  <h2 className="flex-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {question.question}
                  </h2>
                  {result && result.isCorrect && (
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 px-3 py-2">
                {[
                  question.optionA,
                  question.optionB,
                  question.optionC,
                  question.optionD,
                ].map((option, i) => {
                  const letter = ["A", "B", "C", "D"][i];
                  const isSelected = userAnswer === letter;
                  const isCorrectAnswer =
                    result?.correctAnswer === letter;
                  const isUserWrongChoice =
                    result &&
                    isSelected &&
                    !isCorrectAnswer;

                  let bgColor = "bg-white dark:bg-slate-800";
                  let borderColor = "border border-slate-300 dark:border-slate-600";
                  let textColor = "text-slate-900 dark:text-slate-50";
                  let hoverEffect =
                    "hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer";

                  // After submit: style jawaban
                  if (result) {
                    if (isCorrectAnswer) {
                      bgColor = "bg-green-50 dark:bg-green-950";
                      borderColor = "border border-green-300 dark:border-green-700";
                      textColor = "text-green-900 dark:text-green-50";
                      hoverEffect = "";
                    } else if (isUserWrongChoice) {
                      bgColor = "bg-red-50 dark:bg-red-950";
                      borderColor = "border border-red-300 dark:border-red-700";
                      textColor = "text-red-900 dark:text-red-50";
                      hoverEffect = "";
                    } else {
                      bgColor = "bg-slate-50 dark:bg-slate-700";
                      borderColor = "border border-slate-300 dark:border-slate-600";
                      textColor = "text-slate-600 dark:text-slate-400";
                      hoverEffect = "";
                    }
                  } else if (isSelected) {
                    bgColor = "bg-blue-50 dark:bg-blue-950";
                    borderColor = "border-2 border-blue-400 dark:border-blue-600";
                    textColor = "text-blue-900 dark:text-blue-50";
                    hoverEffect = "";
                  }

                  return (
                    <label
                      key={letter}
                      className={`flex items-start gap-2 rounded p-2 transition-all ${bgColor} ${borderColor} ${textColor} ${hoverEffect}`}
                    >
                      <div className="flex items-center pt-0.5">
                        <input
                          type="radio"
                          name={question.id}
                          value={letter}
                          disabled={!!attemptResult}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswer(
                              question.id,
                              letter
                            )
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        {letter}. {option}
                      </div>
                      {result && isUserWrongChoice && (
                        <XCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
                      )}
                      {result && isCorrectAnswer && (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Explanation */}
              {result && (
                <div className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        Benar:
                      </span>
                      <span className="rounded bg-green-100 px-2 py-0.5 font-bold text-green-800 dark:bg-green-900 dark:text-green-200">
                        {result.correctAnswer}
                      </span>
                    </div>

                    {result.explanation && (
                      <p className="mt-1 text-slate-700 dark:text-slate-300">
                        {result.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ACTION BUTTONS */}
      {!attemptResult ? (
        <Button
          onClick={handleSubmit}
          disabled={submitting || !allAnswered}
          className="w-full"
          variant={allAnswered ? "default" : "secondary"}
        >
          {submitting
            ? "Mengirim..."
            : allAnswered
              ? "Submit Quiz"
              : `Jawab ${totalQuestions - answeredCount} Soal Lagi`}
        </Button>
      ) : (
        <Button
          onClick={handleRetry}
          className="w-full"
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
      )}

      {/* RESULT SUMMARY */}
      {attemptResult && (
        <div className="space-y-3 rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          {/* Score Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
              {attemptResult.score}/{attemptResult.total} Benar
            </h2>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              {scorePercentage}% - {
                scorePercentage >= 80
                  ? "Excellent!"
                  : scorePercentage >= 60
                    ? "Good job!"
                    : "Keep learning!"
              }
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 border-t border-green-200 pt-3 dark:border-green-800">
            <div className="rounded bg-white/60 text-center dark:bg-slate-800/60">
              <p className="text-xs text-slate-600 dark:text-slate-400">Benar</p>
              <p className="font-bold text-green-600 dark:text-green-400">
                {attemptResult.score}
              </p>
            </div>
            <div className="rounded bg-white/60 text-center dark:bg-slate-800/60">
              <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
              <p className="font-bold text-blue-600 dark:text-blue-400">
                {attemptResult.total}
              </p>
            </div>
            <div className="rounded bg-white/60 text-center dark:bg-slate-800/60">
              <p className="text-xs text-slate-600 dark:text-slate-400">Salah</p>
              <p className="font-bold text-red-600 dark:text-red-400">
                {attemptResult.total - attemptResult.score}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
