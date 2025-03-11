import { Badge, Box, Skeleton, Text } from '@mantine/core';
import { MainCardContainer } from '../style/DashboardCard.styled';
import { ChartTitle } from '@features/dashboard-card/component/ChartTitle';

interface Props {
  isLoading: boolean;
}
export const LatestPosts: React.FC<Props> = ({ isLoading }) => {
  return (
    <MainCardContainer p="md" withBorder>
      <ChartTitle
        title="최근 업데이트"
        description="서비스 공지사항 및 업데이트 내역"
      />

      {isLoading ? (
        <Skeleton height={250} radius="md" />
      ) : (
        <Box className="space-y-1">
          {[
            {
              date: '2025-03-05',
              title: '서울 강남구 버스킹 장소 5곳 신규 등록',
              badge: '신규',
            },
            {
              date: '2025-03-02',
              title: '부산 해운대 버스킹존 이용 시간 변경 안내',
              badge: '변경',
            },
            {
              date: '2025-02-28',
              title: '3월 버스킹 공연 홍보 행사 안내',
              badge: '이벤트',
            },
            {
              date: '2025-03-06',
              title: '태화강 국가정원 중앙광장 버스킹 공연 공식 허가 결정',
              badge: '신규',
            },
          ].map((item, index) => (
            <Box
              key={index}
              className="flex items-start justify-between p-2 hover:bg-gray-50 rounded transition-colors duration-200"
            >
              <Box>
                <Text size="sm">{item.title}</Text>
                <Text size="xs">{item.date}</Text>
              </Box>
              <Badge
                size="sm"
                variant="light"
                color={
                  item.badge === '신규'
                    ? 'teal'
                    : item.badge === '변경'
                      ? 'yellow'
                      : item.badge === '이벤트'
                        ? 'indigo'
                        : 'red'
                }
              >
                {item.badge}
              </Badge>
            </Box>
          ))}
        </Box>
      )}
    </MainCardContainer>
  );
};
