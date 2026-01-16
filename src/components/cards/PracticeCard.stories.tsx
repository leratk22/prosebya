import type { Meta, StoryObj } from "@storybook/react";
import { PracticeCard, type PracticeCardProps } from "./practice-card";

const meta: Meta<typeof PracticeCard> = {
  title: "Cards/PracticeCard",
  component: PracticeCard,
  tags: ["autodocs"],
  parameters: {
    // По умолчанию показываем мобильную версию
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Горизонтальная карточка для отображения практик/контента согласно дизайну из Figma.

**Адаптивность:**
- **Mobile** (< 440px): высота **235px**, изображение справа (136px), текст слева
- **Desktop** (≥ 440px): высота **251px**, максимальная ширина **756px**, изображение справа (120px), текст слева

**Особенности:**
- Заголовок обрезается после 3 строк многоточием (line-clamp-3)
- Декоративный SVG элемент на фоне (только desktop, прикреплен к правому краю)
- Subtitle на desktop как текст (Caption/S, uppercase), на mobile как badge
- Badge с длительностью на изображении (опционально)
- Поддержка светлой и темной темы
- Весь блок кликабельный при наведении (если передан onClick)

**Figma:** [PracticeCard](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=9892-27155&t=iWJmLoiT7vqKsn1t-1)
        `,
      },
    },
  },
  args: {
    subtitle: "Практика",
    title: "Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился",
    label: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    duration: "05:23",
  },
  argTypes: {
    subtitle: {
      control: { type: "text" },
      description: "Подзаголовок карточки",
    },
    title: {
      control: { type: "text" },
      description: "Заголовок карточки (максимум 3 строки)",
    },
    label: {
      control: { type: "text" },
      description: "Текстовая метка под заголовком (опционально)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "URL изображения для правой части (1x)",
    },
    imageUrl2x: {
      control: { type: "text" },
      description: "URL изображения для правой части (2x, retina)",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Alt текст для изображения",
    },
    duration: {
      control: { type: "text" },
      description: "Длительность в формате MM:SS (отображается в Badge на изображении)",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PracticeCard>;

export const Default: Story = {
  args: {
    subtitle: "Практика",
    title: "Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился",
    label: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    duration: "05:23",
    imageUrl: "/practice-images/practice-image-1x.png",
    imageUrl2x: "/practice-images/practice-image-2x.png",
    imageAlt: "Практика медитации",
  },
};

export const WithImage: Story = {
  args: {
    subtitle: "Практика",
    title: "Медитация для сна",
    label: "Помочь себе за 2 минуты",
    imageUrl: "/practice-images/practice-image-1x.png",
    imageUrl2x: "/practice-images/practice-image-2x.png",
    imageAlt: "Медитация",
    duration: "10:45",
  },
};

export const Clickable: Story = {
  args: {
    subtitle: "Практика",
    title: "Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился",
    label: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    duration: "05:23",
    imageUrl: "/practice-images/practice-image-1x.png",
    imageUrl2x: "/practice-images/practice-image-2x.png",
    imageAlt: "Релаксация",
    onClick: () => {
      alert("Карточка кликнута!");
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    subtitle: "Практика",
    title: "Короткий заголовок",
    duration: "03:15",
    imageUrl: "/practice-images/practice-image-1x.png",
    imageUrl2x: "/practice-images/practice-image-2x.png",
    imageAlt: "Глубокий релакс",
  },
};

export const LongTitle: Story = {
  args: {
    subtitle: "Практика",
    title: "Очень длинный заголовок который должен обрезаться после трех строк и показывать многоточие если текст не умещается в отведенное пространство карточки",
    label: "Описание",
    duration: "12:34",
    imageUrl: "/practice-images/practice-image-1x.png",
    imageUrl2x: "/practice-images/practice-image-2x.png",
    imageAlt: "Самостоятельная забота",
  },
};

export const WithPlaceholder: Story = {
  args: {
    subtitle: "Практика",
    title: "Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился",
    label: "Описание в 1 строку в зависимости от типа контента (необязательно)",
    duration: "05:23",
    // imageUrl не передан - должна отображаться заглушка
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка с заглушкой вместо изображения. Заглушка отображается автоматически, когда imageUrl не передан или произошла ошибка загрузки изображения.",
      },
    },
  },
};

export const ThemesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div>
        <h3 className="text-title-m font-semibold mb-16">Светлая тема</h3>
        <div className="bg-light-bg-primary p-24 rounded-m">
          <PracticeCard
            subtitle="Практика"
            title="Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился"
            label="Описание в 1 строку в зависимости от типа контента (необязательно)"
            duration="05:23"
            imageUrl="/practice-images/practice-image-1x.png"
            imageUrl2x="/practice-images/practice-image-2x.png"
            imageAlt="Медитация"
          />
        </div>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-16">Темная тема</h3>
        <div className="dark bg-light-bg-primary p-24 rounded-m">
          <PracticeCard
            subtitle="Практика"
            title="Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился"
            label="Описание в 1 строку в зависимости от типа контента (необязательно)"
            duration="05:23"
            imageUrl="/practice-images/practice-image-1x.png"
            imageUrl2x="/practice-images/practice-image-2x.png"
            imageAlt="Медитация"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const PlaceholderThemesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div>
        <h3 className="text-title-m font-semibold mb-16">Светлая тема (с заглушкой)</h3>
        <div className="bg-light-bg-primary p-24 rounded-m">
          <PracticeCard
            subtitle="Практика"
            title="Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился"
            label="Описание в 1 строку в зависимости от типа контента (необязательно)"
            duration="05:23"
          />
        </div>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-16">Темная тема (с заглушкой)</h3>
        <div className="dark bg-light-bg-primary p-24 rounded-m">
          <PracticeCard
            subtitle="Практика"
            title="Заголовок максимум в 3 строки, далее обрезка в многоточие, если текст не уместился"
            label="Описание в 1 строку в зависимости от типа контента (необязательно)"
            duration="05:23"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Сравнение карточек с заглушкой в светлой и темной теме. Заглушка отображается автоматически, когда imageUrl не передан.",
      },
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
                  #FFFFFF (светлая тема), #22263b (темная тема)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  border-light-border-secondary dark:border-dark-border-secondary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  rgba(34, 38, 59, 0.1) - светлая тема, rgba(255, 255, 255, 0.1) - темная тема
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-[235px] md:h-[251px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 235px, Desktop: 251px
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
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Изображение</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Ширина</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  w-[136px] md:w-[120px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: 136px, Desktop: 120px
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Subtitle (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  text-light-fg-secondary dark:text-dark-fg-secondary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Caption/S, fontSize: 12px, lineHeight: 1.333em, letterSpacing: 0.1em (10%), uppercase
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Subtitle Badge (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-core-alpha-5 dark:bg-core-inverted-alpha-10
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  rgba(34, 38, 59, 0.05) - светлая тема, rgba(255, 255, 255, 0.1) - темная тема
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  text-[20px] leading-[1.2em] tracking-[-0.01em] font-medium
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/M, fontSize: 20px, lineHeight: 1.2em, letterSpacing: -1%, font-weight: 500 (Medium)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 20px, line-height: 1.2em, font-weight: 500 (Medium), letter-spacing: -0.01em (-1%)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:text-[24px] md:leading-[1.333em] md:tracking-[-0.015em] font-medium
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/L, fontSize: 24px, lineHeight: 1.333em, letterSpacing: -1.5%, font-weight: 500 (Medium)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 24px, line-height: 1.333em, font-weight: 500 (Medium), letter-spacing: -0.015em (-1.5%)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Label</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  text-[12px] md:text-[14px] text-light-fg-tertiary dark:text-dark-fg-tertiary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Mobile: Body/S-Medium (12px), Desktop: Body/M-Medium (14px)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Badge с длительностью</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Светлая тема</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-[rgba(34,38,59,0.6)] text-[#FFFFFF]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  backgroundColor: rgba(34, 38, 59, 0.6), color: #FFFFFF
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Темная тема</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  dark:bg-[rgba(255,255,255,0.6)] dark:text-[#22263B]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  backgroundColor: rgba(255, 255, 255, 0.6), color: #22263B
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
        story: "Подробное описание всех используемых дизайн-токенов в компоненте PracticeCard",
      },
    },
  },
};
