import { STANDARD_RADIUS } from '@app/config/style';
import { SearchLocationInput } from '@features/location';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import styled from 'styled-components';

const LocationControlContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: start;
  gap: 0.25rem;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  width: max-content;
`;

const SearchInputWrapper = styled.div<{ children: React.ReactNode }>`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  height: 100%;
  border-radius: ${STANDARD_RADIUS};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface LocationControlWidgetProps {
  openLocationAddModal: () => void;
}

export const LocationControlWidget = ({
  openLocationAddModal,
}: LocationControlWidgetProps): React.ReactElement => {
  return (
    <LocationControlContainer>
      <SearchInputWrapper>
        <SearchLocationInput
          onLocationSelect={(location) => {
            // 지도 중심 이동하는 로직
            console.log('location:', location);
          }}
        />
      </SearchInputWrapper>
      <ButtonWrapper>
        <Button
          onClick={openLocationAddModal}
          color="indigo"
          radius="md"
          size="sm"
          leftSection={<IconPlus size={16} />}
          className="bg-gradient-to-r from-blue-500 to-indigo-600"
        >
          장소 등록
        </Button>
      </ButtonWrapper>
    </LocationControlContainer>
  );
};
