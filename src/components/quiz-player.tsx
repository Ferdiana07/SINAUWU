"use client";

import { useState } from "react";

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
}

interface Props {
  questions: Question[];
}

export default function QuizPlayer({
  questions,
}: Props) {

  const [answers, setAnswers] =
    useState<Record<string, string>>({});

  const [score, setScore] =
    useState<number | null>(null);

  function handleAnswer(
    questionId: string,
    answer: string
  ) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  function handleSubmit() {
    let correct = 0;

    questions.forEach((question) => {
      if (
        answers[question.id] ===
        question.correctAnswer
      ) {
        correct++;
      }
    });

    setScore(correct);
  }

  return (
    <div className="space-y-6">

      {questions.map(
        (question, index) => (
          <div
            key={question.id}
            className="border rounded-lg p-4"
          >
            <h2 className="font-semibold">
              {index + 1}. {question.question}
            </h2>

            <div className="mt-3 space-y-2">

              {[
                question.optionA,
                question.optionB,
                question.optionC,
                question.optionD,
              ].map((option, i) => {

                const letter =
                  ["A", "B", "C", "D"][i];

                return (
                  <label
                    key={letter}
                    className="block"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={letter}
                      checked={
                        answers[
                          question.id
                        ] === letter
                      }
                      onChange={() =>
                        handleAnswer(
                          question.id,
                          letter
                        )
                      }
                    />

                    {" "}
                    {letter}. {option}
                  </label>
                );
              })}

            </div>
          </div>
        )
      )}

      <button
        onClick={handleSubmit}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Submit Quiz
      </button>

      {score !== null && (
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-bold">
            Score:
            {" "}
            {score}
            /
            {questions.length}
          </h2>
        </div>
      )}

    </div>
  );
}