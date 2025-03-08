// widgets/charts/index.tsx
import React from 'react';
import { DonutChart } from '@mantine/charts';
import { Box, Text } from '@mantine/core';
import styled from 'styled-components';

const ChartContainer = styled(Box)<{ height?: number }>`
  height: ${(props) => props.height || 300}px;
  width: 100%;
`;

// 도넛 차트 컴포넌트 (파이 차트 대체)
interface PieChartProps {
  data: Array<{ id: string; value: number; label: string }>;
  height?: number;
  title?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
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

  // Mantine DonutChart 형식에 맞게 데이터 변환
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.value,
    color: undefined, // Mantine이 자동으로 색상 할당
  }));

  return (
    <ChartContainer height={height}>
      {title && (
        <Text size="sm" weight={500} mb="xs">
          {title}
        </Text>
      )}
      <DonutChart
        h={title ? height - 30 : height}
        data={chartData}
        withLabels
        withTooltip
        padAngle={0.5}
        thickness={30}
        hoverEasing="elastic"
        tooltipDataSource="segment"
        chartLabel={`총 ${data.reduce((acc, curr) => acc + curr.value, 0)}명`}
        labelProps={{ size: 'sm' }}
        legendProps={{
          position: 'right',
          verticalAlign: 'middle',
        }}
      />
    </ChartContainer>
  );
};
