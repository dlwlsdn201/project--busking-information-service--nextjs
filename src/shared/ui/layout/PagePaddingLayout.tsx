import { STANDARD_PADDING } from '@app/config/style';
import styled from 'styled-components';

const RootPaddingContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${STANDARD_PADDING.md};
`;

export const PagePaddingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RootPaddingContainer>{children}</RootPaddingContainer>;
};
