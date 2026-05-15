"use client";

import * as React from "react";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import { Trash2 } from "lucide-react";

const DELETE_W = 76;
const OPEN_THRESHOLD = DELETE_W * 0.38;
const VELOCITY_DELETE = -420;

type SwipeDeleteListRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
};

export function SwipeDeleteListRow({ children, onDelete }: SwipeDeleteListRowProps) {
  const x = useMotionValue(0);

  const finishDelete = React.useCallback(() => {
    animate(x, -DELETE_W * 1.2, { duration: 0.16, ease: [0.4, 0, 1, 1] }).then(() => {
      onDelete();
    });
  }, [onDelete, x]);

  const handleDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const pos = x.get();
      const shouldDelete = pos < -OPEN_THRESHOLD || info.velocity.x < VELOCITY_DELETE;

      if (shouldDelete) {
        finishDelete();
      } else {
        animate(x, 0, { type: "spring", stiffness: 520, damping: 42 });
      }
    },
    [finishDelete, x],
  );

  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-[12px] shadow-elevation">
      <button
        type="button"
        aria-label="Удалить"
        className="absolute inset-y-0 right-0 z-0 flex w-[76px] items-center justify-center rounded-[12px] bg-light-bg-feedback-negative active:bg-light-bg-feedback-negative/90"
        onClick={() => {
          if (x.get() > -14) return;
          finishDelete();
        }}
      >
        <Trash2 className="size-24 text-core-inverted" strokeWidth={2} aria-hidden />
      </button>
      <motion.div
        style={{ x }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -DELETE_W, right: 0 }}
        dragElastic={{ left: 0.1, right: 0 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        className="relative z-10 w-full min-w-0 touch-pan-y overflow-hidden rounded-[12px] bg-light-bg-primary"
      >
        {children}
      </motion.div>
    </div>
  );
}
