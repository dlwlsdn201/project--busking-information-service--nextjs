import { DashboardCard } from '@features/dashboard-card/component/DashboardCard';
import { TestIcon } from '@shared/assets/icons/common';
import { IconProvider } from '@shared/assets/icons/IconProvider';
export const ThisWeekEventStatistic = () => {
  const SAMPLE_DATA = {
    title: '이번 주 공연 수',
    value: '268',
    description: '지난 주 대비 +18%',
    icon: <IconProvider icon={TestIcon} size={28} />,
    color: 'violet',
    progress: 88,
  };
  return (
    <DashboardCard
      title={SAMPLE_DATA.title}
      value={SAMPLE_DATA.value}
      description={SAMPLE_DATA.description}
      icon={SAMPLE_DATA?.icon ?? ''}
      color={SAMPLE_DATA.color}
      progress={SAMPLE_DATA.progress}
    />
  );
};
