'use client';

import { PageTitleLayout } from '@shared/ui/layout/PageTitleLayout';

const PublicizePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageTitleLayout
      title="버스킹 홍보"
      description="버스킹 공연을 홍보하는 페이지입니다."
    >
      {children}
    </PageTitleLayout>
  );
};

export default PublicizePageLayout;
