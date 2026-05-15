"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { MyContentSection } from "./MyContentSection";
import type { MyContentCard } from "./types";

export type TodayTabScreenProps = {
  cards: MyContentCard[];
  onRemove: (id: string) => void;
  onOpenMyContentList: () => void;
};

function StatusBar() {
  return (
    <div className="flex h-44 shrink-0 items-end justify-between bg-light-bg-primary px-24 pb-12 pt-8">
      <span className="text-[15px] font-semibold leading-20 text-system-black">9:41</span>
      <div className="flex gap-6 pr-4">
        <span className="text-12 text-system-black" aria-hidden>
          ●●●
        </span>
      </div>
    </div>
  );
}

function TabBar() {
  return (
    <div className="flex shrink-0 items-start justify-around border-t border-light-border-secondary bg-light-bg-primary px-8 pb-20 pt-8">
      <div className="flex flex-col items-center gap-4 text-light-fg-primary">
        <span className="size-28 rounded-full bg-light-bg-accent-overlay" aria-hidden />
        <span className="text-label-s font-medium">Сегодня</span>
      </div>
      <div className="flex flex-col items-center gap-4 text-light-fg-tertiary">
        <span className="size-28 rounded-full bg-light-bg-pressed" aria-hidden />
        <span className="text-label-s font-medium">Специалисты</span>
      </div>
      <div className="flex flex-col items-center gap-4 text-light-fg-tertiary">
        <span className="size-28 rounded-full bg-light-bg-pressed" aria-hidden />
        <span className="text-label-s font-medium">Про себя</span>
      </div>
    </div>
  );
}

/** Статичный низ таба «Сегодня» под секцией «Мой контент» — для визуального якоря и проверки схлопывания. */
function TodayFeedBelowFold() {
  return (
    <div className="flex w-full flex-col gap-24 px-16 pb-32 pt-8">
      <section>
        <h3 className="mb-12 text-title-l font-semibold text-light-fg-primary">Помочь себе за 2 минуты</h3>
        <div className="flex gap-12 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[214px] w-160 shrink-0 rounded-m border border-light-border-secondary bg-light-bg-primary shadow-elevation"
            />
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-12 text-title-l font-semibold text-light-fg-primary">Какие навыки развить</h3>
        <div className="h-160 w-full rounded-m border border-light-border-secondary bg-light-bg-primary shadow-elevation" />
        <div className="mt-16 flex gap-4 px-4">
          <span className="h-6 w-12 rounded-full bg-light-fg-accent" />
          <span className="size-6 rounded-full bg-light-fg-accent/20" />
          <span className="size-6 rounded-full bg-light-fg-accent/20" />
        </div>
      </section>
      <div className="rounded-m border border-light-border-secondary bg-light-bg-tertiary px-16 py-20 text-center">
        <p className="text-body-xl font-medium text-light-fg-primary">Хотите больше полезного контента?</p>
        <p className="mt-8 text-body-m text-light-fg-secondary">
          Пока что это всё, что мы подобрали для вас. Загляните в раздел «Полезное».
        </p>
        <button
          type="button"
          className="mt-16 w-full rounded-full border border-light-border-button-secondary py-12 text-label-l font-semibold text-light-fg-accent"
        >
          Смотреть все
        </button>
      </div>
    </div>
  );
}

export function TodayTabScreen({ cards, onRemove, onOpenMyContentList }: TodayTabScreenProps) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-light-bg-primary font-sans">
      <StatusBar />

      <div className="flex shrink-0 items-center gap-12 px-16 py-16">
        <div className="size-48 shrink-0 rounded-full bg-light-bg-dark" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-body-xl font-medium text-light-fg-tertiary">Онлайн-сессия</p>
          <p className="truncate text-title-l font-semibold text-light-fg-primary">30 декабря в 20:30</p>
        </div>
        <button
          type="button"
          className="flex size-48 shrink-0 items-center justify-center rounded-full border border-light-border-button-secondary text-light-fg-accent"
          aria-label="Календарь"
        >
          <Calendar className="size-24" strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-light-bg-secondary">
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-16 pt-16">
            <div className="flex rounded-full bg-light-bg-pressed p-2">
              <div className="flex-1 rounded-full bg-light-bg-primary py-8 text-center text-label-m font-semibold text-light-fg-primary shadow-elevation ring-1 ring-black/5">
                Для меня
              </div>
              <div className="flex-1 py-8 text-center text-label-m font-semibold text-light-fg-tertiary">
                Смотреть всё
              </div>
            </div>
          </div>

          <div className="px-16 pt-16">
            <div className="rounded-m border border-light-border-button-tertiary bg-light-bg-primary p-16 shadow-elevation">
              <p className="text-center text-title-m font-semibold text-light-fg-primary">
                Как вы себя чувствуете сегодня?
              </p>
              <div className="mt-16 flex justify-between gap-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-48 rounded-full bg-light-bg-accent-overlay" />
                ))}
              </div>
            </div>
          </div>

          <div className="px-16 pt-24">
            <p className="text-center text-title-l font-semibold tracking-title-l text-light-fg-primary">
              Мы собрали эти материалы для вас
            </p>
            <div className="mt-16 rounded-m bg-light-bg-accent-overlay p-16">
              <div className="rounded-m border border-light-border-button-secondary bg-light-bg-primary p-16 shadow-elevation">
                <p className="text-title-l font-semibold text-light-fg-primary">Я постоянно о чём-то переживаю</p>
                <div className="mt-16 flex gap-16">
                  <div className="size-140 shrink-0 rounded-full bg-light-bg-dark ring-2 ring-brand-orange" />
                  <div className="flex flex-1 flex-col justify-center gap-12">
                    <p className="text-body-m text-light-fg-tertiary">Часть 1 из 4</p>
                    <p className="text-body-xl text-light-fg-primary">Почему выступать страшно</p>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-4 rounded-full bg-light-bg-action py-12 text-body-xl font-semibold text-light-fg-primary"
                    >
                      Смотреть
                    </button>
                  </div>
                </div>
                <button type="button" className="mt-16 w-full text-body-xl font-medium text-light-fg-accent">
                  Выбрать другую тему →
                </button>
              </div>
            </div>
          </div>

          <div className="px-16 pt-24">
            <div className="rounded-m bg-core px-32 py-24 text-center">
              <p className="text-label-s font-medium uppercase tracking-wide text-core-inverted-alpha-80">
                тест, 6 минут
              </p>
              <p className="mt-16 text-title-l font-semibold text-core-inverted">
                Мои психологические навыки
              </p>
              <p className="mt-12 text-body-m text-core-inverted-alpha-80">
                Покажет, в чём вы уже сильны и какие навыки стоит развивать.
              </p>
            </div>
          </div>

          <motion.div layout className="w-full" transition={{ layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}>
            <AnimatePresence initial={false}>
              {cards.length > 0 ? (
                <motion.div
                  key="my-content-section"
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <MyContentSection cards={cards} onRemove={onRemove} onOpenMore={onOpenMyContentList} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div layout transition={{ layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}>
              <TodayFeedBelowFold />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
