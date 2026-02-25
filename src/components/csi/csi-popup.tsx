"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Illustration } from "@/components/illustrations";

const MAX_COMMENT_LENGTH = 1000;

/** URL кнопки «У меня срочный вопрос» (plan: CHAT_SUPPORT_URL) */
export const CSI_CHAT_SUPPORT_URL = "#";

const CloseIcon = () => (
  <svg
    className="w-18 h-18 block text-core-alpha-40"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/** Иллюстрация «Спасибо, что поделились» — руки, образующие сердце (124×124, Retina) */
const HandsHeartIllustration = () => (
  <Illustration
    type="thanks-for-feedback"
    width={124}
    height={124}
    alt=""
    className="mx-auto block"
  />
);

export interface CsiPopupProps {
  /** Выбранная оценка (1–5), обязательно при открытии */
  selectedRating: number;
  /** Комментарий */
  comment: string;
  /** Колбэк при изменении оценки */
  onRatingChange?: (rating: number) => void;
  /** Колбэк при изменении комментария */
  onCommentChange?: (value: string) => void;
  /** Колбэк при нажатии Сохранить */
  onSubmit?: () => void;
  /** Колбэк при закрытии */
  onClose?: () => void;
  /** Состояние загрузки (отправка) */
  isSubmitting?: boolean;
  /** Экран: форма или успех (4–5 / 1–3) */
  screen?: "form" | "success";
  /** Оценка после успешной отправки (для выбора success 4–5 vs 1–3) */
  submittedRating?: number | null;
}

// Дизайн-токены: spacing (4,8,12,24), radius (m,full), colors (light-*), fontSize (title-m, body-m, label-m, label-s)
const RATING_BUTTON_CLASS =
  "flex-1 min-w-0 flex items-center justify-center py-8 border-0 rounded-full bg-light-bg-pressed text-label-s font-semibold text-light-fg-muted cursor-pointer hover:bg-light-bg-accent-overlay hover:text-light-fg-tertiary font-euclid transition-colors duration-150";

export const CsiPopup = React.forwardRef<HTMLDivElement, CsiPopupProps>(
  (
    {
      selectedRating,
      comment,
      onRatingChange,
      onCommentChange,
      onSubmit,
      onClose,
      isSubmitting = false,
      screen = "form",
      submittedRating = null,
    },
    ref
  ) => {
    const isHighRating = submittedRating != null && submittedRating >= 4;

    if (screen === "success") {
      return (
        <div
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center p-24 pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="csi-success-title"
        >
          <div className="absolute inset-0 bg-light-bg-overlay-full" aria-hidden />
          <div className="relative w-full max-w-400 bg-light-bg-primary rounded-tl-l rounded-tr-l rounded-br-l rounded-bl-l shadow-elevation overflow-hidden flex flex-col font-euclid">
            <header className="relative flex items-start justify-center gap-4 pt-24 pb-16 pl-24 pr-0 flex-shrink-0">
              <h2
                id="csi-success-title"
                className="flex-1 min-w-0 text-title-l font-semibold text-light-fg-primary"
              >
                Спасибо, что поделились
              </h2>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
                className="absolute top-4 right-4 w-36 h-36 p-6 border-0 bg-transparent cursor-pointer grid place-items-center rounded-full"
              >
                <CloseIcon />
              </button>
            </header>

            <div className="flex flex-col gap-16 px-24 pb-20">
              {isHighRating ? (
                <>
                  <div className="flex justify-center">
                    <HandsHeartIllustration />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="m"
                    fullWidth
                    onClick={onClose}
                  >
                    Закрыть
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-16 items-center">
                    <div className="flex justify-center shrink-0">
                      <HandsHeartIllustration />
                    </div>
                    <p className="text-body-l font-regular text-light-fg-secondary flex-1 min-w-0">
                      Если у вас остались срочные вопросы, обратитесь в службу
                      поддержки.
                    </p>
                  </div>
                  <div className="flex flex-col gap-12">
                    <a
                      href={CSI_CHAT_SUPPORT_URL}
                      target="_self"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-16 py-12 font-semibold font-euclid rounded-full text-label-m bg-brand-orange text-core border border-transparent hover:bg-brand-orange-hover active:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                    >
                      У меня срочный вопрос
                    </a>
                    <Button
                      type="button"
                      variant="secondary"
                      size="m"
                      fullWidth
                      onClick={onClose}
                    >
                      Закрыть
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center p-24 pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="csi-popup-title"
      >
        {/* Backdrop — клик НЕ закрывает (RESEARCH) */}
        <div className="absolute inset-0 bg-light-bg-overlay-full" aria-hidden />

        <div className="relative w-full max-w-400 bg-light-bg-primary rounded-tl-l rounded-tr-l rounded-br-l rounded-bl-l shadow-elevation overflow-hidden flex flex-col font-euclid">
          <header className="relative flex items-start justify-center gap-4 pt-24 pb-16 pl-24 pr-0 flex-shrink-0">
            <h2
              id="csi-popup-title"
              className="flex-1 min-w-0 text-title-l font-semibold text-light-fg-primary"
            >
              Оцените нас
            </h2>
            <button
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
              className="absolute top-4 right-4 w-36 h-36 p-6 border-0 bg-transparent cursor-pointer grid place-items-center rounded-full"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="flex flex-col gap-16 px-24 pb-20 rounded-tl-l rounded-tr-l rounded-br-l rounded-bl-0">
            <p className="text-body-l font-regular text-light-fg-secondary">
              Насколько вам нравится сервис «Просебя»?
            </p>
            <div className="flex gap-4 pb-20">
              {[1, 2, 3, 4, 5].map((rating) => {
                const isSelected = selectedRating === rating;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => onRatingChange?.(rating)}
                    className={
                      isSelected
                        ? "flex-1 min-w-0 flex items-center justify-center py-8 border-0 rounded-full bg-light-bg-accent text-label-s font-semibold text-light-fg-inverted-primary cursor-pointer font-euclid"
                        : RATING_BUTTON_CLASS
                    }
                    aria-pressed={isSelected}
                  >
                    {rating}
                  </button>
                );
              })}
            </div>

            <p className="text-title-l font-semibold text-light-fg-primary">
              Хотите оставить комментарий?
            </p>
            <Textarea
              value={comment}
              onChange={(e) =>
                onCommentChange?.(e.target.value.slice(0, MAX_COMMENT_LENGTH))
              }
              label="Комментарий"
              placeholder="Комментарий"
              maxLength={MAX_COMMENT_LENGTH}
              rows={1}
              counter={`${comment.length}/${MAX_COMMENT_LENGTH}`}
              clearable
              onClear={() => onCommentChange?.("")}
              variant="underline"
            />

            <Button
              type="button"
              variant="primary"
              size="m"
              fullWidth
              loading={isSubmitting}
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка…" : "Сохранить"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

CsiPopup.displayName = "CsiPopup";
