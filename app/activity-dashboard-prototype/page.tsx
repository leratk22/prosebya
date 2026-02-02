"use client";

import * as React from "react";
import { ActivityDashboard } from "@/components/activity-dashboard/ActivityDashboard";

export default function ActivityDashboardPrototypePage() {
  const [cardioLoad, setCardioLoad] = React.useState(0);
  const [cardioLoadHasTarget, setCardioLoadHasTarget] = React.useState(false);
  const [exerciseDays, setExerciseDays] = React.useState([
    true,
    false,
    true,
    true,
    false,
    false,
    true,
  ]);
  const [lastWorkout] = React.useState({
    type: "Workout",
    time: "10:38 PM",
    calories: 0,
    minutes: 0,
  });
  const [activeZoneMinutes, setActiveZoneMinutes] = React.useState(0);
  const [activeZoneTarget, setActiveZoneTarget] = React.useState(150);

  return (
    <div className="min-h-screen bg-gray-light dark:bg-dark-bg-primary">
      <div className="max-w-[932px] mx-auto py-16 md:py-24">
        {/* Контроллеры для тестирования */}
        <div className="mb-24 px-16 md:px-24">
          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 border border-light-border-primary dark:border-dark-border-primary">
            <h2 className="text-title-m font-medium mb-16 text-light-fg-primary dark:text-dark-fg-primary">
              Контроллеры для тестирования
            </h2>
            
            <div className="space-y-16">
              {/* Cardio Load Control */}
              <div>
                <label className="block text-label-m font-medium mb-8 text-light-fg-primary dark:text-dark-fg-primary">
                  Cardio Load: {cardioLoad} bpm
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={cardioLoad}
                  onChange={(e) => setCardioLoad(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Exercise Days Control */}
              <div>
                <label className="block text-label-m font-medium mb-8 text-light-fg-primary dark:text-dark-fg-primary">
                  Exercise Days (кликните на день, чтобы переключить)
                </label>
                <div className="flex gap-8">
                  {exerciseDays.map((hasExercise, index) => {
                    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          const newDays = [...exerciseDays];
                          newDays[index] = !newDays[index];
                          setExerciseDays(newDays);
                        }}
                        className={`px-12 py-8 rounded-s text-label-s font-medium transition-colors ${
                          hasExercise
                            ? "bg-light-fg-feedback-positive dark:bg-dark-fg-feedback-positive text-light-fg-inverted-primary dark:text-dark-fg-inverted-primary"
                            : "bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-fg-tertiary dark:text-dark-fg-tertiary border border-light-border-primary dark:border-dark-border-primary"
                        }`}
                      >
                        {dayNames[index]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Zone Minutes Control */}
              <div>
                <label className="block text-label-m font-medium mb-8 text-light-fg-primary dark:text-dark-fg-primary">
                  Active Zone Minutes: {activeZoneMinutes} / {activeZoneTarget}
                </label>
                <input
                  type="range"
                  min="0"
                  max={activeZoneTarget * 2}
                  value={activeZoneMinutes}
                  onChange={(e) => setActiveZoneMinutes(Number(e.target.value))}
                  className="w-full mb-8"
                />
                <label className="block text-label-m font-medium mb-8 text-light-fg-primary dark:text-dark-fg-primary">
                  Target: {activeZoneTarget} min
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={activeZoneTarget}
                  onChange={(e) => setActiveZoneTarget(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Dashboard */}
        <ActivityDashboard
          cardioLoad={cardioLoad}
          cardioLoadHasTarget={cardioLoadHasTarget}
          exerciseDays={exerciseDays}
          lastWorkout={lastWorkout}
          activeZoneMinutes={activeZoneMinutes}
          activeZoneTarget={activeZoneTarget}
        />
      </div>
    </div>
  );
}
