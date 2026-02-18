import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, type SpinnerProps } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Primitives/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    size: 16,
    "aria-label": "Загрузка",
    role: "status",
  },
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Размер спиннера в пикселях",
    },
    className: {
      control: { type: "text" },
      description: "Дополнительные классы Tailwind",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args: SpinnerProps) => (
    <div className="flex items-center gap-16">
      <Spinner {...args} size={12} />
      <Spinner {...args} size={16} />
      <Spinner {...args} size={20} />
      <Spinner {...args} size={24} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Примеры типовых размеров спиннера.",
      },
    },
  },
};
