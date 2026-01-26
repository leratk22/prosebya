"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { BottomSheet } from "./BottomSheet";
import { MessageBubble } from "./MessageBubble";
import { Chip } from "./Chip";
import { psychologists, Psychologist } from "@/data/psychologists";

export interface PrototypeV3InterfaceProps {
  onClose?: () => void;
  onShowResults?: (psychologists: Psychologist[]) => void;
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
  { label: "Мое состояние", value: "Мое состояние" },
  { label: "Отношения", value: "Отношения" },
  { label: "Работа и учеба", value: "Работа и учеба" },
  { label: "События в жизни", value: "События в жизни" },
];

const PROBLEM_OPTIONS = {
  "Мое состояние": [
    "Снижение настроения",
    "Отсутствие радости и удовольствия",
    "Чувство одиночества, непонимания",
    "Мысли об уходе из жизни",
    "Чувство безнадежности и упадка энергии",
    "Проблемы со сном",
    "Недовольство собой",
    "Поиск себя, смысла жизни",
    "Навязчивые мысли",
    "Панические атаки",
    "Приступы страха",
    "Проблемы с питанием, проблемы с весом",
    "Частые перепады настроения",
    "Рискованные поступки",
    "Чрезмерная энергичность",
    "Трудности с выполнением повседневных задач",
  ],
  "Отношения": [
    "Трудности в общении",
    "Созависимость",
    "Импульсивность",
    "Конфликты",
    "Сложности в семье",
    "Отсутствие интереса к сексуальной активности",
    "Проблемы с эрекцией",
    "Аноргазмия",
    "Проблемы с сексуальным возбуждением",
  ],
  "Работа и учеба": [
    "Конфликтные ситуации на работе",
    "Трудности с мотивацией и управлением временем",
    "Трудно сосредоточить внимание на задачах",
    "Рассеянность/забывчивость",
    "Споры между деловыми партнерами",
  ],
  "События в жизни": [
    "Развод",
    "Потеря работы",
    "Смерть или болезнь близких",
    "Физическое насилие, сексуальное насилие",
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
            { label: "Не разбираюсь / Пропустить", value: "skip_method" },
          ],
        });
        setChatSubStep("method");
        setShowMethodNextButton(true);
      }, 300);
    });
  };

  const handleMethodSelect = (value: string) => {
    if (value === "skip_method") {
      setSelectedMethods([]);
      addMessage({
        type: "user",
        content: "Пропустить",
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

    if (selectedSymptoms.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSymptoms.some((symptom) => p.specializations.includes(symptom)),
      );
    }

    if (filtered.length === 0) {
      filtered = [...psychologists].sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
      filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
    }

    if (onShowResults) {
      onShowResults(filtered);
    }
  };

  const handleChipClick = (value: string) => {
    if (chatSubStep === "gender") {
      handleGenderSelect(value);
    } else if (chatSubStep === "age") {
      handleAgeToggle(value);
    } else if (chatSubStep === "method") {
      handleMethodSelect(value);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[440px] mx-auto bg-[#EAEFF8]">
      <div className="flex items-center justify-between px-16 py-20 bg-white">
        <div className="flex items-center gap-12">
          <h1 className="text-14 font-semibold text-core-alpha-80">ProSebyAI bot</h1>
          <span className="px-8 py-4 bg-brand-blue-alpha-10 text-12 font-medium text-brand-blue rounded-full">
            BETA
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-6 shrink-0" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="rgba(34, 38, 59, 0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

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
          return (
            <MessageBubble
              key={message.id}
              type={message.type}
              content={message.content}
              variant={message.variant}
              chips={chipsToShow}
              onChipClick={handleChipClick}
              multiSelect={chatSubStep === "age"}
            />
          );
        })}
        {showTyping && <MessageBubble type="bot" showTyping={true} />}
        <div ref={messagesEndRef} />
      </div>

      {showInput ? (
        <div className="bg-[#EAEFF8] border-t border-core-alpha-10 px-16 py-16">
          <div className="flex gap-8 mb-12 overflow-x-auto whitespace-nowrap pb-4">
            {categoryOptions.map((category) => {
              const count = selectedSymptomsByCategory[category.value]?.length || 0;
              return (
                <Chip
                  key={category.value}
                  label={count > 0 ? `${category.label} (${count})` : category.label}
                  onClick={() => handleCategoryChipClick(category.value)}
                />
              );
            })}
          </div>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишите в свободной форме"
            className="
              w-full min-h-[48px] p-16
              border border-core-alpha-10 rounded-16
              text-16 leading-[1.5em] text-core-alpha-80
              placeholder:text-core-alpha-40
              resize-none
              focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-alpha-10
            "
          />
          <div className="mt-8 flex items-center justify-between">
            <p className="text-12 text-core-alpha-60">
              Можно коротко: «не сплю», «тревожно», «ссоры»
            </p>
            <Button
              variant="primary"
              size="m"
              onClick={handleInputSubmit}
              disabled={!inputValue.trim()}
            >
              Продолжить
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-[#EAEFF8] border-t border-core-alpha-10 px-16 py-16">
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
                  },
                },
                {
                  label: "Продолжить",
                  variant: "primary",
                  onClick: handleMethodNext,
                },
              ]}
            />
          )}
        </div>
      )}

      {showInput ? null : (
        <div className="bg-[#EAEFF8] border-t border-core-alpha-10 px-16 py-16">
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
              content: "Пропустить",
            });
            startSearch();
          }}
        />
      )}
    </div>
  );
};
