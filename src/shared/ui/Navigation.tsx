'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationList } from '@shared/config/Navigation';

export const Navigation = ({}): React.ReactElement => {
  const currentPath = usePathname();

  const currentArrow = (targetPath: string) =>
    targetPath === currentPath ? '⇦' : '';

  const navigationItems = NavigationList.map((item) => (
    <li style={{ display: 'flex', gap: '0.5rem' }}>
      <Link href={item.path}>{item.label}</Link>
      {currentArrow(item.path)}
    </li>
  ));

  return (
    <nav>
      <ul className="flex w-full justify-center list-none no-underline gap-4">
        {...navigationItems}
      </ul>
    </nav>
  );
};
