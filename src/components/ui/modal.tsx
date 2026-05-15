"use client";

import * as React from "react";
import { Button, type ButtonVariant } from "./button";

export interface ModalButtonConfig {
  /** Текст кнопки */
  label: string;
  /**
   * Вариант кнопки задаётся комбинацией: 1 кнопка → primary; 2 → primary и secondary; 3 → primary, secondary, tertiary.
   * Переданный variant игнорируется — используется канонический по позиции.
   */
  variant?: ButtonVariant;
  /** Обработчик клика. Если не передан, кнопка закрывает модалку при onClose. */
  onClick?: () => void;
  /** Кнопка disabled */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
}

export interface ModalProps {
  /** Открыто ли модальное окно */
  open: boolean;
  /** Вызывается при закрытии (клик по оверлею или кнопка отмены) */
  onClose: () => void;
  /** Заголовок. Обязателен заголовок или текст (или children) — модалка не может быть только с кнопками. */
  title?: string;
  /** Основной текст. Обязателен заголовок или текст (или children). */
  text?: string;
  /**
   * Кнопки. Обязательно 1, 2 или 3. Размер: кнопка M.
   * Комбинации только такие: 1 кнопка — всегда primary; 2 — primary и secondary (порядок по buttonLayout); 3 — primary, secondary, tertiary.
   */
  buttons: ModalButtonConfig[];
  /** Раскладка при двух кнопках: horizontal (рядом) или vertical (столбиком). При 1 или 3 кнопках не используется. */
  buttonLayout?: "horizontal" | "vertical";
  /** Дополнительный контент вместо или вместе с text (например, кастомная разметка) */
  children?: React.ReactNode;
  /** Дополнительные классы для контейнера контента */
  className?: string;
  /** Закрывать ли при клике по оверлею */
  closeOnOverlayClick?: boolean;
  /** Aria-label для оверлея (доступность) */
  ariaLabelledby?: string;
  /** Aria-describedby для контента (доступность) */
  ariaDescribedby?: string;
}

/** Комбинации только: 1 → primary; 2 → primary и secondary (порядок по buttonLayout); 3 → primary, secondary, tertiary. Кнопка M. */
function getVariantByPosition(
  count: number,
  index: number,
  buttonLayout: "horizontal" | "vertical",
): ButtonVariant {
  if (count === 1) return "primary";
  if (count === 2) {
    const isPrimarySecond = buttonLayout === "horizontal"; // horizontal: [secondary, primary]; vertical: [primary, secondary]
    return index === (isPrimarySecond ? 1 : 0) ? "primary" : "secondary";
  }
  // count === 3 → [primary, secondary, tertiary]
  if (index === 0) return "primary";
  if (index === 1) return "secondary";
  return "tertiary";
}

function ModalButtons({
  buttons,
  onClose,
  buttonLayout,
}: {
  buttons: ModalButtonConfig[];
  onClose: () => void;
  buttonLayout: "horizontal" | "vertical";
}) {
  const count = buttons.length;
  const twoHorizontal = count === 2 && buttonLayout === "horizontal";
  const twoVertical = count === 2 && buttonLayout === "vertical";
  const threeVertical = count === 3;

  const containerClass =
    count === 1
      ? "flex"
      : twoHorizontal
        ? "flex flex-row gap-8"
        : "flex flex-col gap-8";

  return (
    <div className={containerClass}>
      {buttons.map((btn, index) => (
        <Button
          key={index}
          variant={getVariantByPosition(count, index, buttonLayout)}
          size="m"
          fullWidth={count === 1 || twoVertical || threeVertical}
          className={twoHorizontal ? "flex-1 min-w-0" : undefined}
          disabled={btn.disabled}
          loading={btn.loading}
          onClick={btn.onClick ?? onClose}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
}

/**
 * Неполноэкранное модальное окно.
 *
 * - Всегда есть кнопки (хотя бы одна). Размер кнопок: M.
 * - Обязателен хотя бы один из: заголовок, текст или children (только кнопки не допускаются).
 * - Комбинации кнопок только такие: 1 кнопка — всегда primary; 2 — primary и secondary (порядок по buttonLayout); 3 — primary, secondary, tertiary.
 *
 * @figma Модальное окно: https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/...?node-id=38287-24301
 * @figma Кнопки: https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/...?node-id=5453-222174
 */
export function Modal({
  open,
  onClose,
  title,
  text,
  buttons,
  buttonLayout = "horizontal",
  children,
  className,
  closeOnOverlayClick = true,
  ariaLabelledby,
  ariaDescribedby,
}: ModalProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) return;
    if (contentRef.current && contentRef.current.contains(e.target as Node)) return;
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const titleId = ariaLabelledby ?? React.useId();
  const descId = ariaDescribedby ?? React.useId();
  const hasContent = Boolean(title || text || children);

  if (process.env.NODE_ENV !== "production" && open && !hasContent) {
    console.warn(
      "Modal: требуется хотя бы один из title, text или children. Модалка только с кнопками не допускается.",
    );
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={text || children ? descId : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-16"
      onKeyDown={handleKeyDown}
    >
      {/* Оверлей */}
      <div
        className="absolute inset-0 bg-light-bg-overlay-full dark:bg-dark-bg-overlay-full"
        aria-hidden="true"
        onClick={handleOverlayClick}
      />

      {/* Контент — не на всю высоту экрана; радиус всех углов 24px (токен radius-l) */}
      <div
        ref={contentRef}
        className={[
          "relative z-10 w-full max-w-400 bg-light-bg-primary dark:bg-dark-bg-primary p-24 shadow-lg",
          "rounded-tl-l rounded-tr-l rounded-br-l rounded-bl-l",
          "flex flex-col gap-24",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Блок заголовка и текста с gap-12 между ними */}
        <div className="flex flex-col gap-12">
          {title ? (
            <h2
              id={titleId}
              className="text-title-l font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary"
            >
              {title}
            </h2>
          ) : null}

          {(text || children) ? (
            <div
              id={descId}
              className="text-body-l text-light-fg-secondary dark:text-dark-fg-secondary font-euclid"
            >
              {text}
              {children}
            </div>
          ) : null}
        </div>

        <ModalButtons
          buttons={buttons}
          onClose={onClose}
          buttonLayout={buttonLayout}
        />
      </div>
    </div>
  );
}
