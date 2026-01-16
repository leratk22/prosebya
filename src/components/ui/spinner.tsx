"use client";

import * as React from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Размер спиннера в пикселях.
   */
  size?: number;
}

/**
 * Стандартный React спиннер (16px по умолчанию).
 * Круговой индикатор загрузки с анимацией вращения.
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 16,
      className,
      role,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHiddenProp,
      ...rest
    },
    ref,
  ) => {
    const ariaHidden =
      ariaHiddenProp ?? (!(ariaLabel || role) ? true : undefined);

    const classes = ["animate-spin", className].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        role={role}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${Math.max(1, Math.floor(size / 8))}px solid transparent`,
          borderTop: `${Math.max(1, Math.floor(size / 8))}px solid #FFB800`,
          borderRadius: "50%",
          display: "inline-block",
          verticalAlign: "middle",
          ...rest.style,
        }}
        {...rest}
      />
    );
  },
);

Spinner.displayName = "Spinner";
