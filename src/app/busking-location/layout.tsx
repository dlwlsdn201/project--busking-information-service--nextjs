'use client';

import { PageTitleLayout } from '@shared/ui/layout/PageTitleLayout';

const BuskingLocationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageTitleLayout
      title="버스킹 장소"
      description="국내 버스킹 장소 정보를 확인하거나 나만 알고있는 버스킹 장소를 등록해서 공유해보세요."
    >
      {children}
    </PageTitleLayout>
  );
};

export default BuskingLocationLayout;
