'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Paper,
  Title,
  Text,
  Badge,
  //   RingProgress,
  Skeleton,
  SimpleGrid,
  PaperProps,
} from '@mantine/core';
import styled from 'styled-components';
import { AreaLineChart, BarChart, PieChart } from '@shared/ui/chart';
import { FlexLayout } from '@shared/ui/layout/FlexLayout';
import {
  EnrollBuskerStatistic,
  ThisWeekEventStatistic,
  VisitSiteStatistic,
} from '@features/dashboard-card/ui';
import { EnrollSpotStatistic } from '@features/dashboard-card/ui/EnrollSpotStatistic';

const GradientPaper = styled(Paper)<PaperProps & { children: React.ReactNode }>`
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ChartTitle = styled(Title)`
  color: #4c6ef5;
  margin-bottom: 8px;
  font-size: 1.2rem;
`;

export const DashboardWidget: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // 실제 구현 시에는 API에서 데이터 가져오기
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

  const compareCharts: React.ReactNode[] = [
    <EnrollBuskerStatistic />,
    <EnrollSpotStatistic />,
    <ThisWeekEventStatistic />,
    <VisitSiteStatistic />,
  ];

  return (
    <FlexLayout direction="vertical">
      <Head>
        <title>대시보드 | 버스커스팟</title>
      </Head>

      <Box className="flex justify-between items-center mb-6">
        <Box>
          <Title order={2} className="text-indigo-700 mb-1">
            대시보드
          </Title>
          <Text>버스킹 생태계 현황을 한눈에 파악하세요</Text>
        </Box>
      </Box>

      {/* 통계 카드 그리드 */}
      <StatsContainer>
        {isLoading
          ? [...Array(compareCharts.length)].map((_, i) => (
              <Skeleton key={i} height={140} radius="md" />
            ))
          : compareCharts}
      </StatsContainer>

      {/* 차트 영역 */}
      <SimpleGrid cols={2} spacing="lg">
        {/* 일일 접속자 수 현황 차트 */}
        <GradientPaper p="md" withBorder>
          <ChartTitle order={4}>일일 접속자 수 현황</ChartTitle>
          <Text size="sm" color="dimmed" mb="md">
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

        {/* 지역별 주간 버스킹 공연 수 현황 차트 */}
        <GradientPaper p="md" withBorder>
          <ChartTitle order={4}>지역별 버스킹 공연 수</ChartTitle>
          <Text size="sm" mb="md">
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

        {/* 지역별 버스커 수 현황 차트 */}
        <GradientPaper p="md" withBorder>
          <ChartTitle order={4}>지역별 버스커 분포</ChartTitle>
          <Text size="sm" color="dimmed" mb="md">
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

        {/* 최근 공지사항 및 업데이트 */}
        <GradientPaper p="md" withBorder>
          <ChartTitle order={4}>최근 업데이트</ChartTitle>
          <Text size="sm" color="dimmed" mb="md">
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
      </SimpleGrid>
    </FlexLayout>
  );
};
