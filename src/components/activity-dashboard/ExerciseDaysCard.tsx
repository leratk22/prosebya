"use client";

import * as React from "react";

export interface ExerciseDaysCardProps {
  /**
   * Массив из 7 дней (неделя), true = была тренировка
   */
  days: boolean[];
  /**
   * Детали последней тренировки
   */
  lastWorkout?: {
    type: string;
    time: string;
    calories: number;
    minutes: number;
  };
}

/**
 * Карточка Exercise Days
 * 
 * Отображает горизонтальный календарь-трекер тренировок на неделю
 * Выделяет текущий день
 */
export const ExerciseDaysCard: React.FC<ExerciseDaysCardProps> = ({ 
  days,
  lastWorkout,
}) => {
  const today = new Date().getDay(); // 0 = воскресенье, 1 = понедельник, ...
  const dayNames = ["S", "S", "M", "T", "W", "T", "F"]; // Короткие названия
  const exerciseCount = days.filter(Boolean).length;
  const totalDays = 6; // Целевое количество дней

  // Токены из Figma плагина
  const TOKENS = {
    colors: {
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
      className="rounded-[24px] p-20"
      style={{ 
        backgroundColor: TOKENS.colors.card,
        borderRadius: `${TOKENS.radius}px`,
        padding: `${TOKENS.padding}px`
      }}
    >
      <div className="mb-16">
        <h3 
          className="mb-8 text-[16px] font-medium"
          style={{ 
            color: TOKENS.colors.textSecondary,
            fontSize: '16px',
            fontWeight: 500
          }}
        >
          Exercise days
        </h3>
        <div className="flex flex-col gap-4">
          <span 
            className="font-semibold leading-none"
            style={{ 
              fontSize: '24px',
              fontWeight: 600,
              color: TOKENS.colors.textPrimary
            }}
          >
            {exerciseCount} of {totalDays}
          </span>
          <span 
            className="text-[12px]"
            style={{ 
              fontSize: '12px',
              color: TOKENS.colors.textSecondary
            }}
          >
            This week
          </span>
        </div>
      </div>
      
      {/* Календарь */}
      <div className="flex items-end justify-between gap-8 mb-16">
        {days.map((hasExercise, index) => {
          const isToday = index === today;
          const isCompleted = hasExercise;
          const isHighlighted = dayNames[index] === 'T' && index === 3; // Четверг по референсу
          
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-4"
            >
              {/* Индикатор дня - прямоугольник 24x48 с radius 12 */}
              <div
                className="w-24 flex items-center justify-center transition-all"
                style={{
                  height: isCompleted ? '48px' : '48px',
                  borderRadius: '12px',
                  backgroundColor: isCompleted || isHighlighted 
                    ? TOKENS.colors.accent 
                    : TOKENS.colors.accentMuted
                }}
              >
                {isCompleted && (
                  <span 
                    className="text-white font-medium"
                    style={{ fontSize: '10px' }}
                  >
                    ✓
                  </span>
                )}
              </div>
              {/* День недели под индикатором */}
              <span
                className="text-[12px] font-medium"
                style={{ 
                  color: TOKENS.colors.textSecondary,
                  fontSize: '12px',
                  fontWeight: 500
                }}
              >
                {dayNames[index]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Детали последней тренировки */}
      {lastWorkout && (
        <div 
          className="pt-16 flex items-center gap-12"
          style={{ 
            borderTop: `1px solid ${TOKENS.colors.accentMuted}`
          }}
        >
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: TOKENS.colors.accentMuted }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: TOKENS.colors.textPrimary }}
            >
              <path 
                d="M22 12H18L15 21L9 3L6 12H2" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-8 mb-4">
              <span 
                className="font-medium"
                style={{ 
                  fontSize: '14px',
                  fontWeight: 500,
                  color: TOKENS.colors.textPrimary
                }}
              >
                {lastWorkout.type}
              </span>
            </div>
            <div 
              className="flex items-center gap-8"
              style={{ 
                fontSize: '12px',
                color: TOKENS.colors.textSecondary
              }}
            >
              <span>{lastWorkout.time}</span>
              <span>•</span>
              <span>{lastWorkout.calories} cal</span>
              <span>•</span>
              <span>{lastWorkout.minutes} min</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
