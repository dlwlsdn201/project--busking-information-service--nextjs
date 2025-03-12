// widgets/charts/index.tsx
import React from 'react';
import { DonutChart } from '@mantine/charts';
import { Text } from '@mantine/core';
import { ChartContainer } from './style/Chart.styled';

// 도넛 차트 컴포넌트 (파이 차트 대체)
interface SharedDonutChartProps {
  data: Array<{ id: string; value: number; label: string; color: string }>;
  size: number;
  height?: number;
  title?: string;
  labelsType?: 'value' | 'percent';
}

export const SharedDonutChart: React.FC<SharedDonutChartProps> = ({
  data,
  size,
  height = 250,
  title,
  labelsType = 'value',
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
    color: item.color, // Mantine이 자동으로 색상 할당
  }));

  return (
    <ChartContainer className="donutChart-container" height={height}>
      {title && (
        <Text size="sm" mb="xs">
          {title}
        </Text>
      )}
      <DonutChart
        size={size}
        // h={title ? height - 30 : height}
        data={chartData}
        withLabels
        withTooltip
        thickness={size * 0.2}
        tooltipDataSource="all"
        labelsType={labelsType}
        tooltipProps={{
          offset: 50,
          animationDuration: 2,
          animationEasing: 'linear',
          isAnimationActive: true,
          position: { x: 100, y: -150 },
        }}
        mx="auto"
        chartLabel={`총 ${data.reduce((acc, curr) => acc + curr.value, 0)}명`}
      />
    </ChartContainer>
  );
};
