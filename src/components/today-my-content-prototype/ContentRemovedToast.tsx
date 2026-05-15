"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type ContentRemovedToastProps = {
  open: boolean;
};

export function ContentRemovedToast({ open }: ContentRemovedToastProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[300] flex justify-center"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="toast"
            role="status"
            className="flex w-full min-w-0 flex-col bg-light-bg-feedback-positive shadow-elevation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.28,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {/* Как в Figma Notification: статус-бар 44px + строка сообщения с p-16, суммарно ~96px */}
            <div
              className="flex h-44 shrink-0 items-end justify-between px-24 pb-12 pt-8 text-core-inverted"
              aria-hidden
            >
              <span className="text-[15px] font-semibold leading-20 tracking-[-0.24px]">9:41</span>
              <span className="pr-4 text-12 leading-none opacity-90" aria-hidden>
                ●●●
              </span>
            </div>
            <div className="flex min-h-[52px] shrink-0 items-center justify-center px-16 py-16 backdrop-blur-[10px]">
              <p className="min-w-0 flex-1 text-center text-[16px] font-semibold leading-5 text-core-inverted">
                Убрали контент из списка
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
