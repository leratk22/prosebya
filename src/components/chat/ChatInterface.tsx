"use client";

import * as React from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { BottomSheet } from "./BottomSheet";
import { PsychologistCard } from "./PsychologistCard";
import { psychologists, Psychologist } from "@/data/psychologists";
import { Button } from "@/components/ui/button";

export type ChatStep =
  | "start"
  | "category"
  | "gender"
  | "age"
  | "method"
  | "loading"
  | "results";

export interface Message {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  variant?: "default" | "chips";
  chips?: Array<{ label: string; value: string }>;
  timestamp: Date;
}

export interface ChatInterfaceProps {
  onClose?: () => void;
  onShowResults?: (psychologists: Psychologist[]) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, onShowResults }) => {
  const [step, setStep] = React.useState<ChatStep>("start");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [showTyping, setShowTyping] = React.useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  // Храним выбранные симптомы по категориям: { "Мое состояние": ["симптом1", "симптом2"], ... }
  const [selectedSymptomsByCategory, setSelectedSymptomsByCategory] = React.useState<Record<string, string[]>>({});
  const [currentCategoryForSheet, setCurrentCategoryForSheet] = React.useState<string>("");
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedAges, setSelectedAges] = React.useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = React.useState<string[]>([]);
  const [userTextInput, setUserTextInput] = React.useState<string>("");
  const [showCustomInput, setShowCustomInput] = React.useState<boolean>(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = React.useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  // Initialize with welcome message
  React.useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "bot",
        content: "Привет! Я помогу подобрать психолога. Что вас беспокоит?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setStep("category");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showBotTyping = (callback: () => void, delay: number = 800) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      callback();
    }, delay);
  };

  // Маппинг полных названий методов на короткие (как в данных психологов)
  const methodNameMapping: Record<string, string> = {
    "Гештальт-терапия": "Гештальт",
    "Психоаналитическая терапия": "Психоанализ",
    "КПТ": "КПТ",
    "Экзистенциальная психотерапия": "Экзистенциальная психотерапия",
    "Транзактный анализ": "Транзактный анализ",
    "Системная семейная психотерапия": "Системная семейная терапия",
    "Гуманистические направления": "Гуманистические направления",
    "EMDR (ДПДГ)": "EMDR",
    "Эмоционально-фокусированная терапия": "Эмоционально-фокусированная терапия",
    "ЛОРП": "ЛОРП",
    "ОРКТ": "ОРКТ",
    "РЭПТ": "РЭПТ",
    "АСТ": "АСТ",
    "FАСТ": "FАСТ",
    "Коучинг": "Коучинг",
    "Интегративный": "Интегративный",
    "Арт-терапия": "Арт-терапия",
    "Эриксоновская психотерапия и эриксоновский гипноз": "Эриксоновская психотерапия",
    "ДПТ": "ДПТ",
  };

  // Словарь ключевых слов для распознавания проблем
  const KEYWORD_MAPPING: Record<string, string[]> = {
    // --- МОЕ СОСТОЯНИЕ ---
    'Снижение настроения': ['груст', 'тоск', 'печал', 'депрес', 'плохое настроен', 'ничего не радует', 'плач', 'уныни', 'апати', 'мрак', 'тяжело на душе'],
    'Отсутствие радости и удовольствия': ['ничего не хоч', 'скучно', 'нет сил', 'все равно', 'безразлич', 'не получаю удовольстви', 'пресн', 'серо', 'ангедония'],
    'Чувство одиночества, непонимания': ['один', 'одино', 'никому не нуж', 'меня не понима', 'нет друзей', 'бросил', 'расста', 'изоляци'],
    'Мысли об уходе из жизни': ['жить', 'суицид', 'умереть', 'смерт', 'покончить', 'нет смысла', 'зачем я', 'петля', 'выпил'],
    'Чувство безнадежности и упадка энергии': ['нет сил', 'разбит', 'слабость', 'безнадег', 'тупик', 'нет выхода', 'руки опускаются', 'истощени', 'батарейка села'],
    'Проблемы со сном': ['сон', 'сплю', 'бессонниц', 'кошмар', 'просыпаюсь', 'не могу уснуть', 'режим'],
    'Недовольство собой': ['ненавижу себя', 'урод', 'тупой', 'неудачник', 'ошибка', 'стыд', 'вина', 'самооценк', 'хуже всех', 'критик'],
    'Поиск себя, смысла жизни': ['кто я', 'зачем', 'предназначени', 'путь', 'потерял себя', 'куда двигаться', 'смысл'],
    'Навязчивые мысли': ['мысли', 'крутятся', 'голове', 'не могу забыть', 'зациклил', 'ок', 'думаю о'],
    'Панические атаки': ['паник', 'атак', 'задыха', 'сердце', 'страшно умереть', 'тряс', 'накрывает', 'п а'],
    'Приступы страха': ['страх', 'боюсь', 'фоби', 'тревог', 'испуг', 'ужас', 'боязн'],
    'Проблемы с питанием, проблемы с весом': ['вес', 'толст', 'жир', 'худе', 'еда', 'ем', 'аппетит', 'голод', 'рпп', 'булими', 'анорекси', 'перееда'],
    'Частые перепады настроения': ['качели', 'меняется настроение', 'то смеюсь то плачу', 'биполяр', 'срыв', 'истерик', 'нестабильн'],
    'Рискованные поступки': ['адреналин', 'опасн', 'риск', 'скорость', 'драйв', 'без тормозов'],
    'Чрезмерная энергичность': ['не могу остановиться', 'прет', 'много энергии', 'не сплю', 'мания', 'ускорен'],
    'Трудности с выполнением повседневных задач': ['не могу встать', 'посуд', 'уборк', 'забил', 'лень', 'прокрастинаци', 'быт'],

    // --- ОТНОШЕНИЯ ---
    'Трудности в общении': ['общ', 'людьм', 'разговор', 'стесняюсь', 'замкнут', 'социофоб', 'компани', 'друж'],
    'Созависимость': ['без него не могу', 'без нее не могу', 'зависим', 'манипуляц', 'жертва', 'контроль', 'спасать'],
    'Импульсивность': ['вспылил', 'сорвался', 'наорал', 'не сдержался', 'горяч', 'псих'],
    'Конфликты': ['ссор', 'руга', 'скандал', 'крич', 'драка', 'спор', 'обид', 'претензи'],
    'Сложности в семье': ['мама', 'папа', 'родител', 'муж', 'жена', 'дети', 'ребенок', 'свекровь', 'теща', 'семь', 'брак'],
    'Отсутствие интереса к сексуальной активности': ['секс', 'либидо', 'не хочу мужа', 'не хочу жену', 'постел', 'холод'],
    'Проблемы с эрекцией': ['стояк', 'эрекци', 'импотен', 'не встал', 'член'],
    'Аноргазмия': ['оргазм', 'финал', 'кончит', 'разрядк'],
    'Проблемы с сексуальным возбуждением': ['возбужд', 'влажн', 'сухость', 'желани'],

    // --- РАБОТА И УЧЕБА ---
    'Конфликтные ситуации на работе': ['начальник', 'коллег', 'босс', 'офис', 'коллектив', 'подставили', 'уволили'],
    'Трудности с мотивацией и управлением временем': ['тайм', 'время', 'успеваю', 'опаздываю', 'дедлайн', 'завал', 'планирова'],
    'Трудно сосредоточить внимание на задачах': ['фокус', 'внимани', 'отвлека', 'каша в голове', 'сдвг'],
    'Рассеянность/забывчивость': ['забыл', 'теряю', 'память', 'голова дырявая'],
    'Споры между деловыми партнерами': ['партнер', 'бизнес', 'деньги', 'договор', 'киданули'],

    // --- СОБЫТИЯ В ЖИЗНИ ---
    'Развод': ['развод', 'разрыв', 'бывший', 'бывшая', 'ушел', 'ушла'],
    'Потеря работы': ['увольн', 'сокращен', 'безработн', 'карьер'],
    'Смерть или болезнь близких': ['умер', 'смерть', 'похорон', 'болеет', 'рак', 'диагноз', 'потерял'],
    'Физическое насилие, сексуальное насилие': ['бил', 'ударил', 'изнасило', 'домога', 'насили', 'абьюз', 'жертв']
  };

  // AI-симуляция: анализ текста пользователя
  const analyzeUserText = (text: string): string[] => {
    const normalizedText = text.toLowerCase();
    const detectedProblems: string[] = [];

    Object.entries(KEYWORD_MAPPING).forEach(([problem, keywords]) => {
      // Проверяем, есть ли хотя бы одно ключевое слово в тексте
      if (keywords.some(keyword => normalizedText.includes(keyword))) {
        detectedProblems.push(problem);
      }
    });

    // Fallback: Если ничего не нашли, возвращаем общую категорию
    if (detectedProblems.length === 0) {
      return ['Поиск себя, смысла жизни'];
    }

    // Убираем дубликаты на всякий случай
    return Array.from(new Set(detectedProblems));
  };

  // Функция фильтрации психологов
  const getRecommendations = (
    symptoms: string[],
    gender: string,
    ageRanges: string[],
    userText?: string,
    method?: string
  ): { psychologists: Psychologist[]; isFallback: boolean; detectedSymptoms?: string[] } => {
    let filtered = [...psychologists];
    let detectedSymptoms = symptoms;

    // Если симптомы не выбраны, но есть текст - анализируем его
    // ИЛИ если выбраны симптомы И есть текст - добавляем проанализированные симптомы из текста
    if (userText && userText.trim()) {
      const textSymptoms = analyzeUserText(userText);
      if (symptoms.length === 0) {
        // Если нет выбранных симптомов, используем только проанализированные из текста
        detectedSymptoms = textSymptoms;
      } else {
        // Если есть выбранные симптомы, добавляем проанализированные из текста
        detectedSymptoms = [...new Set([...symptoms, ...textSymptoms])];
      }
    }

    // Фильтр по полу
    if (gender && gender !== "any") {
      filtered = filtered.filter((p) => p.gender === gender);
    }

    // Фильтр по возрасту
    if (ageRanges.length > 0) {
      filtered = filtered.filter((p) => {
        return ageRanges.some((range) => {
          if (range === "25-35") {
            return p.age >= 25 && p.age <= 35;
          }
          if (range === "35-45") {
            return p.age >= 35 && p.age <= 45;
          }
          if (range === "45+") {
            return p.age >= 45;
          }
          return false;
        });
      });
    }

    // Фильтр по методу терапии (может быть несколько методов)
    if (method && method.trim()) {
      // Преобразуем полное название в короткое (как в данных)
      const shortMethodName = methodNameMapping[method] || method;
      filtered = filtered.filter((p) => 
        p.methods.some((m) => 
          m.toLowerCase().includes(shortMethodName.toLowerCase()) ||
          shortMethodName.toLowerCase().includes(m.toLowerCase())
        )
      );
    }

    // Фильтр по симптомам (хотя бы один должен совпадать)
    if (detectedSymptoms.length > 0) {
      filtered = filtered.filter((p) => {
        return detectedSymptoms.some((symptom) =>
          p.specializations.includes(symptom)
        );
      });
    }

    // Если после фильтрации список пуст - возвращаем топ-3 по рейтингу
    if (filtered.length === 0) {
      const topRated = [...psychologists]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      return {
        psychologists: topRated,
        isFallback: true,
        detectedSymptoms,
      };
    }

    // Сортируем по рейтингу и возвращаем до 5 лучших
    const sorted = filtered
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    return {
      psychologists: sorted,
      isFallback: false,
      detectedSymptoms,
    };
  };

  const handleCategorySelect = (category: string) => {
    // Если выбран чипс "Меня беспокоит что-то другое"
    if (category === "custom_input") {
      // Очищаем все выбранные категории и симптомы
      setSelectedSymptomsByCategory({});
      setShowCustomInput(true);
      return;
    }
    
    // Открываем Bottom Sheet для выбранной категории
    setCurrentCategoryForSheet(category);
    setBottomSheetOpen(true);
    setShowCustomInput(false); // Скрываем поле ввода, если открываем категорию
  };

  const handleDetailsSubmit = () => {
    setBottomSheetOpen(false);
    // Сохраняем выбранные симптомы для текущей категории
    // selectedSymptomsByCategory уже обновляется через onToggle в BottomSheet
    // Просто закрываем шторку и остаемся на Step 1 (category)
    setCurrentCategoryForSheet("");
  };

  // Обработчик кнопки "Далее" для категорий
  const handleCategoryNext = () => {
    // Собираем все выбранные симптомы из всех категорий
    const allSelectedSymptoms = Object.values(selectedSymptomsByCategory).flat();
    
    // Проверяем также текущий inputValue, если userTextInput еще не сохранен
    const hasTextInput = userTextInput.trim() || inputValue.trim();
    
    if (allSelectedSymptoms.length === 0 && !hasTextInput) {
      // Если ничего не выбрано, не переходим
      return;
    }

    // Сохраняем текущий текст, если он есть
    if (inputValue.trim() && !userTextInput.trim()) {
      setUserTextInput(inputValue.trim());
    }

    // Сохраняем финальный текст перед показом сообщений
    const finalTextInput = userTextInput.trim() || inputValue.trim();
    if (inputValue.trim() && !userTextInput.trim()) {
      setUserTextInput(inputValue.trim());
    }
    
    // Скрываем поле ввода при переходе
    setShowCustomInput(false);

    // Показываем выбранные категории и симптомы (если есть)
    const selectedCategories = Object.keys(selectedSymptomsByCategory).filter(
      (cat) => selectedSymptomsByCategory[cat].length > 0
    );
    
    if (selectedCategories.length > 0) {
      const summary = selectedCategories.map((cat) => {
        const symptoms = selectedSymptomsByCategory[cat];
        return `${cat}: ${symptoms.join(", ")}`;
      }).join("; ");
      addMessage({
        type: "user",
        content: summary,
      });
    }

    // Показываем текстовый ввод, если он есть (и еще не был показан как сообщение)
    if (finalTextInput) {
      // Проверяем, не было ли уже сообщения с этим текстом
      const hasTextMessage = messages.some(m => 
        m.type === "user" && 
        (m.content === finalTextInput || m.content === inputValue.trim())
      );
      
      if (!hasTextMessage) {
        addMessage({
          type: "user",
          content: finalTextInput,
        });
      }
      
      // Очищаем поле ввода
      if (inputValue.trim()) {
        setInputValue("");
      }
    }

    showBotTyping(() => {
      // Сначала добавляем текст вопроса
      addMessage({
        type: "bot",
        content: "С кем комфортнее работать?",
      });
      // Затем добавляем чипсы отдельным сообщением
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
        setStep("gender");
      }, 300);
    });
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    
    // Проверяем, есть ли уже сообщение пользователя с этим выбором
    const hasUserMessage = messages.some(
      m => m.type === "user" && 
      m.content === (genderOptions.find((opt) => opt.value === gender)?.label || gender)
    );
    
    if (!hasUserMessage) {
      addMessage({
        type: "user",
        content: genderOptions.find((opt) => opt.value === gender)?.label || gender,
      });
    }

    // Проверяем, есть ли уже сообщение бота с вопросом о возрасте
    const hasAgeQuestion = messages.some(
      m => m.type === "bot" && 
      m.content === "Предпочтения по возрасту?"
    );
    
    if (!hasAgeQuestion) {
      showBotTyping(() => {
        // Сначала добавляем текст вопроса
        addMessage({
          type: "bot",
          content: "Предпочтения по возрасту?",
        });
        // Затем добавляем чипсы отдельным сообщением
        setTimeout(() => {
          addMessage({
            type: "bot",
            content: "",
            variant: "chips",
            chips: getAgeChips(),
          });
          setStep("age");
        }, 300);
      });
    } else {
      // Если вопрос уже есть, просто переключаем шаг
      setStep("age");
    }
  };

  const handleAgeSelect = (age: string) => {
    // Тогглим выбор возраста
    if (selectedAges.includes(age)) {
      setSelectedAges(selectedAges.filter((a) => a !== age));
    } else {
      setSelectedAges([...selectedAges, age]);
    }
    // НЕ переходим автоматически, только тогглим выбор
  };

  // Обработчик кнопки "Далее" для возраста
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
      // Сначала добавляем текст вопроса
      addMessage({
        type: "bot",
        content: "Вам интересен конкретный метод терапии (например, Гештальт)?",
      });
      // Затем добавляем кнопки
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
        setStep("method");
      }, 300);
    });
  };

  // Список доступных методов терапии (полные названия для отображения)
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

  const methodOptions = therapyMethods.map((method) => ({
    id: method,
    label: method,
  }));

  const handleMethodSelect = (value: string) => {
    if (value === "skip_method") {
      setSelectedMethods([]);
      addMessage({
        type: "user",
        content: "Пропустить",
      });
      // Переходим к поиску
      startSearch();
    } else if (value === "select_method") {
      // Открываем Bottom Sheet для выбора метода
      setBottomSheetOpen(true);
    }
  };

  // Обработчик выбора метода в Bottom Sheet (мультивыбор)
  const handleMethodToggle = (methodId: string) => {
    setSelectedMethods((prev) => {
      if (prev.includes(methodId)) {
        return prev.filter((id) => id !== methodId);
      } else {
        return [...prev, methodId];
      }
    });
    // НЕ закрываем шторку, остаемся для дальнейшего выбора
  };

  // Обработчик кнопки "Готово" для методов
  const handleMethodSubmit = () => {
    setBottomSheetOpen(false);
    if (selectedMethods.length > 0) {
      const methodLabels = selectedMethods.map((id) => {
        const option = methodOptions.find((opt) => opt.id === id);
        return option?.label || id;
      });
      addMessage({
        type: "user",
        content: methodLabels.join(", "),
      });
    }
    // Переходим к поиску
    startSearch();
  };

  const startSearch = () => {
    setStep("loading");
    
    // Показываем сообщение о поиске
    addMessage({
      type: "bot",
      content: "Подбираем специалистов...",
    });

    // Собираем все выбранные симптомы из всех категорий
    const selectedSymptoms = Object.values(selectedSymptomsByCategory).flat();

    // Получаем рекомендации (используем первый метод, если выбрано несколько)
    const methodForFilter = selectedMethods.length > 0 ? selectedMethods[0] : undefined;

    // Получаем рекомендации
    const { psychologists: recommended } =
      getRecommendations(
        selectedSymptoms,
        selectedGender,
        selectedAges,
        userTextInput || undefined,
        methodForFilter || undefined
      );

    // Вызываем callback для перехода на страницу результатов (лоадер показывается на родительском уровне)
    if (onShowResults) {
      onShowResults(recommended);
    }
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;

    addMessage({
      type: "user",
      content: inputValue,
    });
    setInputValue("");
  };

  // Функция для определения шага по значению чипса
  const getStepForValue = (value: string): ChatStep | null => {
    // Пропускаем специальный чипс для ввода
    if (value === "custom_input") {
      return "category";
    }
    // Проверяем категории
    if (categoryOptions.some(opt => opt.value === value)) {
      return "category";
    }
    // Проверяем пол
    if (genderOptions.some(opt => opt.value === value)) {
      return "gender";
    }
    // Проверяем возраст
    if (ageOptions.some(opt => opt.value === value)) {
      return "age";
    }
    // Проверяем методы (select_method, skip_method или конкретный метод)
    if (value === "select_method" || value === "skip_method" || methodOptions.some(opt => opt.id === value)) {
      return "method";
    }
    return null;
  };

  // Функция для удаления сообщений после определенного шага
  const removeMessagesAfterStep = (targetStep: ChatStep, selectedValue: string) => {
    // Находим индекс последнего сообщения с чипсами для этого шага
    let lastMessageIndex = -1;
    
    if (targetStep === "category") {
      // Находим последнее сообщение с чипсами категорий (включая чипс "custom_input")
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.variant === "chips" && msg.type === "bot" && msg.chips?.some(chip => 
          categoryOptions.some(opt => opt.value === chip.value) || chip.value === "custom_input"
        )) {
          lastMessageIndex = i;
          break;
        }
      }
    } else if (targetStep === "gender") {
      // Находим последнее сообщение с чипсами пола
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.variant === "chips" && msg.type === "bot" && msg.chips?.some(chip => genderOptions.some(opt => opt.value === chip.value))) {
          lastMessageIndex = i;
          break;
        }
      }
    } else if (targetStep === "age") {
      // Находим последнее сообщение с чипсами возраста
      // Ищем сообщение с чипсами, а также проверяем, есть ли перед ним текст "Предпочтения по возрасту?"
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.variant === "chips" && msg.type === "bot" && msg.chips?.some(chip => ageOptions.some(opt => opt.value === chip.value))) {
          lastMessageIndex = i;
          // Проверяем, есть ли перед чипсами текст вопроса - если да, оставляем его
          if (i > 0 && messages[i - 1].type === "bot" && messages[i - 1].content === "Предпочтения по возрасту?") {
            // Оставляем оба сообщения (текст и чипсы)
            lastMessageIndex = i;
          }
          break;
        }
      }
    } else if (targetStep === "method") {
      // Находим последнее сообщение с методами
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.variant === "chips" && msg.type === "bot" && msg.chips?.some(chip => 
          chip.value === "select_method" || chip.value === "skip_method"
        )) {
          lastMessageIndex = i;
          break;
        }
      }
    }

    // Удаляем все сообщения после найденного индекса (оставляем чипсы, чтобы можно было выбрать снова)
    if (lastMessageIndex >= 0) {
      setMessages(prev => prev.slice(0, lastMessageIndex + 1));
    }
  };

  // Функция для очистки состояния последующих шагов
  const clearStateAfterStep = (targetStep: ChatStep) => {
    const stepOrder: ChatStep[] = ["start", "category", "gender", "age", "method", "loading", "results"];
    const targetIndex = stepOrder.indexOf(targetStep);
    
    if (targetIndex === -1) return;

    // Очищаем состояние для шагов после targetStep
    if (targetIndex < stepOrder.indexOf("gender")) {
      // Если возвращаемся к категориям или раньше - очищаем все последующие шаги
      setSelectedGender("");
      setSelectedAges([]);
      setSelectedMethods([]);
      // Также очищаем текстовый ввод, если возвращаемся к категориям
      if (targetStep === "category") {
        setUserTextInput("");
        setInputValue("");
        setShowCustomInput(false);
      }
    } else if (targetIndex < stepOrder.indexOf("age")) {
      // Если возвращаемся к полу - очищаем возраст и методы
      setSelectedAges([]);
      setSelectedMethods([]);
    } else if (targetIndex < stepOrder.indexOf("method")) {
      // Если возвращаемся к возрасту - очищаем методы
      setSelectedMethods([]);
    }
  };

  const handleChipClick = (value: string) => {
    // Определяем, к какому шагу относится этот чипс
    const chipStep = getStepForValue(value);
    
    // Если это чипс из предыдущего шага или тот же шаг (для категорий - можем перевыбрать)
    if (chipStep) {
      const stepOrder: ChatStep[] = ["start", "category", "gender", "age", "method", "loading", "results"];
      const currentIndex = stepOrder.indexOf(step);
      const chipIndex = stepOrder.indexOf(chipStep);
      
      // Если это предыдущий шаг ИЛИ мы на том же шаге категорий (чтобы удалить старые сообщения)
      if (chipIndex < currentIndex || (chipStep === "category" && step === "category")) {
        // Удаляем сообщения после этого шага
        removeMessagesAfterStep(chipStep, value);
        
        // Очищаем состояние последующих шагов (только если это предыдущий шаг)
        if (chipIndex < currentIndex) {
          clearStateAfterStep(chipStep);
        }
        
        // Возвращаемся к нужному шагу (только если это предыдущий шаг)
        if (chipIndex < currentIndex) {
          setStep(chipStep);
        }
        
        // Небольшая задержка для обновления состояния перед обработкой выбора
        setTimeout(() => {
          // Обрабатываем выбор
          if (chipStep === "category") {
            // Скрываем поле ввода при возврате к категориям
            setShowCustomInput(false);
            // Очищаем текстовый ввод, если перевыбираем категорию
            if (step === "category") {
              setUserTextInput("");
              setInputValue("");
            }
            // Для категорий - открываем Bottom Sheet (не очищаем выбранные симптомы, чтобы можно было изменить)
            handleCategorySelect(value);
          } else if (chipStep === "gender") {
            // Для пола - сразу перезаписываем выбор
            handleGenderSelect(value);
          } else if (chipStep === "age") {
            // Для возраста - всегда вызываем handleAgeSelect
            handleAgeSelect(value);
          } else if (chipStep === "method") {
            // Для методов - обрабатываем выбор
            handleMethodSelect(value);
          }
        }, 100);
        return;
      }
    }
    
    // Обычная обработка для текущего шага
    if (step === "category") {
      handleCategorySelect(value);
    } else if (step === "gender") {
      handleGenderSelect(value);
    } else if (step === "age") {
      // Для возраста на текущем шаге - всегда вызываем handleAgeSelect
      handleAgeSelect(value);
    } else if (step === "method") {
      handleMethodSelect(value);
    }
  };

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

  // Data
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

  // Show category chips when step is category
  React.useEffect(() => {
    if (step === "category" && messages.length === 1) {
      // Проверяем, что чипсы еще не добавлены
      const hasChipsMessage = messages.some(
        m => m.variant === "chips" && m.type === "bot"
      );
      
      if (!hasChipsMessage) {
        const timer = setTimeout(() => {
          // Сначала добавляем текст вопроса (если его еще нет)
          // Затем добавляем чипсы отдельным сообщением
          const categoryChips = categoryOptions.map((opt) => {
            const count = selectedSymptomsByCategory[opt.value]?.length || 0;
            return {
              label: count > 0 ? `${opt.label} (${count})` : opt.label,
              value: opt.value,
            };
          });
          
          // Добавляем 5-й чипс "Меня беспокоит что-то другое"
          categoryChips.push({
            label: "Меня беспокоит что-то другое",
            value: "custom_input",
          });
          
          addMessage({
            type: "bot",
            content: "",
            variant: "chips",
            chips: categoryChips,
          });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [step, messages, addMessage, selectedSymptomsByCategory]);

  // Get current chips with active state for age step
  const getAgeChips = () => {
    return ageOptions.map((opt) => ({
      label: opt.label,
      value: opt.value,
      active: selectedAges.includes(opt.value),
    }));
  };

  return (
    <div className="flex flex-col h-screen max-w-[440px] mx-auto bg-[#EAEFF8]">
      {/* Header */}
      <div className="flex items-center justify-between px-16 py-20 bg-white">
        <div className="flex items-center gap-12 flex-1">
          <div className="flex items-center gap-12">
            <h1 className="text-14 font-semibold text-core-alpha-80">
              ProSebyAI bot
            </h1>
            <span className="px-8 py-4 bg-brand-blue-alpha-10 text-12 font-medium text-brand-blue rounded-full">
              BETA
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-6 shrink-0"
            aria-label="Закрыть"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-16 py-16 space-y-16">
        {messages.map((message, index) => {
          // For age step, update chips with current selectedAges
          let chipsToShow = message.chips;
          if (step === "age" && message.variant === "chips" && message.type === "bot" && index === messages.length - 1) {
            chipsToShow = getAgeChips();
          }
          // For category step, update chips with counters
          if (step === "category" && message.variant === "chips" && message.type === "bot") {
            const categoryChips = categoryOptions.map((opt) => {
              const count = selectedSymptomsByCategory[opt.value]?.length || 0;
              return {
                label: count > 0 ? `${opt.label} (${count})` : opt.label,
                value: opt.value,
              };
            });
            // Добавляем 5-й чипс "Меня беспокоит что-то другое"
            categoryChips.push({
              label: "Меня беспокоит что-то другое",
              value: "custom_input",
            });
            chipsToShow = categoryChips;
          }
          return (
            <MessageBubble
              key={message.id}
              type={message.type}
              content={message.content}
              variant={message.variant}
              chips={chipsToShow}
              onChipClick={handleChipClick}
              multiSelect={step === "age"}
            />
          );
        })}
        {showTyping && <MessageBubble type="bot" showTyping={true} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Фиксированная область для кнопки/поля ввода (всегда резервирует место) */}
      <div className="bg-[#EAEFF8] border-t border-core-alpha-10 min-h-[72px] flex items-center shrink-0">
        {/* Кнопка "Далее" для категорий (скрыта если выбрано поле ввода) */}
        {step === "category" && !showCustomInput && (
          <div className="w-full px-16 py-16">
            <Button
              onClick={handleCategoryNext}
              disabled={
                Object.values(selectedSymptomsByCategory).flat().length === 0 &&
                !userTextInput.trim() &&
                !inputValue.trim()
              }
              variant="primary"
              size="l"
              fullWidth={true}
            >
              Далее
            </Button>
          </div>
        )}

        {/* Input для категорий (только когда выбран чипс "Меня беспокоит что-то другое") */}
        {step === "category" && showCustomInput && (
          <div className="w-full px-16 py-16">
            <ChatInput
              value={inputValue}
              onChange={(value) => {
                setInputValue(value);
                // Сохраняем текст сразу при вводе
                if (value.trim()) {
                  setUserTextInput(value.trim());
                } else {
                  setUserTextInput("");
                }
              }}
              onSubmit={() => {
                // При отправке текста на шаге категорий сохраняем и показываем сообщение
                if (inputValue.trim()) {
                  const text = inputValue.trim();
                  setUserTextInput(text);
                  
                  // Очищаем все выбранные категории и симптомы, так как пользователь выбрал свободный ввод
                  setSelectedSymptomsByCategory({});
                  
                  addMessage({
                    type: "user",
                    content: text,
                  });
                  setInputValue("");
                  
                  // Автоматически продолжаем, так как это единственный ввод
                  setTimeout(() => {
                    handleCategoryNext();
                  }, 300);
                }
              }}
              placeholder="Опишите, что вас беспокоит"
            />
          </div>
        )}

        {/* Кнопка "Далее" для возраста */}
        {step === "age" && (
          <div className="w-full px-16 py-16">
            <Button
              onClick={handleAgeNext}
              disabled={selectedAges.length === 0}
              variant="primary"
              size="l"
              fullWidth={true}
            >
              Далее
            </Button>
          </div>
        )}
      </div>

      {/* Фиксированный дисклеймер внизу (всегда на одном месте) */}
      <div className="bg-[#EAEFF8] border-t border-core-alpha-10 px-16 py-16 shrink-0">
        <p className="text-12 leading-[1.3333333333333333em] text-center text-core-alpha-60">
          Бот может допускать ошибки. Информация не является медицинским заключением
        </p>
      </div>

      {/* Bottom Sheet для деталей (открывается из категорий) */}
      {step === "category" && currentCategoryForSheet && (
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => {
            setBottomSheetOpen(false);
            setCurrentCategoryForSheet("");
          }}
          options={PROBLEM_OPTIONS[currentCategoryForSheet as keyof typeof PROBLEM_OPTIONS]?.map((problem) => ({
            id: problem,
            label: problem,
          })) || []}
          selectedIds={selectedSymptomsByCategory[currentCategoryForSheet] || []}
          onToggle={(id) => {
            const currentSelected = selectedSymptomsByCategory[currentCategoryForSheet] || [];
            if (currentSelected.includes(id)) {
              setSelectedSymptomsByCategory((prev) => ({
                ...prev,
                [currentCategoryForSheet]: currentSelected.filter((d) => d !== id),
              }));
            } else {
              setSelectedSymptomsByCategory((prev) => ({
                ...prev,
                [currentCategoryForSheet]: [...currentSelected, id],
              }));
            }
          }}
          onSubmit={handleDetailsSubmit}
          helperText="Можно выбрать несколько пунктов или ничего не выбирать. Если не нашли подходящего варианта, опишите проблему в поле ввода ниже."
        />
      )}

      {/* Bottom Sheet для методов терапии */}
      {step === "method" && (
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => setBottomSheetOpen(false)}
          title="Выберите метод терапии"
          options={methodOptions}
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
