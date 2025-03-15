import { DashboardCard } from '@features/dashboard-card/component/DashboardCard';
import { TestIcon } from '@shared/assets/icons/common';
import { IconProvider } from '@shared/assets/icons/IconProvider';
export const EnrollSpotStatistic = () => {
  const SAMPLE_DATA = {
    title: '버스킹 스팟 수',
    value: '243',
    description: '지난 달 대비 +5%',
    icon: <IconProvider icon={TestIcon} size={28} />,
    color: 'teal',
    progress: 65,
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
