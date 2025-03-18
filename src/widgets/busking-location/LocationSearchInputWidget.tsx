import { STANDARD_RADIUS } from '@app/config/style';
import { SearchLocationInput } from '@features/location';
import { Paper, PaperProps } from '@mantine/core';
import styled from 'styled-components';

const SearchInputContainer = styled(Paper)<
  { children: React.ReactNode } & PaperProps
>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  width: 18rem;
  padding: 0.75rem !important;
  border-radius: ${STANDARD_RADIUS};
`;

export const LocationSearchInputWidget = () => {
  return (
    <SearchInputContainer p="md" withBorder>
      <SearchLocationInput
        onLocationSelect={(location) => {
          // 지도 중심 이동하는 로직
          console.log('location:', location);
        }}
      />
    </SearchInputContainer>
  );
};
