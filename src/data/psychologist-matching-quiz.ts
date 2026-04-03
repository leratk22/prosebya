/**
 * Константы квиза подбора психолога (макет «Подбор психолога», мобильная версия).
 */

export const GENDER_OPTIONS = [
  { id: "female", label: "С женщиной" },
  { id: "male", label: "С мужчиной" },
  { id: "any", label: "Не важно" },
] as const;

export type GenderId = (typeof GENDER_OPTIONS)[number]["id"];

export const AGE_OPTIONS = [
  { id: "under25", label: "До 25" },
  { id: "25_34", label: "25-34" },
  { id: "35_44", label: "35-44" },
  { id: "45_54", label: "45-54" },
  { id: "55plus", label: "55+" },
  { id: "any", label: "Любой" },
] as const;

export type AgeId = (typeof AGE_OPTIONS)[number]["id"];

export const THERAPY_METHODS = [
  "Психоаналитическая терапия",
  "КПТ",
  "Экзистенциальная психотерапия",
  "Психодрама",
  "Транзактный анализ",
  "Понимающая психотерапия",
  "Юнгианский анализ",
  "Позитивная психотерапия",
  "Нарративный подход",
  "Системная семейная психотерапия",
  "Гуманистические направления",
  "EMDR (ДПДГ)",
  "Эмоционально-фокусированная терапия",
  "Схема-терапия",
  "ЛОРП",
  "ОРКТ",
  "РЭПТ",
  "АСТ",
  "Коучинг",
  "Медиация",
] as const;

export type TherapyMethod = (typeof THERAPY_METHODS)[number];

export const QUIZ_TOTAL_STEPS = 3;
