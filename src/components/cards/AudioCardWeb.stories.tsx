import type { Meta, StoryObj } from "@storybook/react";
import { AudioCardWeb, type AudioCardWebProps } from "./audio-card-web";

const meta: Meta<typeof AudioCardWeb> = {
  title: "Cards/AudioCardWeb",
  component: AudioCardWeb,
  tags: ["autodocs"],
  parameters: {
    // По умолчанию показываем мобильную версию
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Адаптивная карточка для отображения аудио контента.

**Адаптивность:**
- **Mobile** (< 440px): badge сверху, затем заголовок, растягивается по ширине контейнера
- **Desktop** (≥ 440px): заголовок и badge в одной строке, максимальная ширина **756px**

**Особенности:**
- Заголовок обрезается после 2 строк многоточием
- Waveform всегда отображается, одного размера, обрезается по ширине контейнера
- Весь блок кликабельный при наведении (если передан onClick)
        `,
      },
    },
  },
  args: {
    title: "Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет",
    topBadge: "Тэг",
    duration: "MM:SS",
  },
  argTypes: {
    title: {
      control: { type: "text" },
    },
    topBadge: {
      control: { type: "text" },
    },
    duration: {
      control: { type: "text" },
      description: "Длительность в формате MM:SS",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AudioCardWeb>;

export const Default: Story = {
  args: {
    title: "Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет",
    topBadge: "Тэг",
    duration: "05:23",
  },
};

export const Clickable: Story = {
  args: {
    title: "Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет",
    topBadge: "Тэг",
    duration: "05:23",
    onClick: () => {
      alert("Карточка кликнута!");
    },
  },
};

