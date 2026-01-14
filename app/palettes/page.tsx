"use client";

import { useState } from "react";

// Типы для организации палитр
type ColorGroup = {
  name: string;
  colors: { name: string; value: string; description?: string }[];
};

const colorPalettes: ColorGroup[] = [
  {
    name: "Brand (Брендовые цвета)",
    colors: [
      { name: "brand-orange", value: "#ffb800", description: "Основной цвет бренда" },
      { name: "brand-orange-hover", value: "#f6a300", description: "Hover состояние" },
      { name: "brand-orange-muted", value: "#f9f5ec", description: "Приглушенный" },
      { name: "brand-orange-overlay-70", value: "rgba(255, 184, 0, 0.6)", description: "Оверлей 70%" },
      { name: "brand-orange-overlay-30", value: "rgba(255, 184, 0, 0.3)", description: "Оверлей 30%" },
      { name: "brand-blue", value: "#344079", description: "Вспомогательный цвет" },
      { name: "brand-blue-alpha-70", value: "rgba(52, 64, 121, 0.7)", description: "Альфа 70%" },
      { name: "brand-blue-alpha-20", value: "rgba(52, 64, 121, 0.2)", description: "Альфа 20%" },
      { name: "brand-blue-alpha-10", value: "rgba(52, 64, 121, 0.1)", description: "Альфа 10%" },
    ],
  },
  {
    name: "Core (Основные цвета)",
    colors: [
      { name: "core", value: "#22263b", description: "Основной темный цвет" },
      { name: "core-alpha-80", value: "rgba(34, 38, 59, 0.8)", description: "Альфа 80%" },
      { name: "core-alpha-60", value: "rgba(34, 38, 59, 0.6)", description: "Альфа 60%" },
      { name: "core-alpha-40", value: "rgba(34, 38, 59, 0.4)", description: "Альфа 40%" },
      { name: "core-alpha-20", value: "rgba(34, 38, 59, 0.2)", description: "Альфа 20%" },
      { name: "core-alpha-10", value: "rgba(34, 38, 59, 0.1)", description: "Альфа 10%" },
      { name: "core-alpha-5", value: "rgba(34, 38, 59, 0.05)", description: "Альфа 5%" },
    ],
  },
  {
    name: "Core Inverted (Инвертированные основные цвета)",
    colors: [
      { name: "core-inverted", value: "#ffffff", description: "Инвертированный основной" },
      { name: "core-inverted-alpha-80", value: "rgba(255, 255, 255, 0.8)", description: "Альфа 80%" },
      { name: "core-inverted-alpha-60", value: "rgba(255, 255, 255, 0.6)", description: "Альфа 60%" },
      { name: "core-inverted-alpha-40", value: "rgba(255, 255, 255, 0.4)", description: "Альфа 40%" },
      { name: "core-inverted-alpha-20", value: "rgba(255, 255, 255, 0.2)", description: "Альфа 20%" },
      { name: "core-inverted-alpha-10", value: "rgba(255, 255, 255, 0.1)", description: "Альфа 10%" },
      { name: "core-inverted-alpha-5", value: "rgba(255, 255, 255, 0.05)", description: "Альфа 5%" },
    ],
  },
  {
    name: "Gray (Серые цвета)",
    colors: [
      { name: "gray-core", value: "#eaeff8", description: "Основной серый" },
      { name: "gray-light", value: "#f4f6fa", description: "Светлый серый" },
      { name: "gray-muted", value: "#e7e9ed", description: "Приглушенный серый" },
      { name: "gray-dark", value: "#9199ba", description: "Темный серый" },
    ],
  },
  {
    name: "System (Системные цвета)",
    colors: [
      { name: "system-black", value: "#000000", description: "Черный" },
      { name: "system-white", value: "#ffffff", description: "Белый" },
    ],
  },
  {
    name: "Feedback (Цвета обратной связи)",
    colors: [
      { name: "feedback-positive", value: "#759f45", description: "Положительный" },
      { name: "feedback-positive-neon", value: "#3ccba9", description: "Положительный неоновый" },
      { name: "feedback-positive-overlay", value: "rgba(117, 159, 69, 0.05)", description: "Положительный оверлей" },
      { name: "feedback-negative", value: "#f15d56", description: "Отрицательный" },
      { name: "feedback-negative-neon", value: "#f1567b", description: "Отрицательный неоновый" },
      { name: "feedback-negative-overlay", value: "rgba(241, 93, 86, 0.05)", description: "Отрицательный оверлей" },
      { name: "feedback-warning", value: "#ffd452", description: "Предупреждение" },
      { name: "feedback-warning-neon", value: "#ffdc52", description: "Предупреждение неоновое" },
      { name: "feedback-warning-overlay", value: "rgba(255, 212, 82, 0.05)", description: "Предупреждение оверлей" },
    ],
  },
];

const semanticPalettes: { theme: "light" | "dark"; groups: ColorGroup[] }[] = [
  {
    theme: "light",
    groups: [
      {
        name: "Light BG (Фоны)",
        colors: [
          { name: "light-bg-primary", value: "#ffffff" },
          { name: "light-bg-secondary", value: "#eaeff8" },
          { name: "light-bg-tertiary", value: "#f4f6fa" },
          { name: "light-bg-disabled", value: "#e7e9ed" },
          { name: "light-bg-dark", value: "#9199ba" },
          { name: "light-bg-accent-overlay", value: "rgba(52, 64, 121, 0.1)" },
          { name: "light-bg-accent", value: "#344079" },
          { name: "light-bg-pressed", value: "rgba(34, 38, 59, 0.05)" },
          { name: "light-bg-overlay-dark", value: "rgba(34, 38, 59, 0.05)" },
          { name: "light-bg-overlay-full", value: "rgba(34, 38, 59, 0.8)" },
          { name: "light-bg-overlay-video", value: "rgba(34, 38, 59, 0.6)" },
          { name: "light-bg-overlay-light", value: "rgba(255, 255, 255, 0.1)" },
          { name: "light-bg-action", value: "#ffb800" },
          { name: "light-bg-button-pressed", value: "#f6a300" },
          { name: "light-bg-accent-brand", value: "#ffb800" },
          { name: "light-bg-accent-content", value: "#f9f5ec" },
        ],
      },
      {
        name: "Light FG (Текст и иконки)",
        colors: [
          { name: "light-fg-primary", value: "#22263b" },
          { name: "light-fg-secondary", value: "rgba(34, 38, 59, 0.8)" },
          { name: "light-fg-tertiary", value: "rgba(34, 38, 59, 0.6)" },
          { name: "light-fg-muted", value: "rgba(34, 38, 59, 0.4)" },
          { name: "light-fg-accent", value: "#344079" },
          { name: "light-fg-accent-muted", value: "rgba(52, 64, 121, 0.7)" },
          { name: "light-fg-inverted-primary", value: "#ffffff" },
          { name: "light-fg-inverted-secondary", value: "rgba(255, 255, 255, 0.8)" },
          { name: "light-fg-inverted-tertiary", value: "rgba(255, 255, 255, 0.6)" },
          { name: "light-fg-inverted-muted", value: "rgba(255, 255, 255, 0.4)" },
        ],
      },
      {
        name: "Light Border (Границы)",
        colors: [
          { name: "light-border-positive", value: "#759f45" },
          { name: "light-border-warning", value: "#ffd452" },
          { name: "light-border-negative", value: "#f15d56" },
          { name: "light-border-button-secondary", value: "rgba(52, 64, 121, 0.2)" },
          { name: "light-border-button-secondary-inverted", value: "rgba(255, 255, 255, 0.2)" },
          { name: "light-border-disabled", value: "rgba(34, 38, 59, 0.1)" },
          { name: "light-border-primary", value: "rgba(34, 38, 59, 0.2)" },
          { name: "light-border-secondary", value: "rgba(34, 38, 59, 0.1)" },
          { name: "light-border-inverted-primary", value: "rgba(255, 255, 255, 0.1)" },
          { name: "light-border-accent", value: "#344079" },
          { name: "light-border-button-tertiary", value: "rgba(52, 64, 121, 0.1)" },
        ],
      },
    ],
  },
  {
    theme: "dark",
    groups: [
      {
        name: "Dark BG (Фоны)",
        colors: [
          { name: "dark-bg-primary", value: "#22263b" },
          { name: "dark-bg-secondary", value: "#eaeff8" },
          { name: "dark-bg-tertiary", value: "#f4f6fa" },
          { name: "dark-bg-disabled", value: "#e7e9ed" },
          { name: "dark-bg-dark", value: "#9199ba" },
          { name: "dark-bg-accent-overlay", value: "rgba(52, 64, 121, 0.1)" },
          { name: "dark-bg-accent", value: "#344079" },
          { name: "dark-bg-pressed", value: "rgba(255, 255, 255, 0.05)" },
          { name: "dark-bg-overlay-dark", value: "rgba(34, 38, 59, 0.05)" },
          { name: "dark-bg-overlay-full", value: "rgba(34, 38, 59, 0.8)" },
          { name: "dark-bg-overlay-video", value: "rgba(34, 38, 59, 0.6)" },
          { name: "dark-bg-overlay-light", value: "rgba(255, 255, 255, 0.1)" },
          { name: "dark-bg-action", value: "#ffb800" },
          { name: "dark-bg-button-pressed", value: "#f6a300" },
          { name: "dark-bg-accent-brand", value: "#ffb800" },
          { name: "dark-bg-accent-content", value: "#f9f5ec" },
        ],
      },
      {
        name: "Dark FG (Текст и иконки)",
        colors: [
          { name: "dark-fg-primary", value: "#ffffff" },
          { name: "dark-fg-secondary", value: "rgba(255, 255, 255, 0.8)" },
          { name: "dark-fg-tertiary", value: "rgba(255, 255, 255, 0.6)" },
          { name: "dark-fg-muted", value: "rgba(255, 255, 255, 0.4)" },
          { name: "dark-fg-accent", value: "#344079" },
          { name: "dark-fg-accent-muted", value: "rgba(52, 64, 121, 0.7)" },
          { name: "dark-fg-inverted-primary", value: "#22263b" },
          { name: "dark-fg-inverted-secondary", value: "rgba(34, 38, 59, 0.8)" },
          { name: "dark-fg-inverted-tertiary", value: "rgba(34, 38, 59, 0.6)" },
          { name: "dark-fg-inverted-muted", value: "rgba(34, 38, 59, 0.4)" },
        ],
      },
      {
        name: "Dark Border (Границы)",
        colors: [
          { name: "dark-border-positive", value: "#759f45" },
          { name: "dark-border-warning", value: "#ffd452" },
          { name: "dark-border-negative", value: "#f15d56" },
          { name: "dark-border-button-secondary", value: "rgba(255, 255, 255, 0.2)" },
          { name: "dark-border-button-secondary-inverted", value: "rgba(34, 38, 59, 0.2)" },
          { name: "dark-border-disabled", value: "rgba(255, 255, 255, 0.1)" },
          { name: "dark-border-primary", value: "rgba(34, 38, 59, 0.2)" },
          { name: "dark-border-secondary", value: "rgba(34, 38, 59, 0.1)" },
          { name: "dark-border-inverted-primary", value: "rgba(34, 38, 59, 0.1)" },
          { name: "dark-border-accent", value: "#344079" },
          { name: "dark-border-button-tertiary", value: "rgba(255, 255, 255, 0.1)" },
        ],
      },
    ],
  },
];

function ColorCard({ name, value, description }: { name: string; value: string; description?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLight = (color: string): boolean => {
    // Простая проверка для hex цветов
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128;
    }
    // Для rgba - проверяем альфа канал и базовый цвет
    if (color.startsWith("rgba")) {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
      }
    }
    return false;
  };

  const textColor = isLight(value) ? "text-core" : "text-core-inverted";

  return (
    <div
      className="rounded-s p-16 border border-light-border-secondary dark:border-dark-border-secondary bg-light-bg-secondary dark:bg-dark-bg-secondary hover:border-light-border-primary dark:hover:border-dark-border-primary transition-colors cursor-pointer"
      onClick={handleCopy}
      style={{ backgroundColor: value }}
    >
      <div className={`${textColor} font-medium text-label-m mb-4`}>{name}</div>
      <div className={`${textColor} text-label-s mb-2 font-mono`}>{value}</div>
      {description && (
        <div className={`${textColor} text-label-xs opacity-80`}>{description}</div>
      )}
      {copied && (
        <div className={`${textColor} text-label-xs mt-4 font-medium`}>✓ Скопировано!</div>
      )}
    </div>
  );
}

export default function PalettesPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-16 md:p-24">
        <div className="max-w-7xl mx-auto space-y-48">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-title-xl md:text-title-xl font-bold text-light-fg-primary dark:text-dark-fg-primary mb-8">
                Цветовые палитры
              </h1>
              <p className="text-body-m text-light-fg-secondary dark:text-dark-fg-secondary">
                Кликните на цвет, чтобы скопировать его значение
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-16 py-8 rounded-s bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-fg-primary dark:text-dark-fg-primary border border-light-border-primary dark:border-dark-border-primary hover:bg-light-bg-pressed dark:hover:bg-dark-bg-pressed transition-colors"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </header>

          {/* Примитивные палитры */}
          <section className="space-y-32">
            <h2 className="text-title-l font-semibold text-light-fg-primary dark:text-dark-fg-primary">
              Примитивные токены (Primitives)
            </h2>
            {colorPalettes.map((group) => (
              <div key={group.name} className="space-y-16">
                <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                  {group.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                  {group.colors.map((color) => (
                    <ColorCard
                      key={color.name}
                      name={color.name}
                      value={color.value}
                      description={color.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Семантические палитры */}
          <section className="space-y-32">
            <h2 className="text-title-l font-semibold text-light-fg-primary dark:text-dark-fg-primary">
              Семантические токены
            </h2>
            {semanticPalettes.map(({ theme, groups }) => (
              <div key={theme} className="space-y-32">
                <h3 className="text-title-m font-semibold text-light-fg-primary dark:text-dark-fg-primary capitalize">
                  {theme === "light" ? "Светлая тема (Light Theme)" : "Темная тема (Dark Theme)"}
                </h3>
                {groups.map((group) => (
                  <div key={group.name} className="space-y-16">
                    <h4 className="text-title-s font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                      {group.name}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                      {group.colors.map((color) => (
                        <ColorCard
                          key={color.name}
                          name={color.name}
                          value={color.value}
                          description={color.description}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
