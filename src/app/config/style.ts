import { MantineTransition } from '@mantine/core';

export const STANDARD_PADDING = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '3rem',
  xl: '4rem',
};

export const STANDARD_GAP = {
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
};

export const STANDARD_TRANSITION: {
  duration: {
    fast: number;
    base: number;
    slow: number;
  };
  transition: {
    [component: string]: MantineTransition;
  };
} = {
  duration: {
    fast: 150,
    base: 220,
    slow: 300,
  },
  transition: {
    dropdown: 'scale',
  },
};
