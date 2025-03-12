import { Skeleton } from '@mantine/core';
import { SharedDonutChart } from '@shared/ui/chart';
import { MainCardContainer } from '../style/DashboardCard.styled';
import { ChartWrapper } from '@features/dashboard-card/style/EachRegionBuskerStatistic.styled';
import { useChartSize } from '@shared/hook';
import { ChartTitle } from '@features/dashboard-card/component/ChartTitle';

interface Props {
  isLoading: boolean;
}
export const EachRegionBuskerStatistic: React.FC<Props> = ({ isLoading }) => {
  // 지역별 버스커 수 차트 데이터
  const SAMPLE_buskerData = [
    { id: '서울', value: 156, label: '서울', color: '#ff9393' },
    { id: '부산', value: 78, label: '부산', color: '#f1bd2d' },
    { id: '경기', value: 102, label: '경기', color: '#ff973c' },
    { id: '인천', value: 54, label: '인천', color: '#82fe80' },
    { id: '강원', value: 38, label: '강원', color: '#77d2ff' },
    { id: '경상', value: 68, label: '경상', color: '#7c7cff' },
    { id: '전라', value: 47, label: '전라', color: '#ff7ecb' },
    { id: '충청', value: 41, label: '충청', color: '#a0d8a0' },
    { id: '제주', value: 23, label: '제주', color: '#c293fffe' },
  ];

  const { containerWidth } = useChartSize({
    containerClassName: 'donutChart-container',
  });

  return (
    <MainCardContainer p="md" withBorder>
      <ChartTitle
        title="지역별 버스커 분포"
        description="현재 활동 중인 버스커 지역별 분포"
      />
      {isLoading ? (
        <Skeleton
          height={containerWidth ? containerWidth / 3 : 250}
          radius="md"
        />
      ) : (
        <ChartWrapper>
          <SharedDonutChart
            // height={containerWidth ? containerWidth *0.5 : 200}
            size={
              containerWidth && containerWidth < 200
                ? containerWidth * 0.35
                : 200
            }
            labelsType="percent"
            data={SAMPLE_buskerData}
          />
        </ChartWrapper>
      )}
    </MainCardContainer>
  );
};
