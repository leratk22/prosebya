"use client";

import * as React from "react";

export interface AvatarProps {
  /**
   * URL изображения аватара
   */
  imageUrl?: string;
  /**
   * Имя для отображения первой буквы, если нет изображения
   */
  name?: string;
  /**
   * Размер аватара
   */
  size?: "s" | "m" | "l" | "xl";
  /**
   * Показывать ли кнопку "развернуть" в правом нижнем углу
   */
  showExpandButton?: boolean;
  /**
   * Обработчик клика на кнопку развернуть
   */
  onExpandClick?: () => void;
  /**
   * Дополнительные классы
   */
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<AvatarProps["size"]>, string> = {
  s: "w-40 h-40 text-14",
  m: "w-64 h-64 text-16",
  l: "w-80 h-80 text-18",
  xl: "w-120 h-120 text-24",
};

/**
 * Компонент Avatar
 * 
 * Отображает круглое изображение или первую букву имени
 * Поддерживает кнопку "развернуть" в правом нижнем углу
 */
export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = "l",
  showExpandButton = false,
  onExpandClick,
  className = "",
}) => {
  const sizeClasses = SIZE_CLASSES[size];
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          ${sizeClasses}
          rounded-full
          overflow-hidden
          bg-gray-muted
          flex items-center justify-center
          shrink-0
        `}
      >
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={name || "Avatar"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-light-fg-primary font-semibold">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </span>
        )}
      </div>
      {showExpandButton && (
        <button
          onClick={onExpandClick}
          className="
            absolute -bottom-4 -right-4
            w-32 h-32
            rounded-full
            bg-light-bg-primary
            border border-light-border-secondary
            flex items-center justify-center
            shadow-sm
            hover:bg-light-bg-secondary
            transition-colors
            z-10
          "
          aria-label="Развернуть изображение"
        >
          {/* Иконка развернуть - используем простую стрелку или создаем inline SVG */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-light-fg-secondary"
          >
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
