"use client";

import { AudioCardWeb } from "@/components/cards/audio-card-web";
import { PracticeCard } from "@/components/cards/practice-card";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-16 md:p-24">
        <div className="max-w-4xl mx-auto space-y-32">
          {/* Header */}
          <header className="flex items-center justify-between">
            <h1 className="text-title-xl md:text-title-xl font-bold text-light-fg-primary dark:text-dark-fg-primary">
              AudioCardWeb Demo
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-16 py-8 rounded-s bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-fg-primary dark:text-dark-fg-primary border border-light-border-primary dark:border-dark-border-primary"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </header>

          {/* Audio Cards */}
          <section className="space-y-24">
            <h2 className="text-title-l font-semibold text-light-fg-primary dark:text-dark-fg-primary">
              AudioCardWeb - Различные варианты
            </h2>

            {/* Card 1: С duration */}
            <div className="space-y-12">
              <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                С duration
              </h3>
                     <AudioCardWeb
                       title="Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет"
                       topBadge="Тэг"
                       duration="05:23"
                     />
            </div>

            {/* Card 2: Короткий заголовок */}
            <div className="space-y-12">
              <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                Короткий заголовок
              </h3>
              <AudioCardWeb
                title="Короткий заголовок"
                topBadge="Новое"
                duration="03:15"
                playState="play"
              />
            </div>

                   {/* Card 3: Кликабельная карточка */}
                   <div className="space-y-12">
                     <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                       Кликабельная карточка
                     </h3>
                     <AudioCardWeb
                       title="Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет"
                       topBadge="Популярное"
                       duration="12:45"
                       onClick={() => alert("Карточка кликнута!")}
                     />
                   </div>

            {/* Card 4: Длинный заголовок (для проверки обрезки) */}
            <div className="space-y-12">
              <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                Длинный заголовок (проверка обрезки после 2 строк)
              </h3>
              <AudioCardWeb
                title="Это очень длинный заголовок который должен быть обрезан после двух строк и показать многоточие если текст не помещается в две строки максимально"
                topBadge="Длинный"
                duration="99:99"
                playState="play"
              />
            </div>
          </section>

          {/* Responsive Demo */}
          <section className="space-y-24">
            <h2 className="text-title-l font-semibold text-light-fg-primary dark:text-dark-fg-primary">
              Адаптивность (измените ширину окна)
            </h2>
            <div className="space-y-12">
              <p className="text-body-m text-light-fg-secondary dark:text-dark-fg-secondary">
                На мобильных устройствах badge отображается сверху, на desktop - справа от заголовка
              </p>
              <AudioCardWeb
                title="Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет"
                topBadge="Адаптивный"
                duration="08:30"
                playState="play"
              />
            </div>
          </section>

          {/* PracticeCard Demo */}
          <section className="space-y-24">
            <h2 className="text-title-l font-semibold text-light-fg-primary dark:text-dark-fg-primary">
              PracticeCard - Горизонтальная карточка
            </h2>
            
            <div className="space-y-12">
              <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                Полный пример из Figma
              </h3>
              <PracticeCard
                subtitle="Практика"
                title="Как радоваться жизни каждый день"
                label="Помочь себе за 2 минуты"
                imageUrl="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=120&h=211&fit=crop&crop=face"
                imageAlt="Woman practicing meditation"
                duration="01:08"
                onClick={() => alert("PracticeCard кликнута!")}
              />
            </div>

            <div className="space-y-12">
              <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                Без изображения (fallback)
              </h3>
              <PracticeCard
                subtitle="Практика"
                title="Как радоваться жизни каждый день"
                label="Помочь себе за 2 минуты"
                duration="01:08"
              />
            </div>

            <div className="space-y-12">
              <h3 className="text-title-m font-medium text-light-fg-secondary dark:text-dark-fg-secondary">
                Без label и duration
              </h3>
              <PracticeCard
                subtitle="Практика"
                title="Как радоваться жизни каждый день"
                imageUrl="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=120&h=211&fit=crop&crop=face"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
