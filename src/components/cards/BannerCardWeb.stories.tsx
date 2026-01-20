import type { Meta, StoryObj } from "@storybook/react";
import { BannerCardWeb, type BannerCardWebProps } from "./banner-card-web";

const meta: Meta<typeof BannerCardWeb> = {
  title: "Cards/BannerCardWeb",
  component: BannerCardWeb,
  tags: ["autodocs"],
  parameters: {
    // По умолчанию показываем мобильную версию
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Баннерная карточка для отображения контента согласно дизайну из Figma.

**Адаптивность:**
- **Mobile** (< 440px): ширина растягивается под экран, padding **24px 32px**, gap **12px**
- **Desktop** (≥ 440px): максимальная ширина **756px**, padding **32px 64px**, gap **12px**, высота адаптируется под текст

**Особенности:**
- В десктопной версии есть 2 фоновые SVG (Vector 810 и Vector 811)
- В мобильной версии фоновых SVG нет
- Переключения между светлой и темной темой нет (только темный фон #22263B)
- Компонент Highlight обязателен и отображается перед заголовком
  - Компонент Highlight ограничивается родительским контейнером (max-width: 100%)
  - Когда достигает ограничения родителя, компонент перестает расширяться
  - Векторы (листья) остаются видимыми по краям (не сжимаются)
  - Текст обрезается без многоточия, если не помещается между векторами
- Заголовок максимум на 2 строки, далее обрезается в троеточие
- Описание максимум 2 строки на десктопе и 3 в мобилке, далее обрезается в троеточие

**Figma:** [BannerCardWeb](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=9924-76996&t=iWJmLoiT7vqKsn1t-1)
        `,
      },
    },
  },
  args: {
    highlightText: "слово или фраза",
    title: "Заголовок блока максимум в 2 строки",
    description: "Описание предложения максимум в 3 строки на мобилке и 2 на десктопе",
  },
  argTypes: {
    highlightText: {
      control: { type: "text" },
      description: "Текст для компонента Highlight (обязательно)",
    },
    title: {
      control: { type: "text" },
      description: "Заголовок карточки (максимум 2 строки)",
    },
    description: {
      control: { type: "text" },
      description: "Описание под заголовком (обязательно, максимум 2 строки на desktop, 3 на mobile)",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BannerCardWeb>;

export const Default: Story = {
  args: {
    highlightText: "слово или фраза",
    title: "Заголовок блока максимум в 2 строки",
    description: "Описание предложения максимум в 3 строки на мобилке и 2 на десктопе",
  },
};

export const Clickable: Story = {
  args: {
    highlightText: "слово или фраза",
    title: "Заголовок блока максимум в 2 строки",
    description: "Описание предложения максимум в 3 строки на мобилке и 2 на десктопе",
    onClick: () => {
      alert("Баннер кликнут!");
    },
  },
};

export const LongTitle: Story = {
  args: {
    highlightText: "слово или фраза",
    title: "Очень длинный заголовок который должен обрезаться после двух строк и показывать многоточие если текст не умещается в отведенное пространство карточки",
    description: "Описание предложения максимум в 3 строки на мобилке и 2 на десктопе",
  },
};

export const LongDescription: Story = {
  args: {
    highlightText: "слово или фраза",
    title: "Заголовок блока максимум в 2 строки",
    description: "Очень длинное описание которое должно обрезаться после двух строк на десктопе и трех строк на мобилке и показывать многоточие если текст не умещается в отведенное пространство карточки баннера",
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
                  bg-[#22263B]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Темный фон без переключения темы
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> background-color: #22263B
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
                <h4 className="text-label-m font-medium mb-4">Отступы (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-24 px-32
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  padding: 24px 32px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> padding-top: 24px, padding-bottom: 24px, padding-left: 32px, padding-right: 32px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:p-32 md:px-64
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  padding: 32px 64px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> padding-top: 32px, padding-bottom: 32px, padding-left: 64px, padding-right: 64px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Промежутки между элементами</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-12
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  12px между элементами (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> gap: 12px
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
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-auto
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Высота адаптируется под текст
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> height: auto
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Фоновые SVG (только Desktop)</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Vector 810</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  left: -70px, top: -209.92px, width: 359.39px, height: 433.14px, opacity: 0.06
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Левая фоновая SVG декорация
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Vector 811</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  left: 446.61px, top: -189.92px, width: 359.39px, height: 433.14px, opacity: 0.06
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Правая фоновая SVG декорация
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
                  banner-card-title font-medium font-euclid text-[#FFFFFF]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/M, Medium, Euclid Circular A, белый цвет
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 20px, line-height: 1.2em, font-weight: 500 (Medium), color: #FFFFFF, letter-spacing: -0.01em (-1%), text-align: center
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  banner-card-title font-medium font-euclid text-[#FFFFFF]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/L, Medium, Euclid Circular A, белый цвет
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 24px, line-height: 1.3333333333333333em, font-weight: 500 (Medium), color: #FFFFFF, letter-spacing: -0.015em (-1.5%), text-align: center
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Описание (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  banner-card-description font-regular font-euclid text-[rgba(255,255,255,0.8)] line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Body/S-Regular, Regular, Euclid Circular A, белый цвет с прозрачностью 0.8
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 12px, line-height: 1.3333333333333333em, font-weight: 400 (Regular), color: rgba(255, 255, 255, 0.8), text-align: center, максимум 3 строки
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Описание (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  banner-card-description font-regular font-euclid text-[rgba(255,255,255,0.8)] line-clamp-2
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Body/M-Regular, Regular, Euclid Circular A, белый цвет с прозрачностью 0.8
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 14px, line-height: 1.4285714285714286em, font-weight: 400 (Regular), color: rgba(255, 255, 255, 0.8), text-align: center, максимум 2 строки
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Компонент Highlight</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Структура</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  row, justifyContent: flex-end, alignItems: center, gap: 8px
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Два декоративных вектора по бокам, текст в центре
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Поведение при ограничении</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  max-w-full, min-w-0
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Компонент ограничивается родительским контейнером. Когда достигает ограничения:
                </p>
                <ul className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-2 list-disc list-inside space-y-1">
                  <li>Компонент перестает расширяться</li>
                  <li>Векторы остаются видимыми по краям (не сжимаются благодаря shrink-0)</li>
                  <li>Текст обрезается без многоточия (text-overflow: clip)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Текст</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Caption/S, font-weight: 500, color: rgba(255, 255, 255, 0.8), text-transform: uppercase
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Medium, Euclid Circular A, белый цвет с прозрачностью 0.8, верхний регистр
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 12px, line-height: 1.3333333333333333em, letter-spacing: 0.1em (10%), font-weight: 500 (Medium), color: rgba(255, 255, 255, 0.8)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Векторы</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  width: 9.39px, height: 20px, opacity: 0.4
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Декоративные SVG элементы по бокам текста
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 9.39px, height: 20px, opacity: 0.4 (rgba(255, 255, 255, 0.4))
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
                <h4 className="text-label-m font-medium mb-4">Фоновые SVG</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  hidden md:block
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Фоновые SVG отображаются только на desktop (≥ 440px)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> display: none (mobile), display: block (desktop ≥ 440px)
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
        story: "Подробное описание всех используемых дизайн-токенов в компоненте BannerCardWeb",
      },
    },
  },
};
