"use client";

import * as React from "react";
import { CardioLoadCard } from "./CardioLoadCard";
import { ExerciseDaysCard } from "./ExerciseDaysCard";
import { ActiveZoneMinCard } from "./ActiveZoneMinCard";
import { Icon } from "@/components/icons/icon";

export interface ActivityDashboardProps {
  /**
   * Значение кардионагрузки
   */
  cardioLoad?: number;
  /**
   * Есть ли целевое значение для кардионагрузки
   */
  cardioLoadHasTarget?: boolean;
  /**
   * Данные для календаря тренировок (массив из 7 дней, true = тренировка была)
   */
  exerciseDays?: boolean[];
  /**
   * Детали последней тренировки
   */
  lastWorkout?: {
    type: string;
    time: string;
    calories: number;
    minutes: number;
  };
  /**
   * Минуты в активной зоне
   */
  activeZoneMinutes?: number;
  /**
   * Целевое значение минут в активной зоне
   */
  activeZoneTarget?: number;
}

/**
 * Компонент Activity Dashboard
 * 
 * Экран активности с карточками:
 * - Cardio load - кардионагрузка с иконкой сердца
 * - Exercise days - календарь тренировок
 * - Active Zone Min - прогресс активной зоны
 */
export const ActivityDashboard: React.FC<ActivityDashboardProps> = ({
  cardioLoad = 0,
  cardioLoadHasTarget = false,
  exerciseDays = [false, false, false, false, false, false, false],
  lastWorkout,
  activeZoneMinutes = 0,
  activeZoneTarget = 150,
}) => {
  // Токены из Figma плагина
  const TOKENS = {
    colors: {
      bg: "#F6F7F2",
      card: "#FFFFFF",
      accent: "#007A7A",
      accentMuted: "#D6EBEB",
      textPrimary: "#1A1C1E",
      textSecondary: "#6C727A"
    },
    radius: 24,
    padding: 20
  };

  return (
    <div 
      className="w-full max-w-[393px] mx-auto px-16 py-16 font-euclid"
      style={{ backgroundColor: TOKENS.colors.bg, minHeight: '100vh' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-24">
        <button
          className="w-40 h-40 rounded-full flex items-center justify-center transition-colors"
          aria-label="Назад"
          style={{ backgroundColor: 'transparent' }}
        >
          <Icon name="arrow-left" size={16} style={{ color: TOKENS.colors.textPrimary }} />
        </button>
        <h1 
          className="flex-1 text-center font-semibold"
          style={{ 
            fontSize: '18px',
            fontWeight: 600,
            color: TOKENS.colors.textPrimary
          }}
        >
          Today
        </h1>
        <button
          className="w-40 h-40 rounded-full flex items-center justify-center transition-colors"
          aria-label="Редактировать"
          style={{ backgroundColor: 'transparent' }}
        >
          <Icon name="edit" size={16} style={{ color: TOKENS.colors.textPrimary }} />
        </button>
      </header>

      {/* Activity Section */}
      <section className="space-y-16">
        <h2 
          className="mb-16 font-semibold"
          style={{ 
            fontSize: '20px',
            fontWeight: 600,
            color: TOKENS.colors.textPrimary
          }}
        >
          Activity
        </h2>
        
        <div className="space-y-16">
          {/* Cardio Load Card */}
          <CardioLoadCard value={cardioLoad} hasTarget={cardioLoadHasTarget} />

          {/* Exercise Days Card */}
          <ExerciseDaysCard days={exerciseDays} lastWorkout={lastWorkout} />

          {/* Active Zone Min Card */}
          <ActiveZoneMinCard 
            current={activeZoneMinutes} 
            target={activeZoneTarget} 
          />
        </div>
      </section>
    </div>
  );
};
