'use client';

import { NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { ROUTE_LIST } from '@shared/config/Navigation';
import { NavigationContainer, StyledAside } from './Navigation.styled';

export const Navigation = ({}): React.ReactElement => {
  const currentPath = usePathname();

  const navigationItems = ROUTE_LIST.map((item) => {
    const IconComponent = item.icon;
    return (
      <NavLink
        active={item.path === currentPath}
        key={item.path}
        href={item.path}
        label={item.label}
        leftSection={<IconComponent />}
        variant="light"
        color="#5542d0"
        autoContrast
      />
    );
  });

  return (
    <StyledAside>
      <NavigationContainer>{navigationItems}</NavigationContainer>;
    </StyledAside>
  );
};
