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

export const Responsive: Story = {
  parameters: {
    docs: {
      disable: true, // Скрываем из Docs, чтобы не вводить в заблуждение
    },
  },
  render: () => (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">Desktop (широкий экран)</h3>
        <div className="max-w-2xl">
          <AudioCardWeb
            title="Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет"
            topBadge="Тэг"
            duration="05:23"
          />
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">Mobile (узкий экран)</h3>
        <div className="max-w-sm">
          <AudioCardWeb
            title="Заголовок может быть в две строки максимально, затем мы его обрезаем, если он не умещается, но таких медитаций у нас нет"
            topBadge="Тэг"
            duration="05:23"
          />
        </div>
      </div>
    </div>
  ),
};
