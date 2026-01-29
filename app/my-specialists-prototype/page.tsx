"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { MySpecialists, Specialist } from "@/components/my-specialists/MySpecialists";

// Моковые данные
const mockSpecialists: Specialist[] = [
  { id: "1", name: "Малафеевская Юлия Николаевна", profession: "Психолог", appointmentInfo: "Запись на сегодня с 22:00" },
  { id: "2", name: "Иванов Иван Иванович", profession: "Психолог", appointmentInfo: "Запись на завтра с 14:00" },
  { id: "3", name: "Петрова Анна Сергеевна", profession: "Психотерапевт", appointmentInfo: "Запись на послезавтра с 10:00" },
  { id: "4", name: "Сидоров Петр Александрович", profession: "Психолог", appointmentInfo: "Запись на сегодня с 18:00" },
];

export default function MySpecialistsPrototypePage() {
  // Инициализируем стейт, который потерялся в ошибке
  const [specialists, setSpecialists] = React.useState<Specialist[]>(mockSpecialists);

  const handleRemove = (id: string) => {
    setSpecialists((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCardClick = (id: string) => {
    console.log("Карточка кликнута:", id);
  };

  // Функция для быстрого сброса сценариев для тестов
  const resetToScenario = (count: number) => {
    setSpecialists(mockSpecialists.slice(0, count));
  };

  return (
    <div className="min-h-screen bg-gray-light p-16 md:p-24">
      <div className="max-w-[932px] mx-auto">
        <h1 className="text-title-xl font-bold text-light-fg-primary mb-16">
          Прототип: Мои специалисты
        </h1>
        
        {/* Кнопки управления для тестов */}
        <div className="flex gap-12 mb-24">
          <button onClick={() => resetToScenario(4)} className="px-12 py-4 bg-brand-orange text-white rounded-s">4 карточки</button>
          <button onClick={() => resetToScenario(2)} className="px-12 py-4 bg-brand-orange text-white rounded-s">2 карточки</button>
          <button onClick={() => resetToScenario(1)} className="px-12 py-4 bg-brand-orange text-white rounded-s">1 карточка</button>
        </div>

        <AnimatePresence mode="wait">
          {specialists.length > 0 && (
            <MySpecialists
              key="my-specialists-component"
              specialists={specialists}
              onRemove={handleRemove}
              onCardClick={handleCardClick}
            />
          )}
        </AnimatePresence>

        {/* Инструкции */}
        <div className="mt-32 bg-light-bg-tertiary rounded-s p-16">
          <ul className="list-disc list-inside space-y-8 text-body-m text-light-fg-secondary">
            <li>При удалении карточки остальные плавно сдвигаются</li>
            <li>Если удалить последнюю, весь блок исчезнет</li>
          </ul>
        </div>
      </div>
    </div>
  );
}