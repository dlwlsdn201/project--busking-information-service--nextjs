import {
  Icon,
  IconCalendar,
  IconChartBarPopular,
  IconMap2,
  IconProps,
  IconSettings,
} from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Navigation {
  path: string;
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

export const ROUTE_LIST: Navigation[] = [
  {
    path: '/dashboard',
    label: '대시보드',
    icon: IconChartBarPopular,
  },
  {
    path: '/busking-location',
    label: '버스킹 장소',
    icon: IconMap2,
  },
  {
    path: '/busking-event',
    label: '버스킹 공연 홍보',
    icon: IconCalendar,
  },
  {
    path: '/setting',
    label: '환경설정',
    icon: IconSettings,
  },
];
