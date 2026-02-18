"use client";

import * as React from "react";
import { illustrationFilenames } from "./illustration-filenames";

/**
 * Типы иллюстраций согласно Figma компоненту _illustration
 */
export type IllustrationType =
  | "something-happened"
  | "time-slot"
  | "self-esteem"
  | "working-calmly"
  | "test"
  | "past"
  | "reactions"
  | "self-help"
  | "take-on-challenges"
  | "see-a-therapist"
  | "payment-completed"
  | "relax"
  | "aggression"
  | "self-knowledge"
  | "thanks-for-feedback"
  | "card-saved"
  | "self-care"
  | "therapist"
  | "payment-not-processed"
  | "emotions"
  | "enjoy-life-daily"
  | "want-to-grow"
  | "couch"
  | "meditation"
  | "player"
  | "burn-out"
  | "aggression-level"
  | "depression"
  | "type49"
  | "building"
  | "skills"
  | "heart"
  | "tree"
  | "battery"
  | "relax-meditation"
  | "clock"
  | "megaphone"
  | "stones"
  | "before-conversation"
  | "laptop-fire"
  | "overloaded"
  | "deep-relax"
  | "coffee-relax"
  | "sandclock"
  | "earphones"
  | "hugs-himself"
  | "puzzles"
  | "holding-sun"
  | "emotions-level-orange"
  | "question"
  | "thoughts"
  | "party"
  | "okay"
  | "phone"
  | "empty-search";

export interface IllustrationProps {
  /**
   * Тип иллюстрации согласно Figma компоненту _illustration
   */
  type: IllustrationType;
  /**
   * Ширина иллюстрации (в пикселях)
   * @default 200
   */
  width?: number;
  /**
   * Высота иллюстрации (в пикселях)
   * @default 200
   */
  height?: number;
  /**
   * Альтернативный текст для изображения
   */
  alt?: string;
  /**
   * Дополнительные CSS классы
   */
  className?: string;
  /**
   * Стили для контейнера
   */
  style?: React.CSSProperties;
}

/**
 * Компонент иллюстрации из Figma
 * Автоматически загружает изображения в правильном разрешении (1x или 2x) в зависимости от device pixel ratio
 */
export const Illustration: React.FC<IllustrationProps> = ({
  type,
  width = 200,
  height = 200,
  alt,
  className,
  style,
}) => {
  // Получаем реальное имя файла из маппинга (учитывает суффиксы для cropped изображений)
  const imageName = illustrationFilenames[type] || `${type}.png`;
  
  // Используем srcSet для автоматического выбора между 1x и 2x
  // Браузер автоматически выберет подходящее разрешение в зависимости от device pixel ratio
  const src1x = `/illustrations/1x/${imageName}`;
  const src2x = `/illustrations/2x/${imageName}`;

  // Изображения с большим количеством прозрачных областей требуют увеличенного масштаба
  const needsScaleUp = type === "stones" || type === "hugs-himself";
  const scale = needsScaleUp ? 1.3 : 1; // Увеличиваем на 30% для компенсации прозрачных областей

  return (
    <div
      className={className}
      style={{ 
        width, 
        height, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "visible",
        ...style 
      }}
    >
      <img
        src={src1x}
        srcSet={`${src1x} 1x, ${src2x} 2x`}
        alt={alt || `Illustration: ${type}`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};

Illustration.displayName = "Illustration";
