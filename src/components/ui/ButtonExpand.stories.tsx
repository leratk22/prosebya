import type { Meta, StoryObj } from "@storybook/react";
import { ButtonExpand } from "./button-expand";

const meta: Meta<typeof ButtonExpand> = {
  title: "UI/ButtonExpand",
  component: ButtonExpand,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["m", "s"],
    },
    count: {
      control: { type: "number" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonExpand>;

export const Default: Story = {
  args: {
    label: "Label",
    count: 0,
    size: "m",
  },
};

export const WithCount: Story = {
  args: {
    label: "Label",
    count: 5,
    size: "m",
  },
};

export const SizeM: Story = {
  args: {
    label: "Label",
    count: 10,
    size: "m",
  },
};

export const SizeS: Story = {
  args: {
    label: "Label",
    count: 3,
    size: "s",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    count: 5,
    size: "m",
    disabled: true,
  },
};

export const Pressed: Story = {
  args: {
    label: "Label",
    count: 7,
    size: "m",
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

export const LargeCount: Story = {
  args: {
    label: "Label",
    count: 99,
    size: "m",
  },
};

export const NoCount: Story = {
  args: {
    label: "Label",
    count: undefined,
    size: "m",
  },
};
