import { Skeleton } from '@mantine/core';
import { BarChart } from '@shared/ui/chart';
import { MainCardContainer } from '../style/DashboardCard.styled';
import { ChartTitle } from '@features/dashboard-card/component/ChartTitle';

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
    <MainCardContainer p="md" withBorder>
      <ChartTitle
        title="지역별 버스킹 공연 수"
        description="이번 주 지역별 버스킹 공연 현황"
      />

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
    </MainCardContainer>
  );
};
