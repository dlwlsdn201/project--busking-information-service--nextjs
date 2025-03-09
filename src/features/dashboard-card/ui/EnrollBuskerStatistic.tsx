import { DashboardCard } from '@features/dashboard-card/component/DashboardCard';
import { TestIcon } from '@shared/assets/icons/common';
import { IconProvider } from '@shared/assets/icons/IconProvider';
export const EnrollBuskerStatistic = () => {
  const SAMPLE_DATA = {
    title: '총 등록 버스커',
    value: '714',
    description: '지난 달 대비 +12%',
    icon: <IconProvider icon={TestIcon} size={28} />,
    color: 'indigo',
    progress: 72,
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
