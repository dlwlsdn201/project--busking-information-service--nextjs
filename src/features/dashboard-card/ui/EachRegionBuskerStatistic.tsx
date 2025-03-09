import { Skeleton, Text } from '@mantine/core';
import { PieChart } from '@shared/ui/chart';
import { ChartTitle, GradientPaper } from '../style/DashboardCard.styled';

interface Props {
  isLoading: boolean;
}
export const EachRegionBuskerStatistic: React.FC<Props> = ({ isLoading }) => {
  // 지역별 버스커 수 차트 데이터
  const SAMPLE_buskerData = [
    { id: '서울', value: 156, label: '서울' },
    { id: '부산', value: 78, label: '부산' },
    { id: '경기', value: 102, label: '경기' },
    { id: '인천', value: 54, label: '인천' },
    { id: '강원', value: 38, label: '강원' },
    { id: '경상', value: 68, label: '경상' },
    { id: '전라', value: 47, label: '전라' },
    { id: '충청', value: 41, label: '충청' },
    { id: '제주', value: 23, label: '제주' },
  ];
  return (
    <GradientPaper p="md" withBorder>
      <ChartTitle order={4}>지역별 버스커 분포</ChartTitle>
      <Text size="sm" c="dimmed" mb="md">
        현재 활동 중인 버스커 지역별 분포
      </Text>

      {isLoading ? (
        <Skeleton height={250} radius="md" />
      ) : (
        <PieChart
          data={SAMPLE_buskerData}
          height={250}
          title="지역별 버스커 분포"
        />
      )}
    </GradientPaper>
  );
};
