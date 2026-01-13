import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ButtonPlayPause, type ButtonPlayPauseProps } from "./button-play-pause";

const meta: Meta<typeof ButtonPlayPause> = {
  title: "UI/ButtonPlayPause",
  component: ButtonPlayPause,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: { type: "radio" },
      options: ["play", "pause"],
    },
    size: {
      control: { type: "select" },
      options: [32, 56, 72],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonPlayPause>;

export const Play: Story = {
  args: {
    state: "play",
    size: 56,
  },
};

export const Pause: Story = {
  args: {
    state: "pause",
    size: 56,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      <ButtonPlayPause state="play" size={32} />
      <ButtonPlayPause state="play" size={56} />
      <ButtonPlayPause state="play" size={72} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      <ButtonPlayPause state="play" size={56} />
      <ButtonPlayPause state="pause" size={56} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState<"play" | "pause">("play");
    return (
      <div className="flex flex-col items-center gap-16">
        <ButtonPlayPause
          state={state}
          size={56}
          onToggle={(newState) => setState(newState)}
        />
        <p className="text-body-m text-light-fg-secondary">
          Текущее состояние: {state}
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">Play (32px, 56px, 72px)</h3>
        <div className="flex items-center gap-16">
          <ButtonPlayPause state="play" size={32} />
          <ButtonPlayPause state="play" size={56} />
          <ButtonPlayPause state="play" size={72} />
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">Pause (32px, 56px, 72px)</h3>
        <div className="flex items-center gap-16">
          <ButtonPlayPause state="pause" size={32} />
          <ButtonPlayPause state="pause" size={56} />
          <ButtonPlayPause state="pause" size={72} />
        </div>
      </div>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div className="flex flex-col gap-24 p-24">
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">На светлом фоне</h3>
        <div className="flex items-center gap-16 p-24 bg-light-bg-secondary rounded-m">
          <ButtonPlayPause state="play" size={56} />
          <ButtonPlayPause state="pause" size={56} />
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">На темном фоне</h3>
        <div className="flex items-center gap-16 p-24 bg-dark-bg-primary rounded-m">
          <ButtonPlayPause state="play" size={56} />
          <ButtonPlayPause state="pause" size={56} />
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">На изображении (для демонстрации blur эффекта)</h3>
        <div
          className="flex items-center gap-16 p-24 rounded-m relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            minHeight: "200px",
          }}
        >
          <ButtonPlayPause state="play" size={56} />
          <ButtonPlayPause state="pause" size={56} />
        </div>
      </div>
    </div>
  ),
};
