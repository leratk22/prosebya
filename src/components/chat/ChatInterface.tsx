"use client";

import * as React from "react";
import { X } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { BottomSheet } from "./BottomSheet";
import { PsychologistCard } from "./PsychologistCard";
import { psychologists, Psychologist } from "@/data/psychologists";
import { Button } from "@/components/ui/button";
import { symptomToSpecializations } from "./symptomMapping";
import { getContentForSymptoms } from "./contentBySymptom";

export type ChatStep =
  | "start"
  | "category"
  | "gender"
  | "age"
  | "method"
  | "loading"
  | "results"
  | "content_recommendation";

export interface Message {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  variant?: "default" | "chips" | "content_recommendation";
  chips?: Array<{ label: string; value: string }>;
  timestamp: Date;
}

export type PsychologistWithDisplayTags = Psychologist & { displayTags?: string[] };

export interface ChatInterfaceProps {
  onClose?: () => void;
  onShowResults?: (psychologists: PsychologistWithDisplayTags[]) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, onShowResults }) => {
  const [step, setStep] = React.useState<ChatStep>("start");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [showTyping, setShowTyping] = React.useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  // Храним выбранные симптомы по категориям: { "Здоровье и тело": ["симптом1", "симптом2"], ... }
  const [selectedSymptomsByCategory, setSelectedSymptomsByCategory] = React.useState<Record<string, string[]>>({});
  const [currentCategoryForSheet, setCurrentCategoryForSheet] = React.useState<string>("");
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedAges, setSelectedAges] = React.useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = React.useState<string[]>([]);
  const [userTextInput, setUserTextInput] = React.useState<string>("");
  const [showCustomInput, setShowCustomInput] = React.useState<boolean>(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  // Для прототипа: тип подписки определяем случайно один раз за сессию (система знает заранее)
  const hasSubscriptionRef = React.useRef<boolean | null>(null);
  const resolveSubscription = (): boolean => {
    if (hasSubscriptionRef.current === null) {
      // 50/50: paid (true) → psychologist, free (false) → content
      hasSubscriptionRef.current = Math.random() < 0.5 ? false : true;
    }
    return hasSubscriptionRef.current;
  };

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
    // --- ЗДОРОВЬЕ И ТЕЛО ---
    'Проблема с питанием и весом': ['вес', 'толст', 'жир', 'худе', 'еда', 'ем', 'аппетит', 'голод', 'рпп', 'булими', 'анорекси', 'перееда', 'питани'],
    'Сексуальное здоровье': ['секс', 'либидо', 'эрекци', 'импотен', 'оргазм', 'возбужд', 'влажн', 'сухость', 'желани', 'сексуальн'],
    'Хроническая болезнь': ['болеет', 'рак', 'диагноз', 'хроническ', 'болезн', 'лечен'],
    'Химическая зависимость': ['алкогол', 'наркотик', 'зависим', 'запой', 'кодирован', 'лечен'],
    'Принятие своего тела': ['ненавижу себя', 'урод', 'тело', 'внешност', 'не нравится', 'комплекс'],
    'Панические атаки': ['паник', 'атак', 'задыха', 'сердце', 'страшно умереть', 'тряс', 'накрывает', 'п а'],
    'Проблемы со сном': ['сон', 'сплю', 'бессонниц', 'кошмар', 'просыпаюсь', 'не могу уснуть', 'режим'],
    'Нехимическая зависимость': ['зависим', 'игр', 'интернет', 'соц сет', 'залипа', 'компьютер'],

    // --- КРИЗИСНЫЕ СИТУАЦИИ ---
    'Развод': ['развод', 'разрыв', 'бывший', 'бывшая', 'ушел', 'ушла'],
    'Потеря работы': ['увольн', 'сокращен', 'безработн', 'карьер'],
    'Горе и утрата': ['умер', 'смерть', 'похорон', 'потерял', 'горе', 'утрат'],
    'Насилие': ['бил', 'ударил', 'изнасило', 'домога', 'насили', 'абьюз', 'жертв'],
    'Страх смерти': ['страх смерти', 'боюсь умереть', 'смерт', 'конец', 'умира'],

    // --- РАБОТА И ЭФФЕКТИВНОСТЬ ---
    'Продуктивность в работе': ['продуктивн', 'работа', 'дела', 'задач', 'выполн'],
    'Прокрастинация': ['прокрастинаци', 'откладываю', 'лень', 'не могу начать', 'завтра'],
    'Финансовая эффективность': ['деньги', 'финанс', 'зарплат', 'доход', 'бюджет'],
    'Стресс и выгорание': ['стресс', 'выгоран', 'устал', 'истощени', 'нет сил'],
    'Баланс работы и жизни': ['баланс', 'работа жизнь', 'время', 'семья работа'],
    'Лидерство и управление': ['лидер', 'управлен', 'команд', 'руковод'],
    'Профессиональный рост': ['карьер', 'рост', 'развити', 'продвижен'],
    'Самоопределение': ['кто я', 'зачем', 'предназначени', 'путь', 'куда двигаться'],
    'Конфликты на работе': ['начальник', 'коллег', 'босс', 'офис', 'коллектив', 'подставили', 'конфликт'],
    'Отношения в коллективе': ['коллег', 'команд', 'отношен', 'общени', 'коллектив'],

    // --- ЭМОЦИОНАЛЬНЫЕ ТРУДНОСТИ ---
    'Плохое настроение': ['груст', 'тоск', 'печал', 'депрес', 'плохое настроен', 'ничего не радует', 'плач', 'уныни', 'апати', 'мрак', 'тяжело на душе'],
    'Мысли о суициде': ['жить', 'суицид', 'умереть', 'смерт', 'покончить', 'нет смысла', 'зачем я', 'петля', 'выпил'],
    'Рассеянность': ['забыл', 'теряю', 'память', 'голова дырявая', 'рассеян', 'невнимательн'],
    'Эмоциональное напряжение': ['напряжен', 'напряг', 'стресс', 'тревог', 'волнен'],
    'Страх и тревога': ['страх', 'боюсь', 'фоби', 'тревог', 'испуг', 'ужас', 'боязн', 'волнуюсь'],
    'Перепады настроения': ['качели', 'меняется настроение', 'то смеюсь то плачу', 'биполяр', 'срыв', 'истерик', 'нестабильн'],
    'Раздражительность': ['раздражаюсь', 'злюсь', 'агресси', 'вспылил', 'сорвался', 'наорал', 'не сдержался'],
    'Апатия': ['ничего не хоч', 'скучно', 'нет сил', 'все равно', 'безразлич', 'не получаю удовольстви', 'пресн', 'серо', 'ангедония'],

    // --- ПРОБЛЕМЫ В ОТНОШЕНИЯХ ---
    'Чувство одиночества': ['один', 'одино', 'никому не нуж', 'меня не понима', 'нет друзей', 'бросил', 'расста', 'изоляци'],
    'Трудности в общении': ['общ', 'людьм', 'разговор', 'стесняюсь', 'замкнут', 'социофоб', 'компани', 'друж'],
    'Отношения с детьми': ['дети', 'ребенок', 'сын', 'дочь', 'родител'],
    'Отношения в паре': ['муж', 'жена', 'партнер', 'отношен', 'пара', 'брак'],
    'Конфликты с близкими': ['ссор', 'руга', 'скандал', 'крич', 'драка', 'спор', 'обид', 'претензи', 'конфликт'],
    'Отношения в семье': ['мама', 'папа', 'родител', 'семь', 'семейн', 'свекровь', 'теща'],

    // --- ЛИЧНОСТНЫЙ РОСТ ---
    'Взросление и сепарация': ['взросл', 'сепарац', 'отделен', 'независим'],
    'Трудно принимать решения': ['решен', 'выбор', 'не могу решит', 'сомнен'],
    'Проблемы с самооценкой': ['самооценк', 'ненавижу себя', 'неудачник', 'ошибка', 'стыд', 'вина', 'хуже всех', 'критик'],
    'Творческое развитие': ['творчеств', 'креатив', 'развити', 'самореализац'],
    'Поиск себя и смысла жизни': ['кто я', 'зачем', 'предназначени', 'путь', 'потерял себя', 'куда двигаться', 'смысл'],
    'Личные границы': ['границ', 'не могу отказать', 'использую', 'манипуляц']
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
      return ['Поиск себя и смысла жизни'];
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

    // Фильтр по симптомам: маппим подписи UI → specializations из данных
    if (detectedSymptoms.length > 0) {
      const searchSpecializations = Array.from(
        new Set(detectedSymptoms.flatMap(symptomToSpecializations)),
      );
      filtered = filtered.filter((p) =>
        p.specializations.some((spec) => searchSpecializations.includes(spec)),
      );
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

    // Развилка по подписке: система знает тип подписки заранее, не спрашиваем пользователя
    const hasSubscription = resolveSubscription();

    if (hasSubscription) {
      // Платная подписка — продолжаем подбор психолога
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
          setStep("gender");
        }, 300);
      });
    } else {
      // Бесплатная подписка — рекомендуем контент вместо подбора психолога
      const selectedSymptoms = Object.values(selectedSymptomsByCategory).flat();
      const contentChips = getContentForSymptoms(selectedSymptoms);

      showBotTyping(() => {
        addMessage({
          type: "bot",
          content: "По вашей подписке доступна подборка материалов по вашей теме. Вот что может помочь:",
        });
        setTimeout(() => {
          addMessage({
            type: "bot",
            content: "",
            variant: "content_recommendation",
            chips: contentChips,
          });
          setStep("content_recommendation");
        }, 300);
      });
    }
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
    const { psychologists: recommended, detectedSymptoms } =
      getRecommendations(
        selectedSymptoms,
        selectedGender,
        selectedAges,
        userTextInput || undefined,
        methodForFilter || undefined
      );

    const displaySymptoms = detectedSymptoms ?? selectedSymptoms;

    const withDisplayTags: PsychologistWithDisplayTags[] = recommended.map((p) => ({
      ...p,
      displayTags:
        displaySymptoms.length > 0
          ? displaySymptoms.filter((symptom) =>
              symptomToSpecializations(symptom).some((spec) =>
                p.specializations.includes(spec),
              ),
            )
          : undefined,
    }));

    if (onShowResults) {
      onShowResults(withDisplayTags);
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
    const stepOrder: ChatStep[] = ["start", "category", "gender", "age", "method", "loading", "results", "content_recommendation"];
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
    'Здоровье и тело': [
      'Проблема с питанием и весом',
      'Сексуальное здоровье',
      'Хроническая болезнь',
      'Химическая зависимость',
      'Принятие своего тела',
      'Панические атаки',
      'Проблемы со сном',
      'Нехимическая зависимость'
    ],
    'Кризисные ситуации': [
      'Развод',
      'Потеря работы',
      'Горе и утрата',
      'Насилие',
      'Страх смерти'
    ],
    'Работа и эффективность': [
      'Продуктивность в работе',
      'Прокрастинация',
      'Финансовая эффективность',
      'Стресс и выгорание',
      'Баланс работы и жизни',
      'Лидерство и управление',
      'Профессиональный рост',
      'Самоопределение',
      'Конфликты на работе',
      'Отношения в коллективе'
    ],
    'Эмоциональные трудности': [
      'Плохое настроение',
      'Мысли о суициде',
      'Рассеянность',
      'Эмоциональное напряжение',
      'Страх и тревога',
      'Перепады настроения',
      'Раздражительность',
      'Апатия'
    ],
    'Проблемы в отношениях': [
      'Чувство одиночества',
      'Трудности в общении',
      'Отношения с детьми',
      'Отношения в паре',
      'Конфликты с близкими',
      'Отношения в семье'
    ],
    'Личностный рост': [
      'Взросление и сепарация',
      'Трудно принимать решения',
      'Проблемы с самооценкой',
      'Творческое развитие',
      'Поиск себя и смысла жизни',
      'Личные границы'
    ]
  };

  // Data
  const categoryOptions = [
    { label: "Здоровье и тело", value: "Здоровье и тело" },
    { label: "Кризисные ситуации", value: "Кризисные ситуации" },
    { label: "Работа и эффективность", value: "Работа и эффективность" },
    { label: "Эмоциональные трудности", value: "Эмоциональные трудности" },
    { label: "Проблемы в отношениях", value: "Проблемы в отношениях" },
    { label: "Личностный рост", value: "Личностный рост" },
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
    <div className="flex flex-col h-screen max-w-[440px] mx-auto bg-light-bg-secondary">
      {/* Header — визуально как в v3: фон, типографика, иконка закрытия */}
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
      <div className="bg-light-bg-secondary min-h-[72px] flex items-center shrink-0">
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

        {/* Кнопка "Выбрать другую тему" для шага рекомендации контента */}
        {step === "content_recommendation" && (
          <div className="w-full px-16 py-16">
            <Button
              onClick={() => {
                hasSubscriptionRef.current = null;
                setMessages((prev) => {
                  const welcome = prev.find((m) => m.id === "welcome");
                  return welcome ? [welcome] : prev;
                });
                setStep("category");
                setSelectedSymptomsByCategory({});
                setUserTextInput("");
                setInputValue("");
                setShowCustomInput(false);
              }}
              variant="secondary"
              size="l"
              fullWidth={true}
            >
              Выбрать другую тему
            </Button>
          </div>
        )}
      </div>

      {/* Фиксированный дисклеймер внизу (всегда на одном месте) */}
      <div className="bg-light-bg-secondary px-16 py-16 shrink-0">
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
