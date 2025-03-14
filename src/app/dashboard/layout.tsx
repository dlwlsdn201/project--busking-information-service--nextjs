'use client';

import { PageTitleLayout } from '@shared/ui/layout/PageTitleLayout';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageTitleLayout
      title="대시보드"
      description="버스킹 생태계 현황을 한눈에 파악하세요"
    >
      {children}
    </PageTitleLayout>
  );
};

export default DashboardLayout;
