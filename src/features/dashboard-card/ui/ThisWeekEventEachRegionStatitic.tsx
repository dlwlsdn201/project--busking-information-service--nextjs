import { Skeleton, Text } from '@mantine/core';
import { ChartTitle, GradientPaper } from '../style/DashboardCard.styled';
import { AreaLineChart } from '@shared/ui/chart';

interface Props {
  isLoading: boolean;
}
export const ThisWeekEventEachRegionStatistic: React.FC<Props> = ({
  isLoading,
}) => {
  // 현재 접속자 수 차트 데이터
  const SAMPLE_visitorData = [
    { date: '3월 1일', visitors: 420 },
    { date: '3월 2일', visitors: 380 },
    { date: '3월 3일', visitors: 510 },
    { date: '3월 4일', visitors: 470 },
    { date: '3월 5일', visitors: 590 },
    { date: '3월 6일', visitors: 680 },
    { date: '3월 7일', visitors: 740 },
  ];

  return (
    <GradientPaper p="md" withBorder>
      <ChartTitle order={4}>일일 접속자 수 현황</ChartTitle>
      <Text size="sm" c="dimmed" mb="md">
        최근 7일간의 일별 방문자 수
      </Text>

      {isLoading ? (
        <Skeleton height={250} radius="md" />
      ) : (
        <AreaLineChart
          data={SAMPLE_visitorData}
          xKey="date"
          yKey="visitors"
          color="#4c6ef5"
          height={250}
        />
      )}
    </GradientPaper>
  );
};
