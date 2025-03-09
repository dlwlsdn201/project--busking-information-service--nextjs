// widgets/charts/index.tsx
import React from 'react';
import { DonutChart } from '@mantine/charts';
import { Text } from '@mantine/core';
import { ChartContainer } from './style/Chart.styled';

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
        <Text c="dimmed">데이터가 없습니다</Text>
      </ChartContainer>
    );
  }

  // Mantine DonutChart 형식에 맞게 데이터 변환
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.value,
    color: '', // Mantine이 자동으로 색상 할당
  }));

  return (
    <ChartContainer height={height}>
      {title && (
        <Text size="sm" mb="xs">
          {title}
        </Text>
      )}
      <DonutChart
        h={title ? height - 30 : height}
        data={chartData}
        withLabels
        withTooltip
        thickness={30}
        tooltipDataSource="segment"
        chartLabel={`총 ${data.reduce((acc, curr) => acc + curr.value, 0)}명`}
      />
    </ChartContainer>
  );
};
