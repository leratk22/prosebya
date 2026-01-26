"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { BottomSheet } from "./BottomSheet";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { psychologists, Psychologist } from "@/data/psychologists";

export type V2Step = "welcome";

export interface PrototypeV2InterfaceProps {
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

// Конфигурация проблем по категориям
const PROBLEM_OPTIONS = {
  'Мое состояние': [
    'Снижение настроения',
    'Отсутствие радости и удовольствия',
    'Чувство одиночества, непонимания',
    'Мысли об уходе из жизни',
    'Чувство безнадежности и упадка энергии',
    'Проблемы со сном',
    'Недовольство собой',
    'Поиск себя, смысла жизни',
    'Навязчивые мысли',
    'Панические атаки',
    'Приступы страха',
    'Проблемы с питанием, проблемы с весом',
    'Частые перепады настроения',
    'Рискованные поступки',
    'Чрезмерная энергичность',
    'Трудности с выполнением повседневных задач'
  ],
  'Отношения': [
    'Трудности в общении',
    'Созависимость',
    'Импульсивность',
    'Конфликты',
    'Сложности в семье',
    'Отсутствие интереса к сексуальной активности',
    'Проблемы с эрекцией',
    'Аноргазмия',
    'Проблемы с сексуальным возбуждением'
  ],
  'Работа и учеба': [
    'Конфликтные ситуации на работе',
    'Трудности с мотивацией и управлением временем',
    'Трудно сосредоточить внимание на задачах',
    'Рассеянность/забывчивость',
    'Споры между деловыми партнерами'
  ],
  'События в жизни': [
    'Развод',
    'Потеря работы',
    'Смерть или болезнь близких',
    'Физическое насилие, сексуальное насилие'
  ]
};

const categoryOptions = [
  { label: "Мое состояние", value: "Мое состояние" },
  { label: "Отношения", value: "Отношения" },
  { label: "Работа и учеба", value: "Работа и учеба" },
  { label: "События в жизни", value: "События в жизни" },
];

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

export const PrototypeV2Interface: React.FC<PrototypeV2InterfaceProps> = ({
  onClose,
  onShowResults,
}) => {
  const [step, setStep] = React.useState<V2Step>("welcome");
  const [chatSubStep, setChatSubStep] = React.useState<ChatSubStep | null>(null);
  const [showChat, setShowChat] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [selectedSymptomsByCategory, setSelectedSymptomsByCategory] = React.useState<Record<string, string[]>>({});
  const [customInputValue, setCustomInputValue] = React.useState<string>("");
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const [isCustomInputSheet, setIsCustomInputSheet] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [showTyping, setShowTyping] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedAges, setSelectedAges] = React.useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = React.useState<string[]>([]);
  const [showGenderNextButton, setShowGenderNextButton] = React.useState(false);
  const [showAgeNextButton, setShowAgeNextButton] = React.useState(false);
  const [showMethodNextButton, setShowMethodNextButton] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

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

  // Обработка выбора категории
  const handleCategorySelect = (category: string) => {
    if (category === "custom") {
      // При выборе "Описать своими словами" - сбрасываем все выбранные категории
      setSelectedSymptomsByCategory({});
      setIsCustomInputSheet(true);
      setBottomSheetOpen(true);
    } else {
      setSelectedCategory(category);
      setIsCustomInputSheet(false);
      setBottomSheetOpen(true);
    }
  };

  // Обработка сохранения подпунктов категории
  const handleCategoryDetailsSave = () => {
    setBottomSheetOpen(false);
    setSelectedCategory("");
  };

  // Обработка отправки текста проблемы
  const handleCustomInputSubmit = () => {
    if (!customInputValue.trim()) return;
    setBottomSheetOpen(false);
    setIsCustomInputSheet(false);
  };

  // Обработка перехода к следующему шагу после выбора категорий
  const handleWelcomeNext = () => {
    const hasSelectedSymptoms = Object.values(selectedSymptomsByCategory).flat().length > 0;
    const hasCustomInput = customInputValue.trim().length > 0;
    
    if (!hasSelectedSymptoms && !hasCustomInput) return;
    
    // Показываем чат на том же экране
    setShowChat(true);
    setChatSubStep("gender");
    
    // Формируем сообщение пользователя со списком всего выбранного
    const messageParts: string[] = [];
    
    // Добавляем выбранные категории и симптомы
    const selectedCategories = Object.keys(selectedSymptomsByCategory).filter(
      (cat) => selectedSymptomsByCategory[cat].length > 0
    );
    
    if (selectedCategories.length > 0) {
      const summary = selectedCategories.map((cat) => {
        const symptoms = selectedSymptomsByCategory[cat];
        return `${cat}: ${symptoms.join(", ")}`;
      }).join("; ");
      messageParts.push(summary);
    }
    
    // Добавляем текстовый ввод, если есть
    if (hasCustomInput) {
      messageParts.push(customInputValue.trim());
    }
    
    // Добавляем сообщение пользователя
    addMessage({
      type: "user",
      content: messageParts.join("\n\n"),
    });
    
    // Показываем вопрос о поле
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

  // Обработка выбора пола
  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setShowGenderNextButton(true);
    
    const genderLabel = genderOptions.find((opt) => opt.value === gender)?.label || gender;
    addMessage({
      type: "user",
      content: genderLabel,
    });
  };

  const handleGenderNext = () => {
    if (!selectedGender) return;
    
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

  // Обработка выбора возраста
  const handleAgeToggle = (age: string) => {
    const newSelectedAges = selectedAges.includes(age)
      ? selectedAges.filter((a) => a !== age)
      : [...selectedAges, age];
    
    setSelectedAges(newSelectedAges);
  };

  const handleAgeNext = () => {
    if (selectedAges.length === 0) return;
    
    const selectedLabels = selectedAges.map((value) => {
      const option = ageOptions.find((opt) => opt.value === value);
      return option?.label || "";
    });
    
    addMessage({
      type: "user",
      content: selectedLabels.join(", "),
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

  // Обработка выбора метода
  const handleMethodSelect = (value: string) => {
    if (value === "skip_method") {
      setSelectedMethods([]);
      addMessage({
        type: "user",
        content: "Пропустить",
      });
      startSearch();
    } else if (value === "select_method") {
      // Открываем Bottom Sheet для выбора метода
      setIsCustomInputSheet(false);
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
      const methodLabels = selectedMethods.map((id) => id);
      addMessage({
        type: "user",
        content: methodLabels.join(", "),
      });
    }
    startSearch();
  };

  const handleMethodNext = () => {
    startSearch();
  };

  // Функция поиска психологов
  const startSearch = () => {
    const selectedSymptoms = Object.values(selectedSymptomsByCategory).flat();
    const methodForFilter = selectedMethods.length > 0 ? selectedMethods[0] : undefined;
    
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
      filtered = filtered.filter((p) => {
        return selectedSymptoms.some((symptom) =>
          p.specializations.includes(symptom)
        );
      });
    }
    
    if (filtered.length === 0) {
      filtered = [...psychologists].sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
      filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
    }
    
    // Вызываем callback для показа результатов
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

  // Рендер экрана приветствия
  const renderWelcomeScreen = () => {
    const hasSelectedSymptoms = Object.values(selectedSymptomsByCategory).flat().length > 0;
    const hasCustomInput = customInputValue.trim().length > 0;
    const canProceed = hasSelectedSymptoms || hasCustomInput;

    return (
      <div className="flex flex-col h-full bg-[#EAEFF8]">
        {/* Header */}
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

        {/* Content - категории или чат */}
        <div className="flex-1 overflow-y-auto px-16 py-24">
          {!showChat ? (
            <>
              <h2 className="text-20 font-semibold text-core-alpha-80 mb-16 text-center">
                Приветствие
              </h2>
              <p className="text-16 text-core-alpha-80 mb-24 text-center">
                Выберите, что вас волнует из категорий или напишите
              </p>

              {/* Категории в два столбца */}
              <div className="grid grid-cols-2 gap-12 mb-24">
                {categoryOptions.map((category) => {
                  const count = selectedSymptomsByCategory[category.value]?.length || 0;
                  return (
                    <button
                      key={category.value}
                      onClick={() => handleCategorySelect(category.value)}
                      className={`
                        px-16 py-16 rounded-16 border-2 transition-colors
                        ${count > 0
                          ? "bg-brand-blue-alpha-10 border-brand-blue text-brand-blue"
                          : "bg-white border-core-alpha-10 text-core-alpha-80 hover:border-core-alpha-20"
                        }
                      `}
                    >
                      <div className="text-14 font-semibold text-left">
                        {category.label}
                        {count > 0 && ` (${count})`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Кнопка "Описать своими словами" */}
              <button
                onClick={() => handleCategorySelect("custom")}
                className={`
                  w-full px-16 py-16 rounded-16 border-2 transition-colors mb-24
                  ${customInputValue.trim()
                    ? "bg-brand-blue-alpha-10 border-brand-blue text-brand-blue"
                    : "bg-white border-core-alpha-10 text-core-alpha-80 hover:border-core-alpha-20"
                  }
                `}
              >
                <div className="text-14 font-semibold text-left">
                  Описать своими словами
                </div>
              </button>
            </>
          ) : (
            /* Чат */
            <div className="space-y-16">
              {messages.map((message, index) => {
                let chipsToShow = message.chips;
                if (chatSubStep === "age" && message.variant === "chips" && message.type === "bot" && index === messages.length - 1) {
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
          )}
        </div>

        {/* Footer с кнопкой "Дальше" или кнопками навигации */}
        <div className="bg-white border-t border-core-alpha-10 px-16 py-16">
          {!showChat ? (
            <Button
              onClick={handleWelcomeNext}
              disabled={!canProceed}
              variant="primary"
              size="l"
              fullWidth
            >
              Дальше
            </Button>
          ) : (
            <>
              {chatSubStep === "gender" && showGenderNextButton && (
                <ButtonGroup
                  type="2-buttons"
                  buttons={[
                    {
                      label: "Назад",
                      variant: "secondary",
                      onClick: () => {
                        setShowChat(false);
                        setChatSubStep(null);
                        setMessages([]);
                        setSelectedGender("");
                        setShowGenderNextButton(false);
                      },
                    },
                    {
                      label: "Продолжить",
                      variant: "primary",
                      onClick: handleGenderNext,
                      disabled: !selectedGender,
                    },
                  ]}
                />
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
                            (m) => m.type === "bot" && m.content === "С кем комфортнее работать?"
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
                            (m) => m.type === "bot" && m.content === "Предпочтения по возрасту?"
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
            </>
          )}
        </div>

        {/* Фиксированный дисклеймер внизу */}
        {showChat && (
          <div className="bg-[#EAEFF8] border-t border-core-alpha-10 px-16 py-16 shrink-0">
            <p className="text-12 leading-[1.3333333333333333em] text-center text-core-alpha-60">
              Бот может допускать ошибки. Информация не является медицинским заключением
            </p>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="w-full max-w-[440px] h-screen mx-auto bg-[#EAEFF8] relative">
      {renderWelcomeScreen()}

      {/* Bottom Sheet для категорий */}
      {selectedCategory && selectedCategory !== "method" && (
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => {
            setBottomSheetOpen(false);
            setSelectedCategory("");
          }}
          title={selectedCategory}
          options={PROBLEM_OPTIONS[selectedCategory as keyof typeof PROBLEM_OPTIONS]?.map((problem) => ({
            id: problem,
            label: problem,
          })) || []}
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
          helperText="Можно выбрать несколько пунктов или ничего не выбирать. Если не нашли подходящего варианта, опишите проблему в поле ввода ниже."
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

      {/* Bottom Sheet для ввода текста */}
      {isCustomInputSheet && (
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => {
            setBottomSheetOpen(false);
            setIsCustomInputSheet(false);
          }}
          title="Моя проблема"
          options={[]}
          selectedIds={[]}
          onToggle={() => {}}
          onSubmit={handleCustomInputSubmit}
          submitLabel="Отправить"
          customContent={
            <div className="px-16 py-16">
              <textarea
                value={customInputValue}
                onChange={(e) => setCustomInputValue(e.target.value)}
                placeholder="Опишите свою проблему"
                className="
                  w-full min-h-[200px] p-16
                  border border-core-alpha-10 rounded-16
                  text-16 leading-[1.5em] text-core-alpha-80
                  placeholder:text-core-alpha-40
                  resize-none
                  focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-alpha-10
                "
              />
              <div className="mt-12 space-y-8">
                <p className="text-14 text-core-alpha-60 text-center">
                  Можно коротко — 2–3 слова.
                </p>
                <p className="text-14 text-core-alpha-60 text-center">
                  Например: «не сплю», «тревожно», «ссоры».
                </p>
              </div>
            </div>
          }
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
                      setIsCustomInputSheet(false);
                    },
                  },
                  {
                    label: "Отправить",
                    variant: "primary",
                    onClick: handleCustomInputSubmit,
                    disabled: !customInputValue.trim(),
                  },
                ]}
              />
            </div>
          }
        />
      )}

      {/* Bottom Sheet для методов терапии */}
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
