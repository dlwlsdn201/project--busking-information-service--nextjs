import { RESPONSIVE_BREAKPOINTS } from '@app/config/responsive';
import styled from 'styled-components';

export const StyledAside = styled.aside`
  min-width: max-content;
  max-width: max-content;
  min-height: 100vh;
`;

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 1rem 0.5rem;

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.mobile}px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: fit-content;
    max-height: fit-content;
    z-index: 9999;
    background-color: #fff;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0.365rem 0.5rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

    .mantine-NavLink-root {
      justify-content: center;
    }

    .mantine-NavLink-body {
      display: none;
    }
  }
`;
