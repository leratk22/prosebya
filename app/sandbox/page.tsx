"use client";

import { AudioCardWeb } from "@/components/cards/audio-card-web";
import { HorizontalCardWeb } from "@/components/cards/horizontal-card-web";
import { PracticeCard } from "@/components/cards/practice-card";
import { useState } from "react";

export default function SandboxPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-light-bg-primary p-16 md:p-24">
      <div className="max-w-4xl mx-auto">
        {/* Переключатель темы */}
        <div className="mb-24 flex justify-end">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-16 py-8 rounded-s bg-light-bg-secondary hover:bg-light-bg-tertiary text-light-fg-primary border border-light-border-secondary transition-colors"
          >
            {isDarkMode ? "☀️ Светлая" : "🌙 Темная"}
          </button>
        </div>

        {/* Карточки с условным классом dark */}
        <div className={isDarkMode ? "dark" : ""}>
          <div className="flex flex-col gap-16">
            {/* PracticeCard с изображением */}
            <PracticeCard
              subtitle="Практика"
              title="Как радоваться жизни каждый день"
              label="Помочь себе за 2 минуты"
              imageUrl="/practice-images/practice-image-3x.png"
              imageAlt="Практика"
              duration="01:08"
              onClick={() => console.log("PracticeCard кликнута")}
            />

            {/* PracticeCard с заглушкой */}
            <PracticeCard
              subtitle="Практика"
              title="Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился"
              label="Описание в 1 строку в зависимости от типа контента (необязательно)"
              duration="05:23"
              onClick={() => console.log("PracticeCard с заглушкой кликнута")}
            />

            {/* HorizontalCardWeb */}
            <HorizontalCardWeb
              title="Заголовок максимум в 2 строки, далее обрезка в многоточие, если текст не уместился"
              description="Описание в 1 строку в зависимости от типа контента (необязательно)"
              badges={["Тэг", "Тэг"]}
              imageUrl="/horizontal-card-3x.png"
              imageAlt="Карточка"
              onClick={() => console.log("HorizontalCardWeb кликнута")}
            />

            {/* AudioCardWeb */}
            <AudioCardWeb
              title="Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет"
              topBadge="Тэг"
              duration="05:23"
              onClick={() => console.log("AudioCardWeb кликнута")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
