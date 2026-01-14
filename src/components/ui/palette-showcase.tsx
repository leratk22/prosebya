"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Конфигурация палитр
export interface PaletteConfig {
  name: string;
  gauge: {
    risk: string;
    warning: string;
    ok: string;
  };
  pie: string[];
}

export const PALETTES: PaletteConfig[] = [
  {
    name: "Current",
    gauge: {
      risk: "#F15D56",
      warning: "#FFD452",
      ok: "#759F45",
    },
    pie: [
      "#344079",
      "#FFD452",
      "#759F45",
      "#F15D56",
      "#42A5F5",
      "#AB47BC",
      "#26A69A",
      "#FF7043",
      "#78909C",
    ],
  },
  {
    name: "Modern UI",
    gauge: {
      risk: "#FF4D4F",
      warning: "#FFB800",
      ok: "#36CF72",
    },
    pie: [
      "#344079",
      "#FFB800",
      "#36CF72",
      "#FF4D4F",
      "#1890FF",
      "#722ED1",
      "#13C2C2",
      "#EB2F96",
      "#8C8C8C",
    ],
  },
  {
    name: "Enterprise",
    gauge: {
      risk: "#E64848",
      warning: "#FFB800",
      ok: "#2D9C6C",
    },
    pie: [
      "#344079",
      "#FFB800",
      "#2D9C6C",
      "#E64848",
      "#0EA5E9",
      "#6366F1",
      "#F97316",
      "#8B5CF6",
      "#64748B",
    ],
  },
  {
    name: "High Contrast",
    gauge: {
      risk: "#FF3B30",
      warning: "#FFB800",
      ok: "#34C759",
    },
    pie: [
      "#344079",
      "#FFB800",
      "#34C759",
      "#FF3B30",
      "#5856D6",
      "#FF9500",
      "#5AC8FA",
      "#AF52DE",
      "#00C7BE",
    ],
  },
  {
    name: "Soft Pastel",
    gauge: {
      risk: "#FF8A80",
      warning: "#FFD54F",
      ok: "#81C784",
    },
    pie: [
      "#7986CB",
      "#FFD54F",
      "#81C784",
      "#FF8A80",
      "#64B5F6",
      "#9575CD",
      "#F06292",
      "#4DB6AC",
      "#FFB74D",
    ],
  },
];

// Данные для Pie Chart
const PIE_DATA = [
  { name: "Тревожность", value: 25 },
  { name: "Выгорание", value: 18 },
  { name: "Отношения", value: 15 },
  { name: "Самооценка", value: 12 },
  { name: "Депрессия", value: 10 },
  { name: "Поиск себя", value: 8 },
  { name: "Семья", value: 6 },
  { name: "Травмы", value: 4 },
  { name: "Прочее", value: 2 },
];

// Данные для Gauge Chart
const GAUGE_VALUE = 75;
const GAUGE_MAX = 100;

// Брендовые цвета
const BRAND_TEXT_COLOR = "#344079";
const BRAND_PRIMARY = "#FFB800";

// Данные для Heatmap таблицы
const HEATMAP_DATA = [
  { category: "First Class", values: [25, 25, 50, 62, 53, 57, 52, 56, 111, 73, 109, 114] },
  { category: "Same Day", values: [3, 3, 25, 8, 24, 18, 25, 16, 37, 33, 40, 32] },
  { category: "Second Class", values: [38, 34, 78, 55, 59, 74, 63, 71, 134, 75, 143, 140] },
  { category: "Standard Class", values: [112, 100, 201, 218, 233, 215, 198, 198, 406, 236, 461, 416] },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Функция для генерации оттенков желтого цвета
const getYellowShade = (value: number, min: number, max: number): string => {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  
  // Интерполяция между светлым желтым (#FFF9E6) и бренд-желтым (#FFB800)
  const r1 = 255, g1 = 249, b1 = 230; // Светло-желтый (фон)
  const r2 = 255, g2 = 184, b2 = 0; // Бренд-желтый (#FFB800)
  
  const rFinal = Math.round(r1 + (r2 - r1) * normalized);
  const gFinal = Math.round(g1 + (g2 - g1) * normalized);
  const bFinal = Math.round(b1 + (b2 - b1) * normalized);
  
  return `rgb(${rFinal}, ${gFinal}, ${bFinal})`;
};

interface GaugeChartProps {
  value: number;
  max: number;
  colors: {
    risk: string;
    warning: string;
    ok: string;
  };
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, max, colors }) => {
  const height = 40;
  const borderRadius = 8;
  
  // Проценты для зон (складываются в 100%)
  const riskPercent = 33;
  const warningPercent = 33;
  const okPercent = 34;

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      {/* Горизонтальная полоса с тремя зонами */}
      <div className="relative flex w-full overflow-hidden" style={{ height: `${height}px`, borderRadius: `${borderRadius}px` }}>
        {/* Risk зона (слева) */}
        <div
          className="relative flex h-full items-center justify-center"
          style={{
            width: `${riskPercent}%`,
            backgroundColor: colors.risk,
          }}
        >
          <span
            className="rounded px-2 py-0.5 text-sm font-semibold text-white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            {riskPercent}%
          </span>
        </div>
        {/* Warning зона (в центре) */}
        <div
          className="relative flex h-full items-center justify-center"
          style={{
            width: `${warningPercent}%`,
            backgroundColor: colors.warning,
          }}
        >
          <span
            className="rounded px-2 py-0.5 text-sm font-semibold text-white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            {warningPercent}%
          </span>
        </div>
        {/* OK зона (справа) */}
        <div
          className="relative flex h-full items-center justify-center"
          style={{
            width: `${okPercent}%`,
            backgroundColor: colors.ok,
          }}
        >
          <span
            className="rounded px-2 py-0.5 text-sm font-semibold text-white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            {okPercent}%
          </span>
        </div>
      </div>
      
      {/* Легенда внизу, как у круговых графиков */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full md:h-6 md:w-6"
            style={{ backgroundColor: colors.risk }}
          />
          <span className="text-xs md:text-sm" style={{ color: BRAND_TEXT_COLOR }}>
            Risk
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full md:h-6 md:w-6"
            style={{ backgroundColor: colors.warning }}
          />
          <span className="text-xs md:text-sm" style={{ color: BRAND_TEXT_COLOR }}>
            Warning
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full md:h-6 md:w-6"
            style={{ backgroundColor: colors.ok }}
          />
          <span className="text-xs md:text-sm" style={{ color: BRAND_TEXT_COLOR }}>
            OK
          </span>
        </div>
      </div>
    </div>
  );
};

interface PaletteSectionProps {
  palette: PaletteConfig;
}

const PaletteSection: React.FC<PaletteSectionProps> = ({ palette }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="rounded-lg border bg-white p-3 shadow-lg"
          style={{ borderColor: BRAND_TEXT_COLOR }}
        >
          <p className="font-semibold" style={{ color: BRAND_TEXT_COLOR }}>
            {payload[0].name}
          </p>
          <p style={{ color: BRAND_TEXT_COLOR }}>{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Не показываем подписи для маленьких секторов

    const labelText = `${(percent * 100).toFixed(0)}%`;
    const textWidth = labelText.length * 7; // Примерная ширина текста
    const textHeight = 14;
    const padding = 4;

    return (
      <g>
        {/* Темная полупрозрачная плашка */}
        <rect
          x={x - textWidth / 2 - padding}
          y={y - textHeight / 2 - padding / 2}
          width={textWidth + padding * 2}
          height={textHeight + padding}
          rx={4}
          fill="rgba(0, 0, 0, 0.5)"
        />
        {/* Текст */}
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fontWeight="semibold"
        >
          {labelText}
        </text>
      </g>
    );
  };

  return (
    <div className="mb-12 rounded-lg border bg-white p-10 shadow-md md:p-12">
      <h2 className="mb-10 text-2xl font-semibold md:mb-12" style={{ color: BRAND_TEXT_COLOR }}>
        {palette.name}
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Левая колонка - Linear Chart */}
        <div className="flex flex-col items-center justify-center rounded-lg border p-10 md:p-12">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            Risk Zones
          </h3>
          <div className="w-full flex-1 flex items-center justify-center">
            <GaugeChart value={GAUGE_VALUE} max={GAUGE_MAX} colors={palette.gauge} />
          </div>
        </div>

        {/* Правая колонка - Pie Chart */}
        <div className="flex flex-col items-center rounded-lg border p-10 md:p-12">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            Top Psychology Requests
          </h3>
          <div className="w-full flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette.pie[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value) => (
                    <span style={{ color: BRAND_TEXT_COLOR }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface PaletteShowcaseProps {
  palettes?: PaletteConfig[];
}

// Компонент Heatmap таблицы
const HeatmapTable: React.FC = () => {
  // Находим минимальное и максимальное значения для нормализации
  const allValues = HEATMAP_DATA.flatMap((row) => row.values);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  return (
    <div className="mt-12 rounded-lg border bg-white p-10 shadow-md md:p-12">
      <h2 className="mb-8 text-2xl font-semibold md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
        Shipping Mode Orders by Month
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 text-left font-semibold" style={{ color: BRAND_TEXT_COLOR }}>
                Ship Mode
              </th>
              {MONTHS.map((month) => (
                <th
                  key={month}
                  className="border p-3 text-center font-semibold"
                  style={{ color: BRAND_TEXT_COLOR }}
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEATMAP_DATA.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border p-3 font-medium" style={{ color: BRAND_TEXT_COLOR }}>
                  {row.category}
                </td>
                {row.values.map((value, colIndex) => {
                  const backgroundColor = getYellowShade(value, minValue, maxValue);
                  const textColor = value > maxValue * 0.5 ? "#FFFFFF" : BRAND_TEXT_COLOR;
                  return (
                    <td
                      key={colIndex}
                      className="border p-3 text-center font-medium transition-colors"
                      style={{ backgroundColor, color: textColor }}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PaletteShowcase: React.FC<PaletteShowcaseProps> = ({
  palettes = PALETTES,
}) => {
  return (
    <div className="w-full p-6 md:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-3xl font-bold md:mb-12" style={{ color: BRAND_TEXT_COLOR }}>
          Color Palette Showcase
        </h1>
        <div className="space-y-8 md:space-y-10">
          {palettes.map((palette, index) => (
            <PaletteSection key={index} palette={palette} />
          ))}
        </div>
        <HeatmapTable />
      </div>
    </div>
  );
};
