'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Title,
  Text,
  //   RingProgress,
  Skeleton,
  SimpleGrid,
} from '@mantine/core';
import styled from 'styled-components';
import { FlexLayout } from '@shared/ui/layout/FlexLayout';
import {
  EnrollBuskerStatistic,
  ThisWeekEventStatistic,
  ThisMonthVisitSiteStatistic,
} from '@features/dashboard-card/ui';
import { EnrollSpotStatistic } from '@features/dashboard-card/ui/EnrollSpotStatistic';
import { DailyVisitSiteStatistic } from '@features/dashboard-card/ui/DailyVisitSiteStatistic';
import { ThisWeekEventEachRegionStatistic } from '@features/dashboard-card/ui/ThisWeekEventEachRegionStatistic';
import { EachRegionBuskerStatistic } from '@features/dashboard-card/ui/EachRegionBuskerStatistic';
import { LatestPosts } from '@features/dashboard-card/ui/LatestPosts';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
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

  const compareCharts: React.ReactNode[] = [
    <EnrollBuskerStatistic />,
    <EnrollSpotStatistic />,
    <ThisWeekEventStatistic />,
    <ThisMonthVisitSiteStatistic />,
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
        <DailyVisitSiteStatistic isLoading={isLoading} />
        {/* 지역별 주간 버스킹 공연 수 현황 차트 */}
        <ThisWeekEventEachRegionStatistic isLoading={isLoading} />
        {/* 지역별 버스커 수 현황 차트 */}
        <EachRegionBuskerStatistic isLoading={isLoading} />
        {/* 최근 공지사항 및 업데이트 */}
        <LatestPosts isLoading={isLoading} />
      </SimpleGrid>
    </FlexLayout>
  );
};
