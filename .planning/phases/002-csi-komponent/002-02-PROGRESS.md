# Phase 002 Plan 02 — Progress: React CSI Banner

**Дата:** 2026-02-24

## Выполнено

### 1. React-компонент CSI Banner

Создан компонент `src/components/csi/csi-banner.tsx`:
- Баннер с заголовком «Оцените нас», кнопкой закрытия и шкалой оценки 1–5
- Props: `selectedRating`, `onRatingSelect`, `onClose`, `variant` (inline | fixed)
- Токены из `tailwind.config.ts` (light-bg-*, text-title-m, rounded-m, shadow-elevation и т.д.)
- Вариант `fixed` — `position: fixed; bottom: 24px; right: 24px; z-index: 50` для закрепления в правом нижнем углу

### 2. Интеграция на страницу lk.prosebya.ru

Создана страница `app/lk/page.tsx`:
- iframe с `src="https://lk.prosebya.ru/"`
- CSI Banner фиксирован в правом нижнем углу поверх iframe
- `pointer-events: none` на overlay, `pointer-events: auto` на баннере — клики проходят в iframe, баннер остаётся кликабельным
- Баннер всегда в углу при скролле (fixed)

**Как открыть:** Запустить dev-сервер и перейти на `/lk`.

## Осталось по плану 002-02

- [ ] Task 1: Стили и Figma-токены (assets/csi/csi.css) — для vanilla-прототипа
- [ ] Task 2: Полный UI: попап-форма (textarea 1000 символов, «Сохранить»), success/error экраны
- [ ] Task 3: Связка с state machine (csi-state.js) и API (csi-api.js)

## Варианты дальнейшей интеграции

1. **React-путь (текущий):** Расширить `CsiBanner` до полного флоу (форма → submit → success/error) и использовать на `/lk`.
2. **Vanilla-путь (план):** Реализовать csi-ui.js + csi.css для prosebya-prototype-iframe.html.
