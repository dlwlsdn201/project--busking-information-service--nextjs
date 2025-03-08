interface Navigation {
  path: string;
  label: string;
}

export const NavigationList: Navigation[] = [
  {
    path: '/dashboard',
    label: '대시보드',
  },
  {
    path: '/busking-location',
    label: '버스킹 장소',
  },
  {
    path: '/busking-event',
    label: '버스킹 공연 홍보',
  },
  {
    path: '/setting',
    label: '환경설정',
  },
];
