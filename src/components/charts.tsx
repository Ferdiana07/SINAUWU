"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  title: string;
  data: ChartData[];
  height?: number;
  showValues?: boolean;
  className?: string;
}

// Weekly labels
const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export function BarChart({ title, data, height = 200, showValues = false, className }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const defaultColors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-cyan-500",
  ];

  return (
    <Card className={cn("border-border/50", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-around gap-2" style={{ height }}>
          {data.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100;
            const color = item.color || defaultColors[index % defaultColors.length];

            return (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                {showValues && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.value}
                  </span>
                )}
                <div className="relative w-full flex-1 flex items-end justify-center">
                  <div
                    className={cn(
                      "w-full max-w-12 rounded-t-lg transition-all duration-500 hover:opacity-80",
                      color
                    )}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Donut Chart Component
interface DonutChartProps {
  title: string;
  data: { label: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
}

export function DonutChart({ title, data, centerLabel, centerValue, size = 180 }: DonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const strokes = useMemo(() => {
    let currentAngle = 0;
    return data.map((item) => {
      const percentage = total > 0 ? (item.value / total) * 100 : 0;
      const dashArray = `${percentage} ${100 - percentage}`;
      const dashOffset = -currentAngle;
      currentAngle += percentage;
      return { ...item, dashArray, dashOffset };
    });
  }, [data, total]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              className="text-muted"
            />
            {/* Data segments */}
            {strokes.map((stroke, index) => (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={stroke.color}
                strokeWidth="20"
                strokeDasharray={stroke.dashArray}
                strokeDashoffset={stroke.dashOffset}
                className="transition-all duration-500"
              />
            ))}
          </svg>
          {/* Center text */}
          {centerValue !== undefined && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{centerValue}</span>
              {centerLabel && <span className="text-xs text-muted-foreground">{centerLabel}</span>}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Line Chart Component
interface LineChartProps {
  title: string;
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  className?: string;
}

export function LineChart({ title, data, height = 160, color = "var(--primary)", className }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1 || 1)) * 100,
    y: 100 - (d.value / maxValue) * 100,
    value: d.value,
    label: d.label,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <Card className={cn("border-border/50", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} className="w-full">
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="0.5" className="text-muted/30" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-muted/30" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="0.5" className="text-muted/30" />

          {/* Area */}
          <path d={areaD} fill={`${color}20`} />

          {/* Line */}
          <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} />
          ))}
        </svg>

        {/* Labels */}
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {data.map((d, i) => (
            <span key={i}>{d.label}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Stats sparkline mini chart
interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export function Sparkline({ data, width = 60, height = 24, color = "var(--primary)", className }: SparklineProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <svg width={width} height={height} className={className}>
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Generate mock data for last 7 days
export function getLast7DaysData(values?: number[]) {
  const today = new Date();
  return WEEKDAYS.map((day, i) => ({
    label: day,
    value: values?.[i] ?? Math.floor(Math.random() * 50) + 10,
  }));
}

// Generate monthly data
export function getMonthlyData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
  return months.map((month, i) => ({
    label: month,
    value: Math.floor(Math.random() * 100) + 20,
  }));
}