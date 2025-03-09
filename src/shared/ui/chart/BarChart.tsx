// widgets/charts/index.tsx
import React from 'react';
import { BarChart as MantineBarChart } from '@mantine/charts';
import { Box, Text } from '@mantine/core';
import styled from 'styled-components';
import { ChartContainer } from './style/Chart.styled';

interface ChartProps {
  data: Array<{ [key: string]: any }>;
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  title?: string;
}

// 바 차트 컴포넌트
export const BarChart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  color = '#ae3ec9',
  height = 300,
  title,
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
      <MantineBarChart
        h={title ? height - 30 : height}
        data={data}
        dataKey={xKey}
        series={[{ name: yKey, color: color }]}
        withLegend
        legendProps={{
          verticalAlign: 'top',
          wrapperStyle: { display: 'flex', justifyContent: 'flex-end' },
        }}
        gridAxis="xy"
        withTooltip
        barProps={{ radius: 4 }}
        yAxisProps={{
          width: 50,
          tickLine: false,
          axisLine: false,
        }}
      />
    </ChartContainer>
  );
};
