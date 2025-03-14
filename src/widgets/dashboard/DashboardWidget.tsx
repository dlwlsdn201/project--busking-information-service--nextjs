'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Skeleton } from '@mantine/core';
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
import { RESPONSIVE_BREAKPOINTS } from '@app/config/responsive';

const BriefStatisticSection = styled.div<{
  height?: `${number}%`;
}>`
  display: grid;
  grid-gap: 1.25rem;

  // 기본적으로 4열 레이아웃 적용(데스크탑)
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  height: ${(props) => props?.height ?? 'auto'};

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.mobile}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MainStatisticSection = styled.div<{
  height?: `${number}%`;
}>`
  display: grid;
  grid-gap: 1.25rem;

  // 기본적으로 2열 레이아웃 적용(데스크탑)
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  height: ${(props) => props?.height ?? 'auto'};

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.tablet}px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.mobile}px) {
    grid-template-columns: repeat(1, 1fr);
  }
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
    <EnrollBuskerStatistic key="EnrollBusker" />,
    <EnrollSpotStatistic key="EnrollSpot" />,
    <ThisWeekEventStatistic key="ThisWeekEvent" />,
    <ThisMonthVisitSiteStatistic key="ThisMonthVisitSite" />,
  ];

  return (
    <>
      {/* 통계 카드 그리드 */}
      <BriefStatisticSection>
        {isLoading
          ? [...Array(compareCharts.length)].map((_, i) => (
              <Skeleton key={i} height={140} radius="md" />
            ))
          : compareCharts}
      </BriefStatisticSection>
      {/* 차트 영역 */}
      <MainStatisticSection>
        {/* 일일 접속자 수 현황 차트 */}
        <DailyVisitSiteStatistic isLoading={isLoading} />
        {/* 지역별 주간 버스킹 공연 수 현황 차트 */}
        <ThisWeekEventEachRegionStatistic isLoading={isLoading} />
        {/* 지역별 버스커 수 현황 차트 */}
        <EachRegionBuskerStatistic isLoading={isLoading} />
        {/* 최근 공지사항 및 업데이트 */}
        <LatestPosts isLoading={isLoading} />
      </MainStatisticSection>
    </>
  );
};
