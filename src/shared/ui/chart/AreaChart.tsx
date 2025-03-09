// widgets/charts/index.tsx
import React from 'react';
import { AreaChart, AreaChartSeries } from '@mantine/charts';
import { Text } from '@mantine/core';
import { ChartContainer } from './style/Chart.styled';

interface ChartProps {
  data: Array<{ [key: string]: any }>;
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  title?: string;
  series?: AreaChartSeries[];
  legendFormatter?: (value: string) => string;
}

// 에어리어 차트 컴포넌트 (라인 차트와 유사하지만 영역이 채워짐)
export const AreaLineChart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  color = '#4c6ef5',
  height = 300,
  title,
  series,
  legendFormatter,
}) => {
  if (!data || data.length === 0) {
    return (
      <ChartContainer
        height={height}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text c="dimmed">데이터가 없습니다</Text>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer height={height}>
      {title && (
        <Text size="sm" mb="xs">
          {title}
        </Text>
      )}
      <AreaChart
        h={title ? height - 30 : height}
        data={data}
        dataKey={xKey}
        series={series ?? [{ name: yKey, color }]}
        curveType="natural"
        withLegend
        legendProps={{
          verticalAlign: 'top',
          wrapperStyle: { display: 'flex', justifyContent: 'flex-end' },
          formatter: legendFormatter,
        }}
        gridAxis="xy"
        withTooltip
        strokeWidth={2}
        yAxisProps={{
          width: 50,
          tickLine: true,
          axisLine: false,
        }}
      />
    </ChartContainer>
  );
};
