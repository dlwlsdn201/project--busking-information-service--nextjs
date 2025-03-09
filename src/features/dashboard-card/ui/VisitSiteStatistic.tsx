import { DashboardCard } from '@features/dashboard-card/component/DashboardCard';
import { TestIcon } from '@shared/assets/icons/common';
import { IconProvider } from '@shared/assets/icons/IconProvider';
export const VisitSiteStatistic = () => {
  const SAMPLE_DATA = {
    title: '월간 방문자',
    value: '12,450',
    description: '지난 달 대비 +22%',
    icon: <IconProvider icon={TestIcon} size={28} />,
    color: 'cyan',
    progress: 78,
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
