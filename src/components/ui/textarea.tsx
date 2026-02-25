"use client";

import * as React from "react";

const ClearIcon = () => (
  <svg
    className="w-16 h-16 block shrink-0"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Счётчик символов (например "120/1000") */
  counter?: React.ReactNode;
  /** Label над полем (Figma: label) */
  label?: string;
  /** Состояние ошибки (Figma: красная обводка и label) */
  error?: boolean;
  /** Показать кнопку очистки при наличии значения */
  clearable?: boolean;
  /** Колбэк при нажатии очистки */
  onClear?: () => void;
  /** Вариант: underline (Figma) — подчёркивание, filled — рамка */
  variant?: "underline" | "filled";
}

const underlineBase =
  "w-full text-body-l font-regular text-light-fg-primary bg-transparent " +
  "border-0 border-b resize-none shadow-none placeholder:text-light-fg-muted " +
  "focus:outline-none focus:ring-0 ";
const filledBase =
  "w-full px-12 py-8 text-body-l font-regular text-light-fg-primary " +
  "bg-light-bg-tertiary border border-light-border-primary rounded-s " +
  "resize-none placeholder:text-light-fg-muted " +
  "focus:outline-none focus:ring-2 focus:ring-brand-blue-alpha-10 focus:border-light-border-accent";

/**
 * Textarea по дизайн-токенам.
 * Figma: underline, label, clear, error. filled: rounded-s, border-light-border-primary.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      counter,
      label,
      error = false,
      clearable = false,
      onClear,
      variant = "filled",
      value,
      id,
      onFocus,
      onBlur,
      onInput,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = typeof value === "string" && value.length > 0;
    const showClear = clearable && hasValue && onClear;

    const isUnderline = variant === "underline";
    const underlineActive = isUnderline && (isFocused || hasValue);
    const showFloatingLabel = isUnderline && Boolean(label) && underlineActive;

    const setTextareaRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const LINE_HEIGHT_PX = 20; // body-l line-height
    const MAX_LINES = 4;
    const MIN_HEIGHT_PX = 24;
    const TEXTAREA_MAX_HEIGHT_PX = 8 + MAX_LINES * LINE_HEIGHT_PX + 8; // py-8 + 4 lines
    const WRAPPER_MAX_HEIGHT_PX = 40 + TEXTAREA_MAX_HEIGHT_PX; // label + textarea
    const resizeTextarea = React.useCallback(() => {
      if (!isUnderline || !textareaRef.current) return;
      const el = textareaRef.current;
      el.style.height = "auto";
      const targetHeight = Math.max(MIN_HEIGHT_PX, el.scrollHeight);
      const cappedHeight = Math.min(targetHeight, TEXTAREA_MAX_HEIGHT_PX);
      el.style.height = `${cappedHeight}px`;
      el.style.overflowY = targetHeight > TEXTAREA_MAX_HEIGHT_PX ? "auto" : "hidden";
    }, [isUnderline]);

    React.useEffect(() => {
      resizeTextarea();
    }, [resizeTextarea, value, showFloatingLabel]);

    const borderColor = error
      ? "border-light-border-negative"
      : isUnderline
      ? underlineActive
        ? "border-light-border-accent"
        : "border-light-border-primary"
      : "border-light-border-primary focus:border-light-border-accent";

    const labelClass = error
      ? "text-label-s text-light-fg-feedback-negative"
      : "text-label-s text-light-fg-muted";

    const underlineWithBorder = `${underlineBase} ${borderColor} min-h-56 px-12 pt-8 pb-16 ${showClear ? "pr-36" : "pr-12"}`;
    const underlineInScroll = `${underlineBase} border-0 border-b-0 min-h-24 px-12 py-8 ${showClear ? "pr-36" : "pr-12"}`;
    const inputClass = isUnderline
      ? showFloatingLabel
        ? underlineInScroll
        : underlineWithBorder
      : `${filledBase} ${showClear ? "pr-36" : ""}`.trim();

    const textareaEl = (
      <textarea
        ref={setTextareaRef}
        id={textareaId}
        value={value}
        placeholder={showFloatingLabel ? undefined : placeholder}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        onInput={(e) => {
          resizeTextarea();
          onInput?.(e);
        }}
        className={[inputClass, "flex-1 min-w-0", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
    );

    return (
      <div className="flex flex-col gap-4 font-euclid overflow-hidden">
        {label && !isUnderline && (
          <label htmlFor={textareaId} className={labelClass}>
            {label}
          </label>
        )}
        <div
          className={
            isUnderline ? "relative" : "relative flex items-center"
          }
        >
          {isUnderline && showFloatingLabel ? (
            <>
              <div
                className={`w-full min-h-56 overflow-y-auto overflow-x-hidden border-b pr-36 ${error ? "border-light-border-negative" : underlineActive ? "border-light-border-accent" : "border-light-border-primary"}`}
                style={{ maxHeight: WRAPPER_MAX_HEIGHT_PX }}
              >
                <label
                  htmlFor={textareaId}
                  className="block text-body-s font-regular text-light-fg-muted px-12 pt-8 pb-4 shrink-0 cursor-text"
                >
                  {label}
                </label>
                {textareaEl}
              </div>
              {showClear && (
                <button
                  type="button"
                  aria-label="Очистить"
                  onClick={onClear}
                  className={
                    "absolute right-0 top-8 w-32 h-32 p-0 " +
                    "border-0 bg-transparent cursor-pointer grid place-items-center " +
                    "rounded-full text-core-alpha-40 hover:text-core-alpha-60 " +
                    "focus:outline-none focus:text-core-alpha-60"
                  }
                >
                  <ClearIcon />
                </button>
              )}
            </>
          ) : (
            <>
              {textareaEl}
              {showClear && (
                <button
                  type="button"
                  aria-label="Очистить"
                  onClick={onClear}
                  className={
                    "absolute right-0 top-8 w-32 h-32 p-0 " +
                    "border-0 bg-transparent cursor-pointer grid place-items-center " +
                    "rounded-full text-core-alpha-40 hover:text-core-alpha-60 " +
                    "focus:outline-none focus:text-core-alpha-60"
                  }
                >
                  <ClearIcon />
                </button>
              )}
            </>
          )}
        </div>
        {counter && (
          <span className="text-label-s text-light-fg-muted text-left border-0">
            {counter}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
