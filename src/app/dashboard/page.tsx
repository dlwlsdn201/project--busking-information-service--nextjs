'use client';

import { PagePaddingLayout } from '@shared/ui/layout';
import { DashboardWidget } from '@widgets/dashboard/DashboardWidget';

export default function DashboardPage() {
  return (
    <PagePaddingLayout>
      <DashboardWidget />
    </PagePaddingLayout>
  );
}
