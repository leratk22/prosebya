"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  LabelList,
} from "recharts";

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
  {
    name: "Warm Sunset",
    gauge: {
      risk: "#8C2D1D",
      warning: "#FFB800",
      ok: "#6B8E23",
    },
    pie: [
      "#344079",
      "#FFB800",
      "#C64F2B",
      "#F4B344",
      "#8C2D1D",
      "#3D7E8A",
      "#E67E38",
      "#A64B2A",
      "#8D6E63",
    ],
  },
  {
    name: "NYC Subway",
    gauge: {
      risk: "#EE352E",
      warning: "#FFB800",
      ok: "#00933C",
    },
    pie: [
      "#344079",
      "#FFB800",
      "#EE352E",
      "#00933C",
      "#FF6319",
      "#B933AD",
      "#6CBE45",
      "#996633",
      "#A7A9AC",
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

// Данные для Heatmap таблицы (психологические запросы по месяцам)
const HEATMAP_DATA = [
  { category: "Тревожность", values: [25, 25, 50, 62, 53, 57, 52, 56, 111, 73, 109, 114] },
  { category: "Выгорание", values: [18, 18, 35, 28, 24, 18, 25, 16, 37, 33, 40, 32] },
  { category: "Отношения", values: [15, 15, 30, 22, 20, 25, 21, 24, 45, 28, 52, 48] },
  { category: "Самооценка", values: [12, 12, 24, 18, 16, 20, 17, 19, 36, 22, 42, 38] },
];

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];


// Данные для Horizontal Bar Chart (психологические показатели по специалистам)
const HORIZONTAL_BAR_DATA = [
  { specialist: "Психолог-консультант", "Тревожность": 45, "Выгорание": 38, "Отношения": 42, "Самооценка": 35 },
  { specialist: "Клинический психолог", "Тревожность": 28, "Выгорание": 22, "Отношения": 18, "Самооценка": 15 },
];

// Данные для Area Chart (динамика психологических запросов)
const AREA_DATA = [
  { month: "Янв", "Текущий год": 2.5, "Прошлый год": 2.2 },
  { month: "Фев", "Текущий год": 2.8, "Прошлый год": 2.5 },
  { month: "Мар", "Текущий год": 3.2, "Прошлый год": 2.8 },
  { month: "Апр", "Текущий год": 3.5, "Прошлый год": 3.2 },
  { month: "Май", "Текущий год": 3.0, "Прошлый год": 3.5 },
  { month: "Июн", "Текущий год": 3.3, "Прошлый год": 3.8 },
  { month: "Июл", "Текущий год": 3.6, "Прошлый год": 3.4 },
  { month: "Авг", "Текущий год": 3.8, "Прошлый год": 3.6 },
];

// Данные для Combo Chart (консультации)
const COMBO_DATA = [
  { month: "Авг'23", consultations: 1.0, cumulative: 1.0 },
  { month: "Сен'23", consultations: 2.0, cumulative: 2.2 },
  { month: "Окт'23", consultations: 2.8, cumulative: 3.2 },
  { month: "Ноя'23", consultations: 2.2, cumulative: 4.0 },
  { month: "Дек'23", consultations: 2.3, cumulative: 4.5 },
  { month: "Янв'24", consultations: 2.6, cumulative: 4.9 },
  { month: "Фев'24", consultations: 2.4, cumulative: 5.1 },
  { month: "Мар'24", consultations: 2.4, cumulative: 5.4 },
  { month: "Апр'24", consultations: 2.4, cumulative: 5.8 },
  { month: "Май'24", consultations: 2.4, cumulative: 6.3 },
  { month: "Июн'24", consultations: 2.3, cumulative: 6.1 },
  { month: "Июл'24", consultations: 2.7, cumulative: 6.2 },
  { month: "Авг'24", consultations: 2.7, cumulative: 5.8 },
  { month: "Сен'24", consultations: 2.1, cumulative: 6.1 },
  { month: "Окт'24", consultations: 2.5, cumulative: 6.0 },
  { month: "Ноя'24", consultations: 2.7, cumulative: 5.8 },
  { month: "Дек'24", consultations: 2.7, cumulative: 5.8 },
  { month: "Янв'25", consultations: 2.5, cumulative: 5.8 },
  { month: "Фев'25", consultations: 2.6, cumulative: 5.7 },
  { month: "Мар'25", consultations: 2.5, cumulative: 5.6 },
  { month: "Апр'25", consultations: 2.8, cumulative: 5.9 },
  { month: "Май'25", consultations: 3.0, cumulative: 5.9 },
  { month: "Июн'25", consultations: 2.8, cumulative: 6.1 },
  { month: "Июл'25", consultations: 2.4, cumulative: 6.4 },
  { month: "Авг'25", consultations: 2.4, cumulative: 6.4 },
  { month: "Сен'25", consultations: 2.4, cumulative: 6.4 },
  { month: "Окт'25", consultations: 2.4, cumulative: 6.4 },
  { month: "Ноя'25", consultations: 2.4, cumulative: 6.4 },
  { month: "Дек'25", consultations: 1.0, cumulative: 6.4 },
];

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
            Риск
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full md:h-6 md:w-6"
            style={{ backgroundColor: colors.warning }}
          />
          <span className="text-xs md:text-sm" style={{ color: BRAND_TEXT_COLOR }}>
            Предупреждение
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full md:h-6 md:w-6"
            style={{ backgroundColor: colors.ok }}
          />
          <span className="text-xs md:text-sm" style={{ color: BRAND_TEXT_COLOR }}>
            Норма
          </span>
        </div>
      </div>
    </div>
  );
};

// Компонент Horizontal Bar Chart
interface HorizontalBarChartProps {
  colors: string[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ colors }) => {
  const formatAxisValue = (value: number) => {
    if (value === 0) return "0";
    return `${value}`;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={HORIZONTAL_BAR_DATA}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            type="number"
            stroke="#666"
            tickFormatter={formatAxisValue}
            domain={[0, 50]}
            label={{ value: "Количество обращений", position: "insideBottom", offset: -5 }}
          />
          <YAxis dataKey="specialist" type="category" stroke="#666" width={180} />
          <Tooltip />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
            iconSize={12}
            formatter={(value) => (
              <span style={{ color: BRAND_TEXT_COLOR, fontSize: "12px" }}>{value}</span>
            )}
          />
          <Bar dataKey="Тревожность" fill={colors[0] || "#42A5F5"} barSize={40} />
          <Bar dataKey="Выгорание" fill={colors[1] || "#F15D56"} barSize={40} />
          <Bar dataKey="Отношения" fill={colors[2] || "#FFD452"} barSize={40} />
          <Bar dataKey="Самооценка" fill={colors[3] || "#759F45"} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент Area Chart (многослойный)
interface AreaChartComponentProps {
  colors: string[];
  paletteId: string;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ colors, paletteId }) => {
  const formatYAxis = (value: number) => `${value} тыс.`;
  // Используем другие цвета из палитры: оставляем цвет для "Прошлый год" (colors[1]), берем другой для "Текущий год" (colors[2])
  const thisYearColor = colors[2] || "#42A5F5";
  const lastYearColor = colors[1] || "#F15D56";

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={AREA_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" tickFormatter={formatYAxis} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Прошлый год"
            stroke={lastYearColor}
            strokeWidth={2}
            fill={lastYearColor}
            fillOpacity={0.25}
          />
          <Area
            type="monotone"
            dataKey="Текущий год"
            stroke={thisYearColor}
            strokeWidth={2}
            fill={thisYearColor}
            fillOpacity={0.25}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент Combo Chart (столбчатая диаграмма + линейный график)
interface ComboChartProps {
  colors: string[];
}

const ComboChart: React.FC<ComboChartProps> = ({ colors }) => {
  const CustomBarLabel = ({ x, y, width, value }: any) => {
    if (value === undefined) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#666"
        fontSize={11}
        textAnchor="middle"
        dominantBaseline="bottom"
      >
        {value.toFixed(1)}
      </text>
    );
  };

  const CustomLineLabel = ({ x, y, value }: any) => {
    if (value === undefined) return null;
    return (
      <text
        x={x}
        y={y - 10}
        fill="#999"
        fontSize={10}
        textAnchor="middle"
        dominantBaseline="bottom"
      >
        {value.toFixed(1)}
      </text>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={COMBO_DATA}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            height={100}
            stroke="#666"
            interval={0}
          />
          <YAxis stroke="#666" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="consultations"
            fill={colors[2] || "#FFD452"}
            name="консультаций на пользователей"
            label={CustomBarLabel}
          />
          <Line
            type="monotone"
            dataKey="cumulative"
            stroke={colors[0] || "#344079"}
            strokeWidth={2}
            dot={{ fill: colors[0] || "#344079", r: 4 }}
            label={CustomLineLabel}
            name="консультаций на пользователя (нарастающим итогом)"
          />
        </ComposedChart>
      </ResponsiveContainer>
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
        {/* Левая колонка - Gauge Chart */}
        <div className="flex flex-col items-center justify-center rounded-lg border p-10 md:p-12">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            Зоны риска
          </h3>
          <div className="w-full flex-1 flex items-center justify-center">
            <GaugeChart value={GAUGE_VALUE} max={GAUGE_MAX} colors={palette.gauge} />
          </div>
        </div>

        {/* Правая колонка - Pie Chart */}
        <div className="flex flex-col items-center rounded-lg border p-10 md:p-12">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            Топ психологических запросов
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

        {/* Area Chart */}
        <div className="flex flex-col items-center rounded-lg border p-10 md:p-12">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            График с областями: Базовый (многослойный)
          </h3>
          <p className="mb-4 text-sm text-gray-600">Динамика психологических запросов по месяцам</p>
          <div className="w-full flex-1 flex items-center justify-center">
            <AreaChartComponent colors={palette.pie} paletteId={palette.name} />
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="flex flex-col items-center rounded-lg border p-10 md:p-12">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            Психологические показатели по специалистам
          </h3>
          <div className="w-full flex-1 flex items-center justify-center">
            <HorizontalBarChart colors={palette.pie} />
          </div>
        </div>

        {/* Combo Chart */}
        <div className="flex flex-col items-center rounded-lg border p-10 md:p-12 lg:col-span-2">
          <h3 className="mb-8 text-lg font-medium md:mb-10" style={{ color: BRAND_TEXT_COLOR }}>
            Завершенные консультации на 1 обратившегося сотрудника
          </h3>
          <div className="w-full flex-1 flex items-center justify-center">
            <ComboChart colors={palette.pie} />
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
        Психологические запросы по месяцам
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 text-left font-semibold" style={{ color: BRAND_TEXT_COLOR }}>
                Категория запроса
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
          Демонстрация цветовых палитр
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
