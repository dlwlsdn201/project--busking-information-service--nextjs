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

const StyledFilterBar = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? '#2C2E33' : 'white')};
  border-radius: 12px;
  padding: 1rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, ${(props) => (props.isDark ? '0.3' : '0.1')}),
    0 2px 4px -1px rgba(0, 0, 0, ${(props) => (props.isDark ? '0.2' : '0.06')});
  margin-bottom: 1.5rem;
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
    <StyledFilterBar isDark={isDark}>
      <div className="flex flex-col md:flex-row gap-3">
        <TextInput
          icon={<IconSearch size={18} />}
          placeholder="공연명, 아티스트 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          radius="md"
        />

        <Select
          icon={<IconMapPin size={18} />}
          placeholder="지역 선택"
          data={REGIONS}
          value={selectedRegion}
          onChange={setSelectedRegion}
          clearable
          className="w-full md:w-40"
          radius="md"
        />

        <Select
          icon={<IconCategory size={18} />}
          placeholder="장르 선택"
          data={BUSKING_CATEGORIES}
          value={selectedCategory}
          onChange={setSelectedCategory}
          clearable
          className="w-full md:w-40"
          radius="md"
        />

        <Button
          leftIcon={<IconFilter size={18} />}
          variant="light"
          color="grape"
          radius="md"
          onClick={() => {
            setSelectedRegion(null);
            setSelectedCategory(null);
            setSearchQuery('');
          }}
          className="whitespace-nowrap"
        >
          필터 초기화
        </Button>
      </div>
    </StyledFilterBar>
  );
};
