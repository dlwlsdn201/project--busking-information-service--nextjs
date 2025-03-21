import { STANDARD_GAP } from '@app/config/style';
import styled from 'styled-components';

const FlexLayoutContainer = styled.div<{
  $direction: 'vertical' | 'horizontal';
}>`
  display: flex;
  width: 100%;
  height: 100%;
  row-gap: ${STANDARD_GAP.md};
  flex-direction: ${(props) =>
    props.$direction === 'vertical' ? 'column' : 'row'};
  overflow-y: hidden;
`;

export const FlexLayout = ({
  direction,
  children,
}: {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}) => {
  return (
    <FlexLayoutContainer $direction={direction}>{children}</FlexLayoutContainer>
  );
};
