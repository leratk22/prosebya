import type { Meta, StoryObj } from "@storybook/react";
import { LongreadCardOldWeb, type LongreadCardOldWebProps } from "./longread-card-old-web";

const meta: Meta<typeof LongreadCardOldWeb> = {
  title: "Cards/LongreadCardOldWeb",
  component: LongreadCardOldWeb,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Карточка для отображения контента согласно дизайну из Figma.

**Адаптивность:**
- **Mobile** (< 440px): ширина подстраивается под экран, высота **200px** (фиксированная)
- **Desktop** (≥ 440px): максимальная ширина **756px**, высота **200px** (фиксированная)

**Особенности:**
- Фиксированная высота 200px для всех размеров экрана
- Автоматический выбор фонового изображения по теме (светлая/темная) и разрешению экрана (1x/2x)
- Фоновые изображения должны быть размещены в \`/public/images/longread-card-old/\`:
  - \`light-1x.png\` - для светлой темы, стандартное разрешение
  - \`light-2x.png\` - для светлой темы, retina дисплеи
  - \`dark-1x.png\` - для темной темы, стандартное разрешение
  - \`dark-2x.png\` - для темной темы, retina дисплеи
- Можно указать свой URL через проп \`backgroundImageUrl\`
- Заголовок максимум 2 строки с обрезкой в многоточие
- Один обязательный тэг (Badge)
- Время в формате MM:SS (обязательное, Badge)
- Поддержка светлой и темной темы

**Figma:** [LongreadCardOldWeb](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=9933-30275&t=iWJmLoiT7vqKsn1t-1)
        `,
      },
    },
  },
  args: {
    title: "Заголовок на две строки, а затем обрезаем его в многоточие, если не умещается",
    tag: "Тэг",
    time: "05:30",
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Заголовок карточки (максимум 2 строки)",
    },
    tag: {
      control: { type: "text" },
      description: "Текст для badge тэга (обязательный)",
    },
    time: {
      control: { type: "text" },
      description: "Время в формате MM:SS (обязательное)",
    },
    backgroundImageUrl: {
      control: { type: "text" },
      description: "URL фонового изображения (опционально)",
    },
    backgroundImageAlt: {
      control: { type: "text" },
      description: "Alt текст для фонового изображения",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LongreadCardOldWeb>;

export const Default: Story = {
  args: {
    title: "Заголовок на две строки, а затем обрезаем его в многоточие, если не умещается",
    tag: "Тэг",
    time: "05:30",
  },
};

export const LongTitle: Story = {
  args: {
    title: "Очень длинный заголовок который должен обрезаться после двух строк и показывать многоточие если текст не умещается в отведенное пространство карточки и продолжается дальше",
    tag: "Тэг",
    time: "03:20",
  },
};

export const ShortTitle: Story = {
  args: {
    title: "Короткий заголовок",
    tag: "Тэг",
    time: "01:15",
  },
};

export const Clickable: Story = {
  args: {
    title: "Заголовок на две строки, а затем обрезаем его в многоточие, если не умещается",
    tag: "Тэг",
    time: "08:00",
    onClick: () => {
      alert("Карточка кликнута!");
    },
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <div className="dark bg-light-bg-primary p-16 md:p-24">
      <LongreadCardOldWeb {...args} />
    </div>
  ),
  args: {
    title: "Заголовок на две строки, а затем обрезаем его в многоточие, если не умещается",
    tag: "Тэг",
    time: "15:30",
  },
  parameters: {
    backgrounds: {
      default: "dark",
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
                  bg-light-bg-primary dark:bg-dark-bg-primary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  #FFFFFF (светлая тема), #22263B (темная тема)
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  border-[rgba(52,64,121,0.14)] dark:border-[rgba(255,255,255,0.14)]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  rgba(52, 64, 121, 0.14) — светлая, rgba(255, 255, 255, 0.14) — темная
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-[200px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  200px для всех размеров экрана
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">Макс. ширина (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  w-full md:max-w-[756px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  756px при ширине экрана ≥ 440px
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Отступы и сетка</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Padding</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-16 md:p-20
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 16px, Desktop: 20px
                </p>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Gap</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-16
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px между бейджами и заголовком
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-old-title font-medium line-clamp-2
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: MVP2.0/Title/M (20px/1.2), Desktop: MVP2.0/Title/L (24px/1.333), Medium, максимум 2 строки
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> Mobile: font-size: 20px, line-height: 1.2em, font-weight: 500 (Medium), letter-spacing: -0.01em (-1%); Desktop: font-size: 24px, line-height: 1.333em, font-weight: 500 (Medium), letter-spacing: -0.015em (-1.5%)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Бейджи</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Badge</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Badge variant="default"
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Светлая тема: brand-blue-alpha-10 / brand-blue
                </p>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-2">
                  Темная тема: core-inverted-alpha-10 / core-inverted
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Фоновое изображение</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">CSS класс</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-old-bg
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Автовыбор по теме и 1x/2x через media queries
                </p>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-2">
                  /public/images/longread-card-old/light-1x.png, light-2x.png, dark-1x.png, dark-2x.png
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
        story: "Подробное описание дизайн-токенов и ключевых стилей карточки.",
      },
    },
  },
};
