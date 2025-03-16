'use client';

import { NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { ROUTE_LIST } from '@shared/config/Navigation';
import {
  NavigationWrapper,
  SidebarContainer,
  StyledAside,
} from './Navigation.styled';
import { ThemeToggleButton } from '@shared/ui/common';
import { STANDARD_FONT_SIZES } from '@app/config/font';

export const Navigation = (): React.ReactElement => {
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
        styles={{ label: { fontSize: STANDARD_FONT_SIZES.md } }}
      />
    );
  });

  return (
    <StyledAside>
      <SidebarContainer>
        <NavigationWrapper>{navigationItems}</NavigationWrapper>
        <ThemeToggleButton />
      </SidebarContainer>
      ;
    </StyledAside>
  );
};
