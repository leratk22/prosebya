import type { Meta, StoryObj } from "@storybook/react";
import { HorizontalCardWeb, type HorizontalCardWebProps } from "./horizontal-card-web";

const meta: Meta<typeof HorizontalCardWeb> = {
  title: "Cards/HorizontalCardWeb",
  component: HorizontalCardWeb,
  tags: ["autodocs"],
  parameters: {
    // По умолчанию показываем мобильную версию
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Горизонтальная карточка для отображения контента согласно дизайну из Figma.

**Адаптивность:**
- **Mobile** (< 440px): высота **140px**, ширина **343px**, изображение слева (124px), текст справа
- **Desktop** (≥ 440px): высота **210px**, максимальная ширина **756px**, изображение слева (186px), текст справа

**Особенности:**
- Заголовок обрезается после 2 строк многоточием (line-clamp-2)
- Описание обрезается после 1 строки многоточием (line-clamp-1)
- Badges обязательны (минимум 1, максимум 2)
- На mobile: badges перед заголовком (gap: 4px)
- На desktop: badges внизу (gap: 8px)
- Светлая тема: badges с вариантом "default" (brand-blue фон и текст)
- Темная тема: badges с вариантом "invert" (белый текст на прозрачном фоне)
- Размеры одинаковые в обеих темах
- Весь блок кликабельный при наведении (если передан onClick)
        `,
      },
    },
  },
  args: {
    title: "Заголовок максимум в 2 строки, далее обрезка в многоточие, если текст не уместился",
    description: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    badges: ["Тэг", "Тэг"],
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Заголовок карточки (максимум 2 строки)",
    },
    description: {
      control: { type: "text" },
      description: "Описание под заголовком (опционально)",
    },
    badges: {
      control: { type: "object" },
      description: "Массив badges для отображения (обязательно минимум 1, максимум 2)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "URL изображения для левой части (1x)",
    },
    imageUrl2x: {
      control: { type: "text" },
      description: "URL изображения для левой части (2x, retina)",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Alt текст для изображения",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HorizontalCardWeb>;

export const Default: Story = {
  args: {
    title: "Заголовок максимум в 2 строки, далее обрезка в многоточие, если текст не уместился",
    description: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    badges: ["Тэг", "Тэг"],
    imageUrl: "/horizontal-card-1x.png",
    imageUrl2x: "/horizontal-card-2x.png",
    imageAlt: "Карточка",
  },
};

export const WithImage: Story = {
  args: {
    title: "Медитация для сна",
    description: "Помочь себе за 2 минуты",
    badges: ["Практика", "Медитация"],
    imageUrl: "/horizontal-card-1x.png",
    imageUrl2x: "/horizontal-card-2x.png",
    imageAlt: "Медитация",
  },
};

export const Clickable: Story = {
  args: {
    title: "Заголовок максимум в 2 строки, далее обрезка в многоточие, если текст не уместился",
    description: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    badges: ["Тэг", "Тэг"],
    onClick: () => {
      alert("Карточка кликнута!");
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Короткий заголовок",
    badges: ["Тэг"],
  },
};

export const SingleBadge: Story = {
  args: {
    title: "Заголовок с одним badge",
    description: "Описание",
    badges: ["Тэг"],
  },
};

export const LongTitle: Story = {
  args: {
    title: "Очень длинный заголовок который должен обрезаться после двух строк и показывать многоточие если текст не умещается в отведенное пространство карточки",
    description: "Описание",
    badges: ["Тэг", "Тэг"],
  },
};

export const LongDescription: Story = {
  args: {
    title: "Заголовок",
    description: "Очень длинное описание которое должно обрезаться после одной строки и показывать многоточие если текст не умещается в отведенное пространство карточки",
    badges: ["Тэг"],
  },
};

export const ThemesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div>
        <h3 className="text-title-m font-semibold mb-16">Светлая тема</h3>
        <div className="bg-light-bg-primary p-24 rounded-m">
          <HorizontalCardWeb
            title="Заголовок максимум в 2 строки, далее обрезка в многоточие, если текст не уместился"
            description="Описание в 1 строку в зависимости от типа контента (необязательно)"
            badges={["Тэг", "Тэг"]}
            imageUrl="/horizontal-card-1x.png"
            imageUrl2x="/horizontal-card-2x.png"
            imageAlt="Карточка"
          />
        </div>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-16">Темная тема</h3>
        <div className="dark bg-light-bg-primary p-24 rounded-m">
          <HorizontalCardWeb
            title="Заголовок максимум в 2 строки, далее обрезка в многоточие, если текст не уместился"
            description="Описание в 1 строку в зависимости от типа контента (необязательно)"
            badges={["Тэг", "Тэг"]}
            imageUrl="/horizontal-card-1x.png"
            imageUrl2x="/horizontal-card-2x.png"
            imageAlt="Карточка"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
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
                  bg-light-bg-primary dark:bg-dark-bg-primary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  #FFFFFF (светлая тема), #22263b (темная тема)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> background-color: #FFFFFF (light), #22263b (dark)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  horizontal-card-border
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  rgba(52, 64, 121, 0.14) - светлая тема, rgba(255, 255, 255, 0.14) - темная тема
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> border: 1px solid rgba(52, 64, 121, 0.14) (light), border: 1px solid rgba(255, 255, 255, 0.14) (dark)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Тень</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Elevation тень (кастомное значение)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> box-shadow: 0px 12px 24px -4px rgba(34, 38, 59, 0.05)
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
                  h-[140px] md:h-[210px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 140px, Desktop: 210px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> height: 140px (mobile), height: 210px (desktop ≥ 440px)
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
            <h3 className="text-title-m font-semibold mb-12">Изображение</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Ширина</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  horizontal-card-image
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 124px, Desktop: 186px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 124px (mobile), width: 186px (desktop ≥ 440px)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-full
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Растягивается на всю высоту карточки
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> height: 100% (140px mobile, 210px desktop)
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
                  p-16
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px со всех сторон (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> padding: 16px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:py-32 md:pr-64 md:pl-0
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  paddingTop: 32px, paddingBottom: 32px, paddingRight: 64px, paddingLeft: 0px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> padding-top: 32px, padding-bottom: 32px, padding-right: 64px, padding-left: 0px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Промежутки между элементами</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-12 md:gap-16
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 12px, Desktop: 16px (токены Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> gap: 12px (mobile), gap: 16px (desktop ≥ 440px)
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
                  practice-card-title font-medium font-euclid text-light-fg-primary dark:text-dark-fg-primary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Body/L-Medium, Medium, Euclid Circular A, основной цвет текста
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 16px, line-height: 24px (1.5em), font-weight: 500 (Medium), color: rgba(34, 38, 59, 1) / #FFFFFF, letter-spacing: 0
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  practice-card-title font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Title/L, SemiBold, Euclid Circular A, основной цвет текста
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 24px, line-height: 32px (1.3333333333333333em), font-weight: 600 (SemiBold), color: rgba(34, 38, 59, 1) / #FFFFFF, letter-spacing: -0.015em (-1.5%)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Описание</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  text-body-s font-medium font-euclid text-light-fg-tertiary dark:text-dark-fg-tertiary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Body/S-Medium, Medium, Euclid Circular A, третичный цвет текста
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 12px, line-height: 16px (1.3333333333333333em), font-weight: 500 (Medium), color: rgba(34, 38, 59, 0.6) / rgba(255, 255, 255, 0.6), letter-spacing: 0
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Badges</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Вариант (Светлая тема)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  variant="default"
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  bg-brand-blue-alpha-10, text-brand-blue
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> background: rgba(52, 64, 121, 0.1), color: #344079
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Вариант (Темная тема)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  variant="default" + dark: классы
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  dark:bg-core-inverted-alpha-10, dark:text-core-inverted
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> background: rgba(255, 255, 255, 0.1), color: #FFFFFF
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Промежутки между badges</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-4 (mobile), gap-8 (desktop)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 4px, Desktop: 8px (токены Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> gap: 4px (mobile), gap: 8px (desktop ≥ 440px)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Адаптивность</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Брейкпоинт</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md: (440px)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Переход между mobile и desktop версиями происходит на 440px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> @media (min-width: 440px)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Gap между изображением и текстом</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-16
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px между изображением и текстовой частью (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> gap: 16px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Gap между заголовком и описанием</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-8 md:gap-4
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 8px, Desktop: 4px (токены Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> gap: 8px (mobile), gap: 4px (desktop ≥ 440px)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Интерактивность</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Hover эффект</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  hover:opacity-90 transition-opacity
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Применяется только если передан onClick. Плавное изменение прозрачности до 90%
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> opacity: 0.9 (hover), transition: opacity (плавный переход)
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
        story: "Подробное описание всех используемых дизайн-токенов в компоненте HorizontalCardWeb",
      },
    },
  },
};
