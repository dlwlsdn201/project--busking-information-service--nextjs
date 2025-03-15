import {
  ActionIcon,
  ActionIconProps,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import styled from 'styled-components';

const StyledActionIcon = styled(ActionIcon)<
  ActionIconProps & { children: React.ReactElement; onClick: () => void }
>`
  position: fixed;
  bottom: 4%;
  right: 4%;
  z-index: 1000;
`;

export const ThemeToggleButton: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <StyledActionIcon
      onClick={() => toggleColorScheme()}
      size="xl"
      variant="default"
      color={isDark ? 'yellow' : 'blue'}
    >
      {isDark ? <IconSun size={22} /> : <IconMoon size={22} />}
    </StyledActionIcon>
  );
};
