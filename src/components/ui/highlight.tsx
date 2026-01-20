"use client";

import * as React from "react";

export type HighlightVariant = "default" | "inverted";

export interface HighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Вариант highlight компонента согласно Figma: Type = Default / Inverted
   * - default: для светлого фона (темные векторы и текст)
   * - inverted: для темного фона (белые векторы и текст)
   */
  variant?: HighlightVariant;
  /**
   * Текст для highlight компонента
   * Если компонент не умещается в контейнер, текст будет обрезан без многоточия
   */
  children: React.ReactNode;
}

/**
 * Компонент Highlight
 * 
 * Декоративный компонент для выделения текста:
 * - Два декоративных вектора по бокам
 * - Текст в центре в стиле MVP2.0/Caption/S
 * - Два варианта: Default (для светлого фона) и Inverted (для темного фона)
 * - Layout: row, justifyContent: flex-end, alignItems: center, gap: 8px
 * 
 * @figma https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
 * Замените {fileKey}, {fileName} и {nodeId} на соответствующие значения из Figma
 */
export const Highlight = React.forwardRef<HTMLDivElement, HighlightProps>(
  (
    {
      variant = "inverted",
      children,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Цвета для варианта default (светлый фон)
    const defaultVectorColor = "rgba(34, 38, 59, 0.4)"; // core с прозрачностью 0.4
    const defaultTextColor = "rgba(34, 38, 59, 0.8)"; // core с прозрачностью 0.8

    // Цвета для варианта inverted (темный фон)
    const invertedVectorColor = "rgba(255, 255, 255, 0.4)"; // белый с прозрачностью 0.4
    const invertedTextColor = "rgba(255, 255, 255, 0.8)"; // белый с прозрачностью 0.8

    const vectorColor = variant === "default" ? defaultVectorColor : invertedVectorColor;
    const textColor = variant === "default" ? defaultTextColor : invertedTextColor;

    const baseClasses = [
      "relative",
      "inline-flex flex-row items-center justify-end", // row, justifyContent: flex-end, alignItems: center
      "gap-8", // gap: 8px
      "font-euclid",
      "max-w-full", // ограничивается родительским контейнером
      "min-w-0", // позволяет сжиматься меньше минимального размера контента
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={baseClasses} {...rest}>
        {/* Левый вектор */}
        <svg
          width="9.39"
          height="20"
          viewBox="0 0 10 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
          style={{
            width: "9.39px",
            height: "20px",
          }}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.9043 15.365C7.93332 15.3632 7.96234 15.3622 7.99135 15.3622C8.36481 15.3622 8.72422 15.511 8.98817 15.7778C9.27271 16.0651 9.41965 16.462 9.39158 16.8654C9.26615 18.6288 7.99697 19.8877 6.23265 19.9972C6.20363 19.9991 6.17462 20 6.1456 20C5.77214 20 5.41273 19.8512 5.14878 19.5844C4.86425 19.2971 4.7173 18.9002 4.74538 18.4968C4.8708 16.7334 6.13998 15.4745 7.9043 15.365Z"
            fill={vectorColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.762771 12.5571C1.41234 11.9833 2.18546 11.6801 2.99695 11.6801C3.79909 11.6801 4.56472 11.9768 5.21054 12.5384C5.51661 12.8042 5.69257 13.1889 5.69444 13.5932C5.69632 13.9985 5.52316 14.3841 5.2199 14.6518C4.57033 15.2256 3.79815 15.5288 2.98666 15.5288C2.18452 15.5288 1.41889 15.2321 0.77213 14.6705C0.466065 14.4047 0.290101 14.02 0.288229 13.6157C0.286357 13.2104 0.459513 12.8248 0.762771 12.5571Z"
            fill={vectorColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.424897 5.70573C0.687907 5.45021 1.03984 5.30794 1.40393 5.30794C1.44137 5.30794 1.47881 5.30887 1.51625 5.31262C3.29274 5.45395 4.54976 6.7456 4.64429 8.52583C4.66488 8.93018 4.51138 9.32329 4.22123 9.60595C3.95822 9.86147 3.60629 10.0037 3.24219 10.0037C3.20475 10.0037 3.16732 10.0019 3.12988 9.99906C1.35339 9.8568 0.0963684 8.56608 0.00183449 6.78585C-0.0187571 6.38151 0.134744 5.98839 0.424897 5.70573Z"
            fill={vectorColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.37098 0.474541C4.63774 0.173156 5.02149 0 5.42396 0H5.42958C5.83392 0.00187196 6.21861 0.177836 6.48443 0.484837C7.67125 1.85137 7.66376 3.68214 6.46571 5.03931C6.19895 5.3407 5.8152 5.51385 5.41273 5.51385H5.40711C5.00183 5.51198 4.61808 5.33602 4.35226 5.02995C3.16544 3.66342 3.17293 1.83265 4.37098 0.474541Z"
            fill={vectorColor}
          />
        </svg>
        {/* Текст */}
        <span
          className="font-medium uppercase min-w-0 flex-shrink"
          style={{
            fontSize: "12px",
            lineHeight: "1.3333333333333333em",
            letterSpacing: "0.1em", // 10%
            color: textColor,
            textOverflow: "clip", // обрезка без многоточия
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </span>
        {/* Правый вектор (зеркально развернут) */}
        <svg
          width="9.39"
          height="20"
          viewBox="0 0 10 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
          style={{
            width: "9.39px",
            height: "20px",
            transform: "scaleX(-1)", // зеркальное отражение
          }}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.9043 15.365C7.93332 15.3632 7.96234 15.3622 7.99135 15.3622C8.36481 15.3622 8.72422 15.511 8.98817 15.7778C9.27271 16.0651 9.41965 16.462 9.39158 16.8654C9.26615 18.6288 7.99697 19.8877 6.23265 19.9972C6.20363 19.9991 6.17462 20 6.1456 20C5.77214 20 5.41273 19.8512 5.14878 19.5844C4.86425 19.2971 4.7173 18.9002 4.74538 18.4968C4.8708 16.7334 6.13998 15.4745 7.9043 15.365Z"
            fill={vectorColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.762771 12.5571C1.41234 11.9833 2.18546 11.6801 2.99695 11.6801C3.79909 11.6801 4.56472 11.9768 5.21054 12.5384C5.51661 12.8042 5.69257 13.1889 5.69444 13.5932C5.69632 13.9985 5.52316 14.3841 5.2199 14.6518C4.57033 15.2256 3.79815 15.5288 2.98666 15.5288C2.18452 15.5288 1.41889 15.2321 0.77213 14.6705C0.466065 14.4047 0.290101 14.02 0.288229 13.6157C0.286357 13.2104 0.459513 12.8248 0.762771 12.5571Z"
            fill={vectorColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.424897 5.70573C0.687907 5.45021 1.03984 5.30794 1.40393 5.30794C1.44137 5.30794 1.47881 5.30887 1.51625 5.31262C3.29274 5.45395 4.54976 6.7456 4.64429 8.52583C4.66488 8.93018 4.51138 9.32329 4.22123 9.60595C3.95822 9.86147 3.60629 10.0037 3.24219 10.0037C3.20475 10.0037 3.16732 10.0019 3.12988 9.99906C1.35339 9.8568 0.0963684 8.56608 0.00183449 6.78585C-0.0187571 6.38151 0.134744 5.98839 0.424897 5.70573Z"
            fill={vectorColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.37098 0.474541C4.63774 0.173156 5.02149 0 5.42396 0H5.42958C5.83392 0.00187196 6.21861 0.177836 6.48443 0.484837C7.67125 1.85137 7.66376 3.68214 6.46571 5.03931C6.19895 5.3407 5.8152 5.51385 5.41273 5.51385H5.40711C5.00183 5.51198 4.61808 5.33602 4.35226 5.02995C3.16544 3.66342 3.17293 1.83265 4.37098 0.474541Z"
            fill={vectorColor}
          />
        </svg>
      </div>
    );
  },
);

Highlight.displayName = "Highlight";
