import {
  Select,
  TextInput,
  Button,
  useMantineColorScheme,
} from '@mantine/core';
import { BUSKING_CATEGORIES } from '@shared/config/categories';
import { REGIONS } from '@shared/config/locations';
import {
  IconSearch,
  IconFilter,
  IconMapPin,
  IconCategory,
} from '@tabler/icons-react';
import { styled } from 'styled-components';
import { STANDARD_FONT_SIZES } from '../../../../app/config/font';
import { STANDARD_TRANSITION } from '@app/config/style';

const StyledFilterBar = styled.div<{ $isDark: boolean }>`
  background-color: ${(props) => (props.$isDark ? '#2C2E33' : 'white')};
  max-height: 10%;
  border-radius: 12px;
  padding: 1rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, ${(props) => (props.$isDark ? '0.3' : '0.1')}),
    0 2px 4px -1px rgba(0, 0, 0, ${(props) => (props.$isDark ? '0.2' : '0.06')});
`;

interface FeedFilterBarProps {
  selectedRegion: string | null;
  setSelectedRegion: (value: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const PublicizeFilterBar = ({
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: FeedFilterBarProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <StyledFilterBar $isDark={isDark}>
      <div className="flex flex-col md:flex-row gap-3">
        <TextInput
          leftSection={<IconSearch size={18} />}
          placeholder="공연명, 아티스트 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          radius="md"
          size="lg"
        />

        <Select
          leftSection={<IconMapPin size={18} />}
          placeholder="지역 선택"
          comboboxProps={{
            transitionProps: {
              transition: STANDARD_TRANSITION.transition.dropdown,
              duration: STANDARD_TRANSITION.duration.base,
            },
          }}
          data={REGIONS}
          value={selectedRegion}
          onChange={setSelectedRegion}
          clearable
          className="md:w-48"
          size="lg"
          radius="md"
        />

        <Select
          leftSection={<IconCategory size={18} />}
          placeholder="장르 선택"
          comboboxProps={{
            transitionProps: {
              transition: STANDARD_TRANSITION.transition.dropdown,
              duration: STANDARD_TRANSITION.duration.base,
            },
          }}
          data={BUSKING_CATEGORIES}
          value={selectedCategory}
          onChange={setSelectedCategory}
          clearable
          className="w-full md:w-48"
          radius="md"
          size="lg"
        />

        <Button
          leftSection={<IconFilter size={18} />}
          variant="light"
          color="grape"
          radius="md"
          onClick={() => {
            setSelectedRegion(null);
            setSelectedCategory(null);
            setSearchQuery('');
          }}
          className="whitespace-nowrap"
          size="lg"
          styles={{ label: { fontSize: STANDARD_FONT_SIZES.lg } }}
        >
          필터 초기화
        </Button>
      </div>
    </StyledFilterBar>
  );
};
