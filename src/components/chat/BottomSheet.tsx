"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface BottomSheetOption {
  id: string;
  label: string;
}

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  options: BottomSheetOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
  helperText?: string;
  showSkipButton?: boolean;
  onSkip?: () => void;
  customContent?: React.ReactNode;
  customFooter?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  options,
  selectedIds,
  onToggle,
  onSubmit,
  submitLabel = "Готово",
  helperText,
  showSkipButton = false,
  onSkip,
  customContent,
  customFooter,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-core-alpha-80 z-40"
            onClick={handleBackdropClick}
          />

          {/* Bottom Sheet — стили по Figma: белый фон, контент 375×692, quiz-buttons 343×56, radius 16, border 10% */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-m max-w-[440px] mx-auto"
            style={{ maxHeight: "90vh" }}
          >
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Handle */}
              <div className="flex justify-center pt-12 pb-8 shrink-0">
                <div className="w-40 h-4 bg-core-alpha-20 rounded-full" />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-16 pt-0 pb-16">
                {title && (
                  <h3 className="text-title-l font-semibold text-core-alpha-80 text-center mb-16">
                    {title}
                  </h3>
                )}

                {helperText && (
                  <p className="text-12 text-center text-core-alpha-40 leading-[16px] mb-16">
                    {helperText}
                  </p>
                )}

                {customContent ? (
                  customContent
                ) : (
                  <div className="flex flex-col gap-8">
                    {options.map((option) => {
                      const isSelected = selectedIds.includes(option.id);
                      return (
                        <motion.button
                          key={option.id}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onToggle(option.id)}
                          className={`
                            flex items-center gap-8 min-h-56 h-56
                            px-16
                            border border-core-alpha-10 rounded-m
                            text-left
                            transition-colors
                            ${isSelected
                              ? "bg-core-alpha-5"
                              : "bg-white"
                            }
                          `}
                        >
                          <Checkbox
                            type="box"
                            size={24}
                            checked={isSelected}
                            onChange={() => onToggle(option.id)}
                            disabled={false}
                            className="shrink-0"
                          />
                          <span className="text-16 font-regular text-core-alpha-80 leading-[24px]">
                            {option.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer — по Figma: border-t 10%, padding, кнопка 311×48, radius full */}
              {customFooter ? (
                customFooter
              ) : (
                <div className="border-t border-core-alpha-10 bg-white px-32 pt-12 pb-20 shrink-0">
                  <div className="flex flex-col gap-8">
                    <Button
                      variant="primary"
                      size="l"
                      onClick={onSubmit}
                      fullWidth
                    >
                      {submitLabel}
                    </Button>
                    {showSkipButton && onSkip && (
                      <Button
                        variant="secondary"
                        size="l"
                        onClick={onSkip}
                        fullWidth
                      >
                        Пропустить
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
