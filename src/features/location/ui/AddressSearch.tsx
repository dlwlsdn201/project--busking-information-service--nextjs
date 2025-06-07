// features/locations/AddressSearch.tsx
import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Stack,
  Text,
  Loader,
  ScrollArea,
} from '@mantine/core';
import { IconSearch, IconMapPin } from '@tabler/icons-react';

interface AddressSearchProps {
  onSelect: (address: string, lat: number, lng: number) => void;
  onClose: () => void;
}

interface AddressResult {
  address_name: string;
  x: string; // lng
  y: string; // lat
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  onSelect,
  onClose,
}) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = async () => {
    if (!keyword.trim()) {
      setError('검색어를 입력해주세요');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 카카오 지도 API를 사용하여 주소 검색
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        throw new Error('카카오맵 API가 로드되지 않았습니다.');
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        keyword,
        (result: AddressResult[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setResults(result);
          } else {
            setResults([]);
            setError('검색 결과가 없습니다. 다른 검색어로 시도해보세요.');
          }
          setLoading(false);
        }
      );
    } catch (err) {
      setError('주소 검색 중 오류가 발생했습니다.');
      setLoading(false);

      console.log('Error fetching address data:', err);
    }
  };

  const handleSelect = (result: AddressResult) => {
    onSelect(result.address_name, parseFloat(result.y), parseFloat(result.x));
  };

  return (
    <Paper p="md" withBorder shadow="md">
      <Stack gap="md">
        <Text size="lg" fw={500}>
          주소 검색
        </Text>

        <div className="flex gap-2">
          <TextInput
            placeholder="주소를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            leftSection={<IconMapPin size={16} />}
            style={{ flex: 1 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') searchAddress();
            }}
          />
          <Button onClick={searchAddress} disabled={loading}>
            {loading ? <Loader size="xs" /> : <IconSearch size={16} />}
          </Button>
        </div>

        {error && (
          <Text color="red" size="sm">
            {error}
          </Text>
        )}

        <ScrollArea h={200}>
          {results.map((result, index) => (
            <Paper
              key={index}
              p="xs"
              withBorder
              mb="xs"
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelect(result)}
            >
              <Text size="sm">{result.address_name}</Text>
            </Paper>
          ))}
          {results.length === 0 && !loading && !error && (
            <Text color="dimmed" size="sm" ta="center">
              검색 결과가 표시됩니다.
            </Text>
          )}
        </ScrollArea>

        <Button variant="light" color="gray" onClick={onClose}>
          닫기
        </Button>
      </Stack>
    </Paper>
  );
};
