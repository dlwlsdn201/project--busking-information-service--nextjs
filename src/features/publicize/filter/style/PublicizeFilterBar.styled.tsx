import styled from 'styled-components';

export const StyledFilterBar = styled.div<{ $isDark: boolean }>`
  background-color: ${(props) =>
    props.$isDark ? '#2C2E33' : 'rgba(66, 100, 235, 0.03)'};
  max-height: 10%;
  border-radius: 12px;
  padding: 1rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, ${(props) => (props.$isDark ? '0.3' : '0.1')}),
    0 2px 4px -1px rgba(0, 0, 0, ${(props) => (props.$isDark ? '0.2' : '0.06')});
`;
