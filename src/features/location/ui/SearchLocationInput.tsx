// features/locations/SearchLocationInput.tsx
import React, { useState } from 'react';
import {
  TextInput,
  Group,
  ActionIcon,
  Paper,
  Text,
  Loader,
  Collapse,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconArrowRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface SearchLocationInputProps {
  onLocationSelect: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

export const SearchLocationInput: React.FC<SearchLocationInputProps> = ({
  onLocationSelect,
}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      // 카카오맵 API를 사용하여 위치 검색
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        throw new Error('카카오맵 API가 로드되지 않았습니다.');
      }

      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(searchTerm, (data: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setResults(data.slice(0, 5)); // 최대 5개 결과만 표시
          if (!opened) toggle();
        } else {
          setResults([]);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setResults([]);
    }
  };

  const handleSelect = (item: any) => {
    onLocationSelect({
      address: item.address_name,
      lat: parseFloat(item.y),
      lng: parseFloat(item.x),
    });
    setSearchTerm(item.place_name);
    toggle();
  };

  return (
    <div>
      <Group>
        <TextInput
          placeholder="버스킹 장소 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftSection={<IconMapPin size={16} />}
          rightSection={
            loading ? (
              <Loader size="xs" />
            ) : (
              <ActionIcon onClick={handleSearch}>
                <IconSearch size={16} />
              </ActionIcon>
            )
          }
          style={{ flex: 1 }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
      </Group>

      <Collapse in={opened}>
        <Paper withBorder mt="xs" p={0}>
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelect(item)}
              >
                <Text size="sm" fw={500}>
                  {item.place_name}
                </Text>
                <Text size="xs" color="dimmed">
                  {item.address_name}
                </Text>
              </div>
            ))
          ) : (
            <Text size="sm" p="xs" color="dimmed" ta="center">
              검색 결과가 없습니다
            </Text>
          )}
        </Paper>
      </Collapse>
    </div>
  );
};
