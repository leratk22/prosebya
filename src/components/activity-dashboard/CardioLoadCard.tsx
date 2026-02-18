"use client";

import * as React from "react";
import { Icon } from "@/components/icons/icon";

export interface CardioLoadCardProps {
  /**
   * Значение кардионагрузки
   */
  value: number;
  /**
   * Есть ли целевое значение
   */
  hasTarget?: boolean;
}

/**
 * Карточка Cardio Load
 * 
 * Отображает кардионагрузку с числовым индикатором и иконкой сердца
 */
export const CardioLoadCard: React.FC<CardioLoadCardProps> = ({ 
  value,
  hasTarget = false,
}) => {
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
            Cardio load
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
              {value}
            </span>
            <span 
              className="text-[12px]"
              style={{ 
                fontSize: '12px',
                color: TOKENS.colors.textSecondary
              }}
            >
              Today {hasTarget ? "• Target set" : "• No target"}
            </span>
          </div>
        </div>

        {/* Правая часть - иконка сердца */}
        <div className="ml-16 shrink-0">
          <div 
            className="w-48 h-48 rounded-full flex items-center justify-center"
            style={{ backgroundColor: TOKENS.colors.accentMuted }}
          >
            <Icon 
              name="heart" 
              size={16} 
              style={{ color: TOKENS.colors.accent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
