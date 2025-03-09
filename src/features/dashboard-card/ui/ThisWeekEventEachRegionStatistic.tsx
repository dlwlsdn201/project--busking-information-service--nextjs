import { Skeleton, Text } from '@mantine/core';
import { BarChart } from '@shared/ui/chart';
import { ChartTitle, GradientPaper } from '../style/DashboardCard.styled';

interface Props {
  isLoading: boolean;
}
export const ThisWeekEventEachRegionStatistic: React.FC<Props> = ({
  isLoading,
}) => {
  // 지역별 버스킹 공연 수 차트 데이터
  const SAMPLE_performanceData = [
    { region: '서울', performances: 87 },
    { region: '부산', performances: 42 },
    { region: '대구', performances: 28 },
    { region: '인천', performances: 34 },
    { region: '광주', performances: 22 },
    { region: '대전', performances: 19 },
    { region: '기타', performances: 36 },
  ];

  return (
    <GradientPaper p="md" withBorder>
      <ChartTitle order={4}>지역별 버스킹 공연 수</ChartTitle>
      <Text size="sm" c="dimmed" mb="md">
        이번 주 지역별 버스킹 공연 현황
      </Text>

      {isLoading ? (
        <Skeleton height={250} radius="md" />
      ) : (
        <BarChart
          data={SAMPLE_performanceData}
          xKey="region"
          yKey="performances"
          color="#ae3ec9"
          height={250}
        />
      )}
    </GradientPaper>
  );
};
