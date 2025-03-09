import { Badge, Box, Skeleton, Text } from '@mantine/core';
import { ChartTitle, GradientPaper } from '../style/DashboardCard.styled';

interface Props {
  isLoading: boolean;
}
export const LatestPosts: React.FC<Props> = ({ isLoading }) => {
  return (
    <GradientPaper p="md" withBorder>
      <ChartTitle order={4}>최근 업데이트</ChartTitle>
      <Text size="sm" c="dimmed" mb="md">
        서비스 공지사항 및 업데이트 내역
      </Text>

      {isLoading ? (
        <Skeleton height={250} radius="md" />
      ) : (
        <Box className="space-y-3">
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
              date: '2025-02-25',
              title: '대전 시청 앞 광장 버스킹 장소 운영 종료',
              badge: '종료',
            },
            {
              date: '2025-02-20',
              title: '버스커를 위한 음향 장비 대여 서비스 오픈',
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
    </GradientPaper>
  );
};
