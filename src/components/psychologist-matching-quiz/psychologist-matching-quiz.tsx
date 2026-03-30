"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/icons";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  type AgeId,
  type GenderId,
  QUIZ_TOTAL_STEPS,
  THERAPY_METHODS,
} from "@/data/psychologist-matching-quiz";

type TherapyMode = "any" | "choose";

type Answers = {
  gender: GenderId | null;
  ages: AgeId[];
  therapyMode: TherapyMode;
  therapyMethods: string[];
};

const initialAnswers: Answers = {
  gender: null,
  ages: [],
  therapyMode: "any",
  therapyMethods: [],
};

function ProgressLine({ step }: { step: number }) {
  const pct = (step / QUIZ_TOTAL_STEPS) * 100;
  return (
    <div className="flex w-full items-center gap-16 px-32 py-8">
      <div className="relative h-6 min-h-6 flex-1 overflow-hidden rounded-full bg-light-bg-pressed">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-brand-orange"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="w-80 shrink-0 text-right text-body-xl font-medium font-euclid text-light-fg-primary">
        {step} из {QUIZ_TOTAL_STEPS}
      </p>
    </div>
  );
}

function QuizAppBar({
  title,
  onBack,
  step,
}: {
  title: string;
  onBack: () => void;
  step: number;
}) {
  return (
    <header className="shrink-0 bg-light-bg-primary">
      <div className="flex h-56 items-center px-16">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-56 w-40 shrink-0 items-center justify-center rounded-full text-light-fg-primary hover:bg-light-bg-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg-primary"
          aria-label="Назад"
        >
          <Icon name="chevron-left" size={24} />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center pr-40 text-body-xl font-semibold font-euclid text-light-fg-primary [line-height:24px]">
          {title}
        </h1>
      </div>
      <ProgressLine step={step} />
    </header>
  );
}

function QuizChoiceCard({
  selected,
  onClick,
  children,
  muted,
}: {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  muted?: boolean;
}) {
  const keyActivate = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={keyActivate}
      className={[
        "flex w-full max-w-[311px] cursor-pointer items-center rounded-m border px-16 py-16 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg-primary",
        selected
          ? "border-light-border-accent bg-light-bg-accent-overlay"
          : "border-light-border-secondary bg-light-bg-primary",
        muted ? "opacity-60" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span className="flex size-24 shrink-0 items-center justify-center p-2">
      <span
        className={[
          "flex size-20 items-center justify-center rounded-full border-2",
          selected
            ? "border-light-border-accent bg-light-bg-primary"
            : "border-core-alpha-10 bg-white",
        ].join(" ")}
      >
        {selected ? (
          <span className="size-10 shrink-0 rounded-full bg-brand-blue" />
        ) : null}
      </span>
    </span>
  );
}

function normalizeAges(ages: AgeId[], id: AgeId): AgeId[] {
  if (id === "any") return ["any"];
  const withoutAny = ages.filter((a) => a !== "any");
  const has = withoutAny.includes(id);
  const next = has ? withoutAny.filter((a) => a !== id) : [...withoutAny, id];
  return next;
}

export function PsychologistMatchingQuiz() {
  const [step, setStep] = React.useState(1);
  const [answers, setAnswers] = React.useState<Answers>(initialAnswers);

  const goBack = () => {
    if (step <= 1) return;
    setStep((s) => s - 1);
  };

  const goNext = () => setStep((s) => Math.min(s + 1, QUIZ_TOTAL_STEPS));

  const setGender = (id: GenderId) => {
    setAnswers((a) => ({ ...a, gender: id }));
    setStep(2);
  };

  const toggleAge = (id: AgeId) => {
    setAnswers((a) => ({ ...a, ages: normalizeAges(a.ages, id) }));
  };

  const ageCanContinue = answers.ages.length > 0;

  const setTherapyMode = (mode: TherapyMode) => {
    setAnswers((a) => ({
      ...a,
      therapyMode: mode,
      therapyMethods: mode === "any" ? [] : a.therapyMethods,
    }));
  };

  const toggleTherapyMethod = (label: string) => {
    setAnswers((a) => {
      const has = a.therapyMethods.includes(label);
      const therapyMethods = has
        ? a.therapyMethods.filter((m) => m !== label)
        : [...a.therapyMethods, label];
      return { ...a, therapyMethods };
    });
  };

  const therapyCanSubmit =
    answers.therapyMode === "any" ||
    (answers.therapyMode === "choose" && answers.therapyMethods.length > 0);

  const finish = () => {
    setStep(4);
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setStep(1);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-light-bg-primary font-euclid md:min-h-812 md:max-w-375 md:shadow-sm">
      {step >= 1 && step <= 3 ? (
        <>
          {step === 1 ? (
            <QuizAppBar
              title="С кем комфортнее работать"
              onBack={goBack}
              step={1}
            />
          ) : null}
          {step === 2 ? (
            <QuizAppBar title="Возраст специалиста" onBack={goBack} step={2} />
          ) : null}
          {step === 3 ? (
            <QuizAppBar title="Метод терапии" onBack={goBack} step={3} />
          ) : null}

          <div className="flex flex-1 flex-col overflow-y-auto">
            {step === 1 ? (
              <div className="flex flex-col items-center gap-8 px-32 pt-40 pb-24">
                {GENDER_OPTIONS.map((opt) => (
                  <QuizChoiceCard
                    key={opt.id}
                    selected={answers.gender === opt.id}
                    onClick={() => setGender(opt.id)}
                  >
                    <span className="text-body-xl font-regular text-light-fg-secondary [line-height:24px]">
                      {opt.label}
                    </span>
                  </QuizChoiceCard>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="flex flex-col items-center gap-8 px-32 pb-24 pt-16">
                <p className="w-full max-w-[311px] pb-16 pt-16 text-center text-body-l font-regular text-light-fg-secondary">
                  Можно выбрать несколько
                </p>
                {AGE_OPTIONS.map((opt) => {
                  const selected = answers.ages.includes(opt.id);
                  const anySelected = answers.ages.includes("any");
                  return (
                    <QuizChoiceCard
                      key={opt.id}
                      selected={selected}
                      muted={
                        (anySelected && opt.id !== "any") ||
                        (!anySelected &&
                          answers.ages.length > 0 &&
                          opt.id === "any" &&
                          !selected)
                      }
                      onClick={() => toggleAge(opt.id)}
                    >
                      <Checkbox
                        type="box"
                        checked={selected}
                        className="pointer-events-none shrink-0"
                        tabIndex={-1}
                        aria-hidden
                      />
                      <span
                        className={[
                          "min-w-0 flex-1 pl-8 text-body-xl font-regular [line-height:24px]",
                          selected
                            ? "text-light-fg-primary"
                            : anySelected && opt.id !== "any"
                              ? "text-light-fg-muted"
                              : "text-light-fg-secondary",
                        ].join(" ")}
                      >
                        {opt.label}
                      </span>
                    </QuizChoiceCard>
                  );
                })}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="flex flex-col items-center px-32 pb-80 pt-16">
                <div className="flex w-full max-w-[311px] flex-col gap-8">
                  <QuizChoiceCard
                    selected={answers.therapyMode === "any"}
                    onClick={() => setTherapyMode("any")}
                  >
                    <RadioIndicator selected={answers.therapyMode === "any"} />
                    <span
                      className={[
                        "min-w-0 flex-1 pl-8 text-body-xl font-regular [line-height:24px]",
                        answers.therapyMode === "any"
                          ? "text-light-fg-primary"
                          : "text-light-fg-secondary",
                      ].join(" ")}
                    >
                      Любой
                    </span>
                  </QuizChoiceCard>
                  <QuizChoiceCard
                    selected={answers.therapyMode === "choose"}
                    onClick={() => setTherapyMode("choose")}
                  >
                    <RadioIndicator selected={answers.therapyMode === "choose"} />
                    <span
                      className={[
                        "min-w-0 flex-1 pl-8 text-body-xl font-regular [line-height:24px]",
                        answers.therapyMode === "choose"
                          ? "text-light-fg-primary"
                          : "text-light-fg-secondary",
                      ].join(" ")}
                    >
                      Выбрать метод
                    </span>
                  </QuizChoiceCard>
                </div>

                {answers.therapyMode === "choose" ? (
                  <div className="mt-16 w-full">
                    <p className="px-16 pb-16 pt-8 text-center text-body-l font-regular text-light-fg-secondary">
                      Выберите один или несколько, если знаете подходящие вам
                      методы
                    </p>
                    <div className="flex flex-col">
                      {THERAPY_METHODS.map((method) => {
                        const checked = answers.therapyMethods.includes(method);
                        return (
                          <div
                            key={method}
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleTherapyMethod(method)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleTherapyMethod(method);
                              }
                            }}
                            className="flex w-full cursor-pointer items-center gap-8 border-b border-light-border-secondary py-16 pl-16 pr-16 text-left hover:bg-light-bg-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue"
                          >
                            <span className="min-w-0 flex-1 text-body-xl font-regular text-light-fg-primary [line-height:24px]">
                              {method}
                            </span>
                            <Checkbox
                              type="box"
                              checked={checked}
                              className="pointer-events-none shrink-0"
                              tabIndex={-1}
                              aria-hidden
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {step === 2 ? (
            <footer className="mt-auto flex w-full shrink-0 flex-col bg-light-bg-primary px-32 pb-20 pt-12">
              <Button
                variant="primary"
                size="l"
                fullWidth
                disabled={!ageCanContinue}
                type="button"
                onClick={goNext}
              >
                Продолжить
              </Button>
            </footer>
          ) : null}

          {step === 3 ? (
            <footer className="sticky bottom-0 z-10 flex w-full shrink-0 flex-col border-t border-light-border-button-secondary bg-light-bg-primary px-32 pb-20 pt-12">
              <Button
                variant="primary"
                size="l"
                fullWidth
                disabled={!therapyCanSubmit}
                type="button"
                onClick={finish}
              >
                Подобрать
              </Button>
            </footer>
          ) : null}
        </>
      ) : null}

      {step === 4 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-24 px-32 py-40 text-center">
          <p className="text-title-l font-semibold text-light-fg-primary">
            Запрос отправлен
          </p>
          <p className="text-body-l font-regular text-light-fg-secondary">
            Здесь будет экран с подобранными специалистами или переход в выдачу.
          </p>
          <Button variant="secondary" size="l" type="button" onClick={restart}>
            Пройти заново
          </Button>
        </div>
      ) : null}
    </div>
  );
}
