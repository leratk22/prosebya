import type { Meta, StoryObj } from "@storybook/react";
import { LongreadCardWeb, type LongreadCardWebProps } from "./longread-card-web";

const meta: Meta<typeof LongreadCardWeb> = {
  title: "Cards/LongreadCardWeb",
  component: LongreadCardWeb,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Карточка для отображения лонгрида согласно дизайну из Figma.

**Адаптивность:**
- **Mobile** (< 440px): ширина растягивается под экран, высота **235px** (фиксированная)
- **Desktop** (≥ 440px): максимальная ширина **756px**, высота **235px** (фиксированная)

**Особенности:**
- Фиксированная высота 235px для всех размеров экрана
- Цвет фона: один из 5 вариантов (желтый, оранжевый, красный, голубой, белый). Рекомендуем использовать все цвета, кроме белого, его только в крайних случаях
- Для белого фона может использоваться иллюстрация любого цвета
- Изображение выбирается по цвету фона
- Поддержка разрешений 1x и 2x для retina дисплеев
- Изображение справа, текст слева
- В десктопе изображение масштабируется на 150%
- Один обязательный тег (Badge)
- Заголовок максимум 3 строки с обрезкой в многоточие
- SVG заглушка если изображение не загрузилось
        `,
      },
    },
  },
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки, но это очень маловероятно на десктопе, нет у нас таких длинных",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Заголовок карточки (максимум 3 строки)",
    },
    tag: {
      control: { type: "text" },
      description: "Текст для badge (обязательный)",
    },
    backgroundColor: {
      control: { type: "select" },
      options: ["yellow", "orange", "red", "blue", "white"],
      description: "Цвет фона карточки. Для белого фона автоматически используется иллюстрация из желтой карточки",
    },
    imageUrl: {
      control: { type: "text" },
      description: "URL изображения (опционально, если не указано, используется изображение по цвету фона)",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Alt текст для изображения",
    },
    placeholderSvgUrl: {
      control: { type: "text" },
      description: "URL SVG заглушки (если изображение не загрузилось, по умолчанию используется стандартная заглушка)",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LongreadCardWeb>;

export const Default: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
};

export const Yellow: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
};

export const Orange: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "orange",
  },
};

export const Red: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "red",
  },
};

export const Blue: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "blue",
  },
};

export const White: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "white",
    imageAlt: "Longread image",
  },
};

export const LongTitle: Story = {
  args: {
    title: "Очень длинный заголовок который должен обрезаться после трех строк и показывать многоточие если текст не умещается в отведенное пространство карточки лонгрида и продолжается дальше",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
};

export const WithCustomImage: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
    imageUrl: "https://via.placeholder.com/182x166",
    imageAlt: "Longread image",
  },
};

export const WithPlaceholder: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
    imageUrl: "invalid-url", // Невалидный URL для демонстрации заглушки
    imageAlt: "Placeholder",
  },
};

export const Clickable: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
    onClick: () => {
      alert("Карточка кликнута!");
    },
  },
};

export const DesignTokens: Story = {
  render: () => (
    <div className="space-y-24 p-16 max-w-4xl">
      <div>
        <h2 className="text-title-l font-semibold mb-16">Используемые токены</h2>
        
        <div className="space-y-16">
          <section>
            <h3 className="text-title-m font-semibold mb-12">Карточка</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Фон</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  backgroundColor (yellow/orange/red/blue/white)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Желтый: #FFE699, Оранжевый: #FFB899, Красный: #FF9999, Голубой: #A6C1F2, Белый: #FFFFFF
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> background-color: #FFE699 (yellow), #FFB899 (orange), #FF9999 (red), #A6C1F2 (blue), #FFFFFF (white)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Примечание:</strong> Для белого фона автоматически используется иллюстрация из желтой карточки.
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  border border-[rgba(52,64,121,0.14)]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  rgba(52, 64, 121, 0.14)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> border: 1px solid rgba(52, 64, 121, 0.14)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Радиус скругления</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rounded-m
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px (radius-m)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> border-radius: 16px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-[235px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  235px (фиксированная для всех размеров экрана)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> height: 235px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Максимальная ширина (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:max-w-[756px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  756px только для desktop (≥ 440px)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> max-width: 756px (при ширине экрана ≥ 440px)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Текстовая часть</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-20
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  20px со всех сторон (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> padding: 20px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:py-24 md:pr-64 md:pl-20
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  paddingTop: 24px, paddingBottom: 24px, paddingRight: 64px, paddingLeft: 20px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> padding-top: 24px, padding-bottom: 24px, padding-right: 64px, padding-left: 20px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Промежуток между элементами</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-10
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  10px между заголовком и badge (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> gap: 10px
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Изображение</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Размер контейнера (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-image
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  182px × 166px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 182px, height: 166px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Размер контейнера (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-image (md:)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  273px × 249px (для масштабированного изображения)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 273px, height: 249px (≥ 440px)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Масштабирование изображения (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-img transform: scale(1.5)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Изображение масштабируется на 150% от исходного размера (182×166px → 273×249px)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> transform: scale(1.5), transform-origin: bottom right
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-title font-semibold font-euclid text-[#22263B] line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/M, SemiBold, Euclid Circular A
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 20px, line-height: 1.2em, font-weight: 600 (SemiBold), color: #22263B, letter-spacing: -0.01em (-1%), максимум 3 строки
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-title font-semibold font-euclid text-[#22263B] line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/L, SemiBold, Euclid Circular A
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 24px, line-height: 1.3333333333333333em (32px), font-weight: 600 (SemiBold), color: #22263B, letter-spacing: -0.015em (-1.5%), максимум 3 строки
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Подробное описание всех используемых дизайн-токенов в компоненте LongreadCardWeb",
      },
    },
  },
};
