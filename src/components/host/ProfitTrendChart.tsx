'use client';

import { useMemo } from 'react';
import { Typography } from 'antd';
import type { DailyRevenuePoint } from '@/utils/bookingMetrics';

const { Text } = Typography;

type ProfitTrendChartProps = {
  data: DailyRevenuePoint[];
  height?: number;
};

const ProfitTrendChart = ({ data, height = 260 }: ProfitTrendChartProps) => {
  const { path, area, maxValue, ticks } = useMemo(() => {
    if (!data.length) {
      return {
        path: '',
        area: '',
        maxValue: 0,
        ticks: { y: [0], x: [0] },
      };
    }

    const max = Math.max(...data.map((point) => point.total), 0);
    const safeMax = max > 0 ? max : 1;
    const chartWidth = 90;
    const chartHeight = 80;
    const offsetX = 5;
    const offsetY = 10;

    const coordinates = data.map((point, idx) => {
      const x =
        data.length > 1
          ? offsetX + (idx / (data.length - 1)) * chartWidth
          : offsetX + chartWidth / 2;
      const y =
        offsetY + chartHeight - (Math.min(point.total, safeMax) / safeMax) * chartHeight;
      return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
    });

    const linePath = coordinates
      .map(({ x, y }, idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${y}`)
      .join(' ');

    const areaPath = `${linePath} L ${offsetX + chartWidth} ${offsetY + chartHeight} L ${offsetX} ${
      offsetY + chartHeight
    } Z`;

    const yTicks = [0, safeMax / 2, safeMax].map((value) => ({
      value,
      y: Number(
        (
          offsetY +
          chartHeight -
          (Math.min(value, safeMax) / safeMax) * chartHeight
        ).toFixed(2)
      ),
    }));

    const xTicks = [0, 10, 20, 30]
      .filter((tick) => tick <= data[data.length - 1].daysAgo)
      .map((tick) => {
        const index = data.findIndex((point) => point.daysAgo === tick);
        if (index === -1) {
          return null;
        }
        const x =
          data.length > 1
            ? offsetX + (index / (data.length - 1)) * chartWidth
            : offsetX + chartWidth / 2;
        return { value: tick, x: Number(x.toFixed(2)) };
      })
      .filter(Boolean) as { value: number; x: number }[];

    return {
      path: linePath,
      area: areaPath,
      maxValue: max,
      ticks: { y: yTicks, x: xTicks },
    };
  }, [data]);

  return (
    <div
      style={{
        width: '100%',
        height,
        position: 'relative',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="img"
        aria-label="Profit trend over the last 30 days"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="profit-area-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#bae7ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e6f7ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Axes */}
        <line
          x1="5"
          y1="90"
          x2="95"
          y2="90"
          stroke="#d9d9d9"
          strokeWidth="0.6"
        />
        <line
          x1="5"
          y1="10"
          x2="5"
          y2="90"
          stroke="#d9d9d9"
          strokeWidth="0.6"
        />

        {/* Y-axis ticks */}
        {ticks.y.map(({ value, y }) => (
          <g key={`y-tick-${value}`}>
            <line x1="4.5" y1={y} x2="5" y2={y} stroke="#999" strokeWidth="0.6" />
            <text
              x="3.5"
              y={y + 1.5}
              fontSize="4"
              textAnchor="end"
              fill="#999"
            >
              ${value.toFixed(0)}
            </text>
            <line
              x1="5"
              y1={y}
              x2="95"
              y2={y}
              stroke="#f0f0f0"
              strokeWidth="0.3"
            />
          </g>
        ))}

        {/* X-axis ticks */}
        {ticks.x.map(({ value, x }) => (
          <g key={`x-tick-${value}`}>
            <line x1={x} y1="90" x2={x} y2="90.5" stroke="#999" strokeWidth="0.6" />
            <text
              x={x}
              y="94"
              fontSize="4"
              textAnchor="middle"
              fill="#999"
            >
              {value}
            </text>
          </g>
        ))}

        {/* Area */}
        <path
          d={area}
          fill="url(#profit-area-gradient)"
          opacity={0.8}
        />

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke="#1890ff"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Data points */}
        {data.map((point, idx) => {
          if (maxValue === 0) {
            return null;
          }
          const chartWidth = 90;
          const chartHeight = 80;
          const offsetX = 5;
          const offsetY = 10;
          const x =
            data.length > 1
              ? offsetX + (idx / (data.length - 1)) * chartWidth
              : offsetX + chartWidth / 2;
          const y =
            offsetY +
            chartHeight -
            (Math.min(point.total, maxValue) / maxValue) * chartHeight;
          return (
            <g key={`point-${point.daysAgo}`}>
              <circle cx={x} cy={y} r="0.9" fill="#1890ff">
                <title>
                  {`${point.total.toFixed(2)} USD on ${
                    new Date(point.date).toDateString()
                  } (${point.daysAgo} days ago)`}
                </title>
              </circle>
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 12px',
        }}
      >
        <Text type="secondary">Days ago</Text>
        <Text type="secondary">Profit ($)</Text>
      </div>
    </div>
  );
};

export default ProfitTrendChart;
