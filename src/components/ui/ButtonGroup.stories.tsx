import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, type ButtonGroupProps } from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "default",
        "play",
        "navigation",
        "2-buttons",
        "2-buttons-vertical",
        "3-buttons-vertical",
        "3-buttons-vertical-2",
        "navigation-2",
        "button-checkbox",
      ],
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: { type: "radio" },
      options: [4, 8],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    type: "default",
  },
};

export const Play: Story = {
  args: {
    type: "play",
  },
};

export const Navigation: Story = {
  args: {
    type: "navigation",
  },
};

export const TwoButtons: Story = {
  args: {
    type: "2-buttons",
  },
};

export const TwoButtonsVertical: Story = {
  args: {
    type: "2-buttons-vertical",
  },
};

export const ThreeButtonsVertical: Story = {
  args: {
    type: "3-buttons-vertical",
  },
};

export const ThreeButtonsVertical2: Story = {
  args: {
    type: "3-buttons-vertical-2",
  },
};

export const Navigation2: Story = {
  args: {
    type: "navigation-2",
  },
};

export const ButtonCheckbox: Story = {
  args: {
    type: "button-checkbox",
  },
};

export const CustomButtons: Story = {
  args: {
    buttons: [
      {
        label: "Отмена",
        variant: "secondary",
        size: "l",
      },
      {
        label: "Сохранить",
        variant: "primary",
        size: "l",
      },
    ],
    orientation: "horizontal",
    gap: 8,
  },
};

export const CustomVertical: Story = {
  args: {
    buttons: [
      {
        label: "Основное действие",
        variant: "primary",
        size: "l",
      },
      {
        label: "Вторичное действие",
        variant: "secondary",
        size: "l",
      },
      {
        label: "Третичное действие",
        variant: "tertiary",
        size: "l",
      },
    ],
    orientation: "vertical",
    gap: 8,
  },
};

export const WithDisabled: Story = {
  args: {
    buttons: [
      {
        label: "Отключено",
        variant: "primary",
        size: "l",
        disabled: true,
      },
      {
        label: "Активно",
        variant: "primary",
        size: "l",
      },
    ],
    orientation: "horizontal",
    gap: 8,
  },
};
