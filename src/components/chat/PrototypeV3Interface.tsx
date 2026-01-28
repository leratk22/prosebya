"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { BottomSheet } from "./BottomSheet";
import { MessageBubble } from "./MessageBubble";
import { Chip } from "./Chip";
import { psychologists, Psychologist } from "@/data/psychologists";
import { symptomToSpecializations } from "./symptomMapping";

export type PsychologistWithDisplayTags = Psychologist & { displayTags?: string[] };

export interface PrototypeV3InterfaceProps {
  onClose?: () => void;
  onShowResults?: (psychologists: PsychologistWithDisplayTags[]) => void;
}

export interface Message {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  variant?: "default" | "chips";
  chips?: Array<{ label: string; value: string; active?: boolean }>;
  timestamp: Date;
}

const categoryOptions = [
  { label: "Здоровье и тело", value: "Здоровье и тело" },
  { label: "Кризисные ситуации", value: "Кризисные ситуации" },
  { label: "Работа и эффективность", value: "Работа и эффективность" },
  { label: "Эмоциональные трудности", value: "Эмоциональные трудности" },
  { label: "Проблемы в отношениях", value: "Проблемы в отношениях" },
  { label: "Личностный рост", value: "Личностный рост" },
];

const PROBLEM_OPTIONS = {
  "Здоровье и тело": [
    "Проблема с питанием и весом",
    "Сексуальное здоровье",
    "Хроническая болезнь",
    "Химическая зависимость",
    "Принятие своего тела",
    "Панические атаки",
    "Проблемы со сном",
    "Нехимическая зависимость",
  ],
  "Кризисные ситуации": [
    "Развод",
    "Потеря работы",
    "Горе и утрата",
    "Насилие",
    "Страх смерти",
  ],
  "Работа и эффективность": [
    "Продуктивность в работе",
    "Прокрастинация",
    "Финансовая эффективность",
    "Стресс и выгорание",
    "Баланс работы и жизни",
    "Лидерство и управление",
    "Профессиональный рост",
    "Самоопределение",
    "Конфликты на работе",
    "Отношения в коллективе",
  ],
  "Эмоциональные трудности": [
    "Плохое настроение",
    "Мысли о суициде",
    "Рассеянность",
    "Эмоциональное напряжение",
    "Страх и тревога",
    "Перепады настроения",
    "Раздражительность",
    "Апатия",
  ],
  "Проблемы в отношениях": [
    "Чувство одиночества",
    "Трудности в общении",
    "Отношения с детьми",
    "Отношения в паре",
    "Конфликты с близкими",
    "Отношения в семье",
  ],
  "Личностный рост": [
    "Взросление и сепарация",
    "Трудно принимать решения",
    "Проблемы с самооценкой",
    "Творческое развитие",
    "Поиск себя и смысла жизни",
    "Личные границы",
  ],
};

const genderOptions = [
  { label: "Мужчина", value: "male" },
  { label: "Женщина", value: "female" },
  { label: "Неважно", value: "any" },
];

const ageOptions = [
  { label: "25-35", value: "25-35" },
  { label: "35-45", value: "35-45" },
  { label: "45+", value: "45+" },
];

const PLACEHOLDER_PREFIX = "Например, «";
const PLACEHOLDER_SUFFIX = "»";
const PLACEHOLDER_PHRASES = [
  "не сплю",
  "тревожно",
  "ссоры",
  "плохой сон",
  "выгорание",
];

const therapyMethods = [
  "Гештальт-терапия",
  "Психоаналитическая терапия",
  "КПТ",
  "Экзистенциальная психотерапия",
  "Транзактный анализ",
  "Системная семейная психотерапия",
  "Гуманистические направления",
  "EMDR (ДПДГ)",
  "Эмоционально-фокусированная терапия",
  "ЛОРП",
  "ОРКТ",
  "РЭПТ",
  "АСТ",
  "FАСТ",
  "Коучинг",
  "Интегративный",
  "Арт-терапия",
  "Эриксоновская психотерапия и эриксоновский гипноз",
  "ДПТ",
];

type ChatSubStep = "gender" | "age" | "method" | "done";

function getChipStepFromContent(content: string | React.ReactNode | undefined): ChatSubStep | null {
  if (typeof content !== "string") return null;
  if (content === "С кем комфортнее работать?") return "gender";
  if (content === "Предпочтения по возрасту?") return "age";
  if (content.includes("метод терапии")) return "method";
  return null;
}

export const PrototypeV3Interface: React.FC<PrototypeV3InterfaceProps> = ({
  onClose,
  onShowResults,
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [showTyping, setShowTyping] = React.useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [selectedSymptomsByCategory, setSelectedSymptomsByCategory] = React.useState<
    Record<string, string[]>
  >({});
  const [inputValue, setInputValue] = React.useState("");
  const [lastSymptomsText, setLastSymptomsText] = React.useState("");
  const [chatSubStep, setChatSubStep] = React.useState<ChatSubStep | null>(null);
  const [showInput, setShowInput] = React.useState(true);
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedAges, setSelectedAges] = React.useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = React.useState<string[]>([]);
  const [showGenderNextButton, setShowGenderNextButton] = React.useState(false);
  const [showAgeNextButton, setShowAgeNextButton] = React.useState(false);
  const [showMethodNextButton, setShowMethodNextButton] = React.useState(false);
  const [methodQuestionAnswered, setMethodQuestionAnswered] = React.useState(false);
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
  const [typewriterText, setTypewriterText] = React.useState("");
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          content: "Опишите, что вас беспокоит. Можно коротко — 2–3 слова.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  React.useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }, [inputValue]);

  // Плейсхолдер с эффектом печати: по очереди показываем фразы, печатаем быстро
  React.useEffect(() => {
    const phrase = PLACEHOLDER_PHRASES[placeholderIndex];
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (charIndex <= phrase.length) {
        setTypewriterText(phrase.slice(0, charIndex));
        charIndex += 1;
        timeoutId = setTimeout(typeNext, 50);
      } else {
        timeoutId = setTimeout(() => {
          setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_PHRASES.length);
          setTypewriterText("");
        }, 2200);
      }
    };

    const startId = setTimeout(typeNext, 400);
    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, [placeholderIndex]);

  const addMessage = React.useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const showBotTyping = (callback: () => void, delay: number = 800) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      callback();
    }, delay);
  };

  const buildSelectionSummary = () => {
    const selectedSymptoms = Object.values(selectedSymptomsByCategory).flat();
    if (selectedSymptoms.length === 0) return "";
    return Array.from(new Set(selectedSymptoms)).join(", ");
  };

  const handleCategoryChipClick = (category: string) => {
    setSelectedCategory(category);
    setBottomSheetOpen(true);
  };

  const handleCategoryDetailsSave = () => {
    setBottomSheetOpen(false);
    setSelectedCategory("");

    const summary = buildSelectionSummary();
    let baseText = inputValue;
    if (lastSymptomsText && baseText.includes(lastSymptomsText)) {
      baseText = baseText.replace(lastSymptomsText, "").trim();
    }

    if (!summary) {
      setLastSymptomsText("");
      setInputValue(baseText);
      return;
    }

    const nextText = baseText ? `${baseText}\n${summary}` : summary;
    setLastSymptomsText(summary);
    setInputValue(nextText);
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;

    addMessage({
      type: "user",
      content: inputValue.trim(),
    });

    setShowInput(false);
    setChatSubStep("gender");

    showBotTyping(() => {
      addMessage({
        type: "bot",
        content: "С кем комфортнее работать?",
      });
      setTimeout(() => {
        addMessage({
          type: "bot",
          content: "",
          variant: "chips",
          chips: genderOptions.map((opt) => ({
            label: opt.label,
            value: opt.value,
          })),
        });
        setShowGenderNextButton(true);
      }, 300);
    });
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    const genderLabel = genderOptions.find((opt) => opt.value === gender)?.label || gender;
    addMessage({
      type: "user",
      content: genderLabel,
    });
    handleGenderNext(gender);
  };

  const handleGenderNext = (genderOverride?: string) => {
    const genderValue = genderOverride ?? selectedGender;
    if (!genderValue) return;
    showBotTyping(() => {
      addMessage({
        type: "bot",
        content: "Предпочтения по возрасту?",
      });
      setTimeout(() => {
        addMessage({
          type: "bot",
          content: "",
          variant: "chips",
          chips: ageOptions.map((opt) => ({
            label: opt.label,
            value: opt.value,
            active: selectedAges.includes(opt.value),
          })),
        });
        setChatSubStep("age");
        setShowGenderNextButton(false);
        setShowAgeNextButton(true);
      }, 300);
    });
  };

  const handleAgeToggle = (age: string) => {
    const newSelectedAges = selectedAges.includes(age)
      ? selectedAges.filter((a) => a !== age)
      : [...selectedAges, age];
    setSelectedAges(newSelectedAges);
  };

  const handleAgeNext = () => {
    if (selectedAges.length === 0) return;
    const selectedLabels = selectedAges
      .map((value) => ageOptions.find((opt) => opt.value === value)?.label || "")
      .join(", ");
    addMessage({
      type: "user",
      content: selectedLabels,
    });
    showBotTyping(() => {
      addMessage({
        type: "bot",
        content: "Вам интересен конкретный метод терапии (например, Гештальт)?",
      });
      setTimeout(() => {
        addMessage({
          type: "bot",
          content: "",
          variant: "chips",
          chips: [
            { label: "Выбрать метод", value: "select_method" },
            { label: "Не разбираюсь", value: "skip_method" },
          ],
        });
        setChatSubStep("method");
        setShowMethodNextButton(true);
        setMethodQuestionAnswered(false);
      }, 300);
    });
  };

  const handleMethodSelect = (value: string) => {
    setMethodQuestionAnswered(true);
    if (value === "skip_method") {
      setSelectedMethods([]);
      addMessage({
        type: "user",
        content: "Не разбираюсь",
      });
      startSearch();
    } else if (value === "select_method") {
      setSelectedCategory("method");
      setBottomSheetOpen(true);
    }
  };

  const handleMethodToggle = (method: string) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== method));
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleMethodSubmit = () => {
    setBottomSheetOpen(false);
    if (selectedMethods.length > 0) {
      addMessage({
        type: "user",
        content: selectedMethods.join(", "),
      });
    }
    startSearch();
  };

  const handleMethodNext = () => {
    startSearch();
  };

  const startSearch = () => {
    const selectedSymptoms = Object.values(selectedSymptomsByCategory).flat();
    const searchSpecializations = Array.from(
      new Set(selectedSymptoms.flatMap(symptomToSpecializations)),
    );
    let filtered = [...psychologists];

    if (selectedGender && selectedGender !== "any") {
      filtered = filtered.filter((p) => p.gender === selectedGender);
    }

    if (selectedAges.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedAges.some((range) => {
          if (range === "25-35") return p.age >= 25 && p.age <= 35;
          if (range === "35-45") return p.age >= 35 && p.age <= 45;
          if (range === "45+") return p.age >= 45;
          return false;
        });
      });
    }

    if (searchSpecializations.length > 0) {
      filtered = filtered.filter((p) =>
        p.specializations.some((spec) => searchSpecializations.includes(spec)),
      );
    }

    if (filtered.length === 0) {
      filtered = [...psychologists].sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
      filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
    }

    if (onShowResults) {
      const withDisplayTags = filtered.map((p) => {
        const matchedCategoryLabels =
          selectedSymptoms.length > 0
            ? selectedSymptoms.filter((symptom) =>
                symptomToSpecializations(symptom).some((spec) =>
                  p.specializations.includes(spec),
                ),
              )
            : undefined;
        return { ...p, displayTags: matchedCategoryLabels };
      });
      onShowResults(withDisplayTags);
    }
  };

  const handleChipClick = (value: string, step?: string | null) => {
    const targetStep = (step ?? chatSubStep) as ChatSubStep | null;
    if (!targetStep) return;

    // Клик по чипу из предыдущего вопроса — откатываемся на тот шаг и перезаписываем ответ
    if (targetStep !== chatSubStep) {
      const genderQuestionIndex = messages.findIndex(
        (m) => m.type === "bot" && m.content === "С кем комфортнее работать?",
      );
      const ageQuestionIndex = messages.findIndex(
        (m) => m.type === "bot" && m.content === "Предпочтения по возрасту?",
      );
      const methodQuestionIndex = messages.findIndex(
        (m) =>
          m.type === "bot" &&
          typeof m.content === "string" &&
          m.content.includes("метод терапии"),
      );

      if (targetStep === "gender" && genderQuestionIndex >= 0) {
        const truncateTo = genderQuestionIndex + 2;
        const genderLabel = genderOptions.find((opt) => opt.value === value)?.label ?? value;
        setMessages((prev) => [
          ...prev.slice(0, truncateTo),
          {
            id: Date.now().toString(),
            type: "user" as const,
            content: genderLabel,
            timestamp: new Date(),
          },
        ]);
        setSelectedGender(value);
        setSelectedAges([]);
        setSelectedMethods([]);
        setChatSubStep("gender");
        setShowGenderNextButton(false);
        setShowAgeNextButton(false);
        setShowMethodNextButton(false);
        handleGenderNext(value);
        return;
      }

      if (targetStep === "age" && ageQuestionIndex >= 0) {
        const truncateTo = ageQuestionIndex + 2;
        setMessages((prev) => prev.slice(0, truncateTo));
        setSelectedMethods([]);
        setChatSubStep("age");
        setShowAgeNextButton(true);
        setShowGenderNextButton(false);
        setShowMethodNextButton(false);
        setSelectedAges((prev) =>
          prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value],
        );
        return;
      }

      if (targetStep === "method" && methodQuestionIndex >= 0) {
        const truncateTo = methodQuestionIndex + 2;
        setMessages((prev) => prev.slice(0, truncateTo));
        setChatSubStep("method");
        setShowMethodNextButton(true);
        setShowAgeNextButton(false);
        setShowGenderNextButton(false);
        handleMethodSelect(value);
        return;
      }
    }

    // Текущий шаг — обычная обработка
    if (chatSubStep === "gender") {
      handleGenderSelect(value);
    } else if (chatSubStep === "age") {
      handleAgeToggle(value);
    } else if (chatSubStep === "method") {
      handleMethodSelect(value);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 max-w-[440px] mx-auto bg-light-bg-secondary w-full">
      <header className="flex items-center justify-between px-16 py-20 bg-light-bg-secondary shrink-0 min-h-64">
        <div className="flex items-center gap-12 flex-1 min-w-0">
          <h1 className="text-14 font-semibold text-core-alpha-80 truncate leading-[20px]">
            ProSebyAI bot
          </h1>
          <span className="px-8 py-4 bg-brand-blue-alpha-10 text-brand-blue text-12 font-medium rounded-full shrink-0 leading-[16px]">
            BETA
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-6 shrink-0 -m-6 flex items-center justify-center text-core-alpha-60 hover:text-core-alpha-80 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-24 h-24" strokeWidth={2} />
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-16 py-16 space-y-16">
        {messages.map((message, index) => {
          let chipsToShow = message.chips;
          if (
            chatSubStep === "age" &&
            message.variant === "chips" &&
            message.type === "bot" &&
            index === messages.length - 1
          ) {
            chipsToShow = ageOptions.map((opt) => ({
              label: opt.label,
              value: opt.value,
              active: selectedAges.includes(opt.value),
            }));
          }
          const chipStep = message.variant === "chips"
            ? getChipStepFromContent(messages[index - 1]?.content)
            : undefined;

          return (
            <MessageBubble
              key={message.id}
              type={message.type}
              content={message.content}
              variant={message.variant}
              chips={chipsToShow}
              onChipClick={handleChipClick}
              chipStep={chipStep ?? undefined}
              multiSelect={chatSubStep === "age"}
            />
          );
        })}
        {showTyping && <MessageBubble type="bot" showTyping={true} />}
        <div ref={messagesEndRef} />
      </div>

      {showInput ? (
        <div className="bg-light-bg-secondary px-16 pt-8 shrink-0 pb-[max(20px,env(safe-area-inset-bottom))]">
          <div className="relative -mx-16">
            <div className="flex gap-4 mb-16 overflow-x-auto whitespace-nowrap scrollbar-hide px-16">
              {categoryOptions.map((category) => {
                const count = selectedSymptomsByCategory[category.value]?.length || 0;
                const isActive = count > 0;
                return (
                  <Chip
                    key={category.value}
                    label={count > 0 ? `${category.label} (${count})` : category.label}
                    active={isActive}
                    onClick={() => handleCategoryChipClick(category.value)}
                  />
                );
              })}
            </div>
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-4 w-32 flex-shrink-0 bg-gradient-to-l from-light-bg-secondary to-transparent"
              aria-hidden
            />
          </div>
          <div className="relative mb-16">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder=" "
              className="
                w-full min-h-[56px] p-16
                border border-core-alpha-10 rounded-m
                text-16 leading-[24px] text-core-alpha-80
                placeholder:text-core-alpha-60
                resize-none
                focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-alpha-10
              "
            />
            {!inputValue.trim() && !isInputFocused && (
              <div
                className="pointer-events-none absolute inset-0 flex items-start p-16 text-16 leading-[24px] text-core-alpha-60"
                aria-hidden
              >
                <span>
                  {PLACEHOLDER_PREFIX}
                  {typewriterText}
                  {typewriterText === PLACEHOLDER_PHRASES[placeholderIndex]
                    ? PLACEHOLDER_SUFFIX
                    : ""}
                </span>
                <span className="animate-pulse" style={{ animationDuration: "1s" }}>
                  |
                </span>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            size="l"
            fullWidth
            onClick={handleInputSubmit}
            disabled={!inputValue.trim()}
          >
            Продолжить
          </Button>
        </div>
      ) : (
        <div className="bg-light-bg-secondary px-16 pt-16 pb-[max(16px,env(safe-area-inset-bottom))] shrink-0">
          {chatSubStep === "gender" && showGenderNextButton && (
            <Button
              variant="secondary"
              size="l"
              fullWidth
              onClick={() => {
                setShowInput(true);
                setChatSubStep(null);
                setMessages((prev) => prev.slice(0, 1));
                setSelectedGender("");
                setShowGenderNextButton(false);
              }}
            >
              Назад
            </Button>
          )}
          {chatSubStep === "age" && showAgeNextButton && (
            <ButtonGroup
              type="2-buttons"
              className="w-full px-0"
              buttons={[
                {
                  label: "Назад",
                  variant: "secondary",
                  onClick: () => {
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      const genderQuestionIndex = newMessages.findIndex(
                        (m) => m.type === "bot" && m.content === "С кем комфортнее работать?",
                      );
                      if (genderQuestionIndex >= 0) {
                        return newMessages.slice(0, genderQuestionIndex + 2);
                      }
                      return newMessages;
                    });
                    setChatSubStep("gender");
                    setSelectedAges([]);
                    setShowAgeNextButton(false);
                    setShowGenderNextButton(true);
                  },
                },
                {
                  label: "Продолжить",
                  variant: "primary",
                  onClick: handleAgeNext,
                  disabled: selectedAges.length === 0,
                },
              ]}
            />
          )}
          {chatSubStep === "method" && showMethodNextButton && (
            <ButtonGroup
              type="2-buttons"
              className="w-full px-0"
              buttons={[
                {
                  label: "Назад",
                  variant: "secondary",
                  onClick: () => {
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      const ageQuestionIndex = newMessages.findIndex(
                        (m) => m.type === "bot" && m.content === "Предпочтения по возрасту?",
                      );
                      if (ageQuestionIndex >= 0) {
                        return newMessages.slice(0, ageQuestionIndex + 2);
                      }
                      return newMessages;
                    });
                    setChatSubStep("age");
                    setSelectedMethods([]);
                    setShowMethodNextButton(false);
                    setShowAgeNextButton(true);
                    setMethodQuestionAnswered(false);
                  },
                },
                {
                  label: "Продолжить",
                  variant: "primary",
                  onClick: handleMethodNext,
                  disabled: !methodQuestionAnswered,
                },
              ]}
            />
          )}
        </div>
      )}

      {showInput ? null : (
        <div className="bg-light-bg-secondary px-16 pt-16 pb-[max(16px,env(safe-area-inset-bottom))] shrink-0">
          <p className="text-12 leading-[1.3333333333333333em] text-center text-core-alpha-60">
            Бот может допускать ошибки. Информация не является медицинским заключением
          </p>
        </div>
      )}

      {selectedCategory && selectedCategory !== "method" && (
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => {
            setBottomSheetOpen(false);
            setSelectedCategory("");
          }}
          title={selectedCategory}
          options={
            PROBLEM_OPTIONS[selectedCategory as keyof typeof PROBLEM_OPTIONS]?.map((problem) => ({
              id: problem,
              label: problem,
            })) || []
          }
          selectedIds={selectedSymptomsByCategory[selectedCategory] || []}
          onToggle={(id) => {
            const currentSelected = selectedSymptomsByCategory[selectedCategory] || [];
            if (currentSelected.includes(id)) {
              setSelectedSymptomsByCategory((prev) => ({
                ...prev,
                [selectedCategory]: currentSelected.filter((d) => d !== id),
              }));
            } else {
              setSelectedSymptomsByCategory((prev) => ({
                ...prev,
                [selectedCategory]: [...currentSelected, id],
              }));
            }
          }}
          onSubmit={handleCategoryDetailsSave}
          helperText="Можно выбрать несколько пунктов или ничего не выбирать."
          customFooter={
            <div className="border-t border-core-alpha-10 px-16 pt-12 pb-20">
              <ButtonGroup
                type="2-buttons"
                buttons={[
                  {
                    label: "Назад",
                    variant: "secondary",
                    onClick: () => {
                      setBottomSheetOpen(false);
                      setSelectedCategory("");
                    },
                  },
                  {
                    label: "Сохранить",
                    variant: "primary",
                    onClick: handleCategoryDetailsSave,
                  },
                ]}
              />
            </div>
          }
        />
      )}

      {selectedCategory === "method" && (
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => {
            setBottomSheetOpen(false);
            setSelectedCategory("");
          }}
          title="Выберите метод терапии"
          options={therapyMethods.map((method) => ({
            id: method,
            label: method,
          }))}
          selectedIds={selectedMethods}
          onToggle={handleMethodToggle}
          onSubmit={handleMethodSubmit}
          submitLabel="Готово"
          helperText="Выберите предпочтительные методы терапии (можно выбрать несколько)"
          showSkipButton={true}
          onSkip={() => {
            setBottomSheetOpen(false);
            setSelectedMethods([]);
            addMessage({
              type: "user",
              content: "Не разбираюсь",
            });
            startSearch();
          }}
        />
      )}
    </div>
  );
};
