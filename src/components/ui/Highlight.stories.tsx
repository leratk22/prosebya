import type { Meta, StoryObj } from "@storybook/react";
import { Highlight, type HighlightProps } from "./highlight";

const meta: Meta<typeof Highlight> = {
  title: "UI/Highlight",
  component: Highlight,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Декоративный компонент для выделения текста согласно дизайну из Figma.

**Варианты:**
- **default**: для светлого фона (темные векторы и текст)
  - Векторы: rgba(34, 38, 59, 0.4)
  - Текст: rgba(34, 38, 59, 0.8)
- **inverted**: для темного фона (белые векторы и текст)
  - Векторы: rgba(255, 255, 255, 0.4)
  - Текст: rgba(255, 255, 255, 0.8)

**Особенности:**
- Два декоративных вектора по бокам текста
- Правый вектор зеркально отражен
- Текст в стиле MVP2.0/Caption/S (12px, Medium, Uppercase, letter-spacing: 10%)
- Layout: row, justifyContent: flex-end, alignItems: center, gap: 8px
        `,
      },
    },
  },
  args: {
    children: "слово или фраза",
    variant: "inverted",
    maxLength: 24,
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "inverted"],
      description: "Вариант highlight компонента: default для светлого фона, inverted для темного фона",
    },
    children: {
      control: { type: "text" },
      description: "Текст для highlight компонента (максимум 24 символа по умолчанию)",
    },
    maxLength: {
      control: { type: "number" },
      description: "Максимальное количество символов (по умолчанию 24)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Highlight>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "слово или фраза",
  },
  render: (args) => (
    <div className="bg-light-bg-primary p-24 rounded-m">
      <Highlight {...args} />
    </div>
  ),
};

export const Inverted: Story = {
  args: {
    variant: "inverted",
    children: "слово или фраза",
  },
  render: (args) => (
    <div className="bg-[#22263B] p-24 rounded-m">
      <Highlight {...args} />
    </div>
  ),
};

export const LongText: Story = {
  args: {
    variant: "inverted",
    children: "очень длинный текст который может быть в несколько слов",
    maxLength: 24,
  },
  render: (args) => (
    <div className="bg-[#22263B] p-24 rounded-m">
      <Highlight {...args} />
      <p className="text-body-s text-[rgba(255,255,255,0.6)] mt-8">
        Текст обрезан до 24 символов
      </p>
    </div>
  ),
};

export const ShortText: Story = {
  args: {
    variant: "inverted",
    children: "текст",
  },
  render: (args) => (
    <div className="bg-[#22263B] p-24 rounded-m">
      <Highlight {...args} />
    </div>
  ),
};

export const VariantsComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-24 p-16">
      <div>
        <h3 className="text-title-m font-semibold mb-16">Default (светлый фон)</h3>
        <div className="bg-light-bg-primary p-24 rounded-m">
          <Highlight variant="default">слово или фраза</Highlight>
        </div>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-16">Inverted (темный фон)</h3>
        <div className="bg-[#22263B] p-24 rounded-m">
          <Highlight variant="inverted">слово или фраза</Highlight>
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
            <h3 className="text-title-m font-semibold mb-12">Layout</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Структура</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  flex flex-row items-center justify-end gap-8
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  row, justifyContent: flex-end, alignItems: center, gap: 8px
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Векторы</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Размеры</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  width: 9.39px, height: 20px
                </code>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Цвета (Default)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rgba(34, 38, 59, 0.4)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  core с прозрачностью 0.4
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Цвета (Inverted)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rgba(255, 255, 255, 0.4)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  белый с прозрачностью 0.4
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Зеркальное отражение</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  transform: scaleX(-1)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Правый вектор зеркально отражен
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Стиль</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Caption/S
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  font-size: 12px, line-height: 1.3333333333333333em, font-weight: 500 (Medium)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Межбуквенное расстояние</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  letter-spacing: 0.1em (10%)
                </code>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Регистр</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  text-transform: uppercase
                </code>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Цвета (Default)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rgba(34, 38, 59, 0.8)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  core с прозрачностью 0.8
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Цвета (Inverted)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rgba(255, 255, 255, 0.8)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  белый с прозрачностью 0.8
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
        story: "Подробное описание всех используемых дизайн-токенов в компоненте Highlight",
      },
    },
  },
};
