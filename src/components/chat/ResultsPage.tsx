"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Psychologist } from "@/data/psychologists";
import { PsychologistCard } from "./PsychologistCard";
import { Button } from "@/components/ui/button";

export type PsychologistForResults = Psychologist & { displayTags?: string[] };

export interface ResultsPageProps {
  psychologists: PsychologistForResults[];
  onBack?: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  psychologists,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full min-h-screen max-w-[440px] mx-auto bg-light-bg-secondary"
    >
      {/* Header — по Figma: appbar 56px, заголовок по центру 16px SemiBold */}
      <header className="flex items-center justify-between h-56 shrink-0 bg-light-bg-secondary">
        <button
          type="button"
          onClick={onBack}
          className="p-16 shrink-0 flex items-center justify-center text-core"
          aria-label="Назад"
        >
          <ChevronLeft className="w-24 h-24" strokeWidth={2} />
        </button>
        <h1 className="text-16 font-semibold text-core leading-[24px] text-center flex-1">
          Подходящие специалисты
        </h1>
        <button
          type="button"
          className="p-16 shrink-0 flex items-center justify-center text-core"
          aria-label="Настройки"
        >
          <MoreVertical className="w-24 h-24" strokeWidth={2} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-16 pt-16 pb-32">
        <div className="flex flex-col gap-24">
          <section className="flex flex-col gap-16">
            <h2 className="text-24 font-semibold text-core leading-[32px] tracking-[-0.36px]">
              Психолог
            </h2>
            <div className="flex flex-col gap-16">
              {psychologists.map((psychologist) => (
                <PsychologistCard
                  key={psychologist.id}
                  name={psychologist.name}
                  specialization={psychologist.methods.join(", ")}
                  experience={`Стаж ${psychologist.experience} ${psychologist.experience === 1 ? "год" : psychologist.experience < 5 ? "года" : "лет"}`}
                  rating={psychologist.rating}
                  price={`от ${psychologist.price.toLocaleString("ru-RU")} ₽`}
                  tags={
                    psychologist.displayTags?.length
                      ? psychologist.displayTags
                      : psychologist.specializations.slice(0, 6)
                  }
                  imageUrl={psychologist.photo}
                />
              ))}
            </div>
          </section>

          {/* Guide Banner — без фона, в тон экрана */}
          <div className="flex flex-col items-center gap-16 px-16 py-24">
            <p className="text-16 font-medium text-core text-center leading-[24px]">
              Никто не подходит? Запишитесь на гайд-сессию, поможем найти своего специалиста
            </p>
            <Button variant="secondary" size="l" fullWidth>
              Подробнее
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
