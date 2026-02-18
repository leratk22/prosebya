"use client";

import * as React from "react";
import { Icon } from "@/components/icons/icon";

export interface ActiveZoneMinCardProps {
  /**
   * Текущее значение минут в активной зоне
   */
  current: number;
  /**
   * Целевое значение минут в активной зоне
   */
  target: number;
}

/**
 * Карточка Active Zone Min
 * 
 * Отображает прогресс активной зоны с кольцевым прогресс-баром
 */
export const ActiveZoneMinCard: React.FC<ActiveZoneMinCardProps> = ({
  current,
  target,
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
      <div className="flex items-center justify-between">
        {/* Левая часть - текст и значение */}
        <div className="flex-1 min-w-0">
          <h3 
            className="mb-8 text-[16px] font-medium"
            style={{ 
              color: TOKENS.colors.textSecondary,
              fontSize: '16px',
              fontWeight: 500
            }}
          >
            Active Zone Min
          </h3>
          <div className="flex flex-col gap-4">
            <span 
              className="font-semibold leading-none"
              style={{ 
                fontSize: '48px',
                fontWeight: 600,
                color: TOKENS.colors.textPrimary
              }}
            >
              {current}
            </span>
            <span 
              className="text-[12px]"
              style={{ 
                fontSize: '12px',
                color: TOKENS.colors.textSecondary
              }}
            >
              Today
            </span>
          </div>
        </div>

        {/* Правая часть - кольцевой прогресс-бар */}
        <div className="ml-16 shrink-0 relative">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="transform -rotate-90"
          >
            {/* Фоновый круг */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={TOKENS.colors.accentMuted}
              strokeWidth="6"
              fill="none"
            />
            {/* Прогресс */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={TOKENS.colors.accent}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          </svg>
          {/* Центральная иконка - используем простой SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: TOKENS.colors.accent }}
            >
              <path 
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
