'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Skeleton, SimpleGrid } from '@mantine/core';
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
import { PageTitle } from '@shared/ui/common';

const StatisticSection = styled.div<{
  height?: `${number}%`;
}>`
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(10rem, 1fr));
  height: ${(props) => props?.height ?? 'auto'};
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
      <PageTitle
        title="대시보드"
        description="버스킹 생태계 현황을 한눈에 파악하세요"
      />
      {/* 통계 카드 그리드 */}
      <StatisticSection>
        {isLoading
          ? [...Array(compareCharts.length)].map((_, i) => (
              <Skeleton key={i} height={140} radius="md" />
            ))
          : compareCharts}
      </StatisticSection>
      {/* 차트 영역 */}
      <SimpleGrid cols={2} verticalSpacing="lg" spacing="lg" h={'100%'}>
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
