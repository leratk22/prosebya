"use client";

import * as React from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export interface SidebarMenuItem {
  id: string;
  label: string;
  iconName: string;
  href?: string;
  onClick?: () => void;
}

export interface SidebarProps {
  /**
   * Пункты меню навигации
   */
  menuItems: SidebarMenuItem[];
  /**
   * Активный пункт меню
   */
  activeMenuItemId?: string;
  /**
   * Текст кнопки записи
   */
  appointmentButtonText?: string;
  /**
   * Обработчик клика на кнопку записи
   */
  onAppointmentClick?: () => void;
  /**
   * URL логотипа или текст логотипа
   */
  logo?: React.ReactNode;
  /**
   * Дополнительные классы
   */
  className?: string;
}

/**
 * Компонент Sidebar
 * 
 * Боковая панель навигации с меню и кнопкой записи
 */
export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activeMenuItemId,
  appointmentButtonText = "Записаться на сессию",
  onAppointmentClick,
  logo,
  className = "",
}) => {
  return (
    <aside
      className={`
        flex flex-col
        w-[280px] min-w-[280px]
        p-24
        gap-32
        bg-light-bg-primary
        ${className}
      `}
    >
      {/* Логотип */}
      {logo && (
        <div className="flex items-center justify-start">
          {typeof logo === "string" ? (
            <span className="text-title-xl font-bold text-brand-orange">
              {logo}
            </span>
          ) : (
            logo
          )}
        </div>
      )}

      {/* Меню навигации */}
      <nav className="flex flex-col gap-8">
        {menuItems.map((item) => {
          const isActive = item.id === activeMenuItemId;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={item.onClick}
              className={`
                flex items-center gap-12
                px-12 py-8
                rounded-s
                text-body-l font-regular
                transition-colors
                ${isActive
                  ? "text-light-fg-primary bg-light-bg-secondary"
                  : "text-light-fg-secondary hover:text-light-fg-primary hover:bg-light-bg-secondary"
                }
              `}
            >
              <Icon
                name={item.iconName}
                size={20}
                className={isActive ? "text-light-fg-primary" : "text-light-fg-secondary"}
              />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Кнопка записи */}
      <div className="mt-auto">
        <Button
          variant="primary"
          size="l"
          fullWidth={true}
          onClick={onAppointmentClick}
        >
          {appointmentButtonText}
        </Button>
      </div>
    </aside>
  );
};
