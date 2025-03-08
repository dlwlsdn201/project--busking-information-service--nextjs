// widgets/charts/index.tsx
import React from 'react';
import {
  AreaChart,
  BarChart as MantineBarChart,
  DonutChart,
} from '@mantine/charts';
import { Box, Text } from '@mantine/core';
import styled from 'styled-components';

const ChartContainer = styled(Box)<{ height?: number }>`
  height: ${(props) => props.height || 300}px;
  width: 100%;
`;

interface ChartProps {
  data: Array<{ [key: string]: any }>;
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  title?: string;
}

// 에어리어 차트 컴포넌트 (라인 차트와 유사하지만 영역이 채워짐)
export const AreaLineChart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  color = '#4c6ef5',
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
        <Text color="dimmed">데이터가 없습니다</Text>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer height={height}>
      {title && (
        <Text size="sm" weight={500} mb="xs">
          {title}
        </Text>
      )}
      <AreaChart
        h={title ? height - 30 : height}
        data={data}
        dataKey={xKey}
        series={[{ name: yKey, color: color }]}
        curveType="natural"
        withLegend
        legendProps={{ verticalAlign: 'bottom', height: 40 }}
        gridAxis="xy"
        withTooltip
        tooltipProps={{ color }}
        strokeWidth={2}
        yAxisProps={{
          width: 50,
          tickLine: false,
          axisLine: false,
        }}
      />
    </ChartContainer>
  );
};
