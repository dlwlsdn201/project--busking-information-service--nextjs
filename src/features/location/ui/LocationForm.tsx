// features/locations/LocationForm.tsx
import React, { useState } from 'react';
import {
  TextInput,
  Switch,
  Textarea,
  FileInput,
  Group,
  Button,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconMapPin,
  IconInfoCircle,
  IconPhoto,
  IconPhone,
  IconBuildingCommunity,
} from '@tabler/icons-react';
import { AddressSearch } from './AddressSearch';
import { BuskingSpot } from '@entities/location/model/spot';

interface LocationFormProps {
  initialData: BuskingSpot | undefined;
  onSubmit: (data: Omit<BuskingSpot, 'id'>) => void;
  onCancel: () => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);

  const form = useForm({
    initialValues: initialData || {
      name: '',
      address: '',
      lat: 0,
      lng: 0,
      permitRequired: false,
      operatingHours: '',
      contact: '',
      electricSupply: false,
      notes: '',
      images: [],
    },
    validate: {
      name: (value: string) =>
        value.trim().length > 0 ? null : '장소 이름을 입력해주세요',
      address: (value: string) =>
        value.trim().length > 0 ? null : '주소를 입력해주세요',
    },
  });

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    form.setValues({
      ...form.values,
      address,
      lat: lat,
      lng: lng,
    });
    setAddressSearchOpen(false);
  };

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values);
  };

  const [file, setFile] = useState<File | null>(null);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          label="버스킹 장소명"
          placeholder="버스킹 장소의 이름을 입력해주세요"
          leftSection={<IconBuildingCommunity size={16} />}
          {...form.getInputProps('name')}
        />

        <div>
          <Group justify="space-between" mb={5}>
            <Text size="sm" fw={500}>
              주소
            </Text>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setAddressSearchOpen(true)}
            >
              주소 검색
            </Button>
          </Group>
          <TextInput
            required
            placeholder="주소를 입력하거나 주소 검색을 이용해주세요"
            leftSection={<IconMapPin size={16} />}
            {...form.getInputProps('address')}
            readOnly
          />
        </div>

        {addressSearchOpen && (
          <AddressSearch
            onSelect={handleAddressSelect}
            onClose={() => setAddressSearchOpen(false)}
          />
        )}

        <Switch
          label="공연 허가가 필요한 장소인가요?"
          name="permitRequired"
          description="허가가 필요한 경우 체크해주세요"
          {...form.getInputProps('permitRequired', { type: 'checkbox' })}
        />

        <Switch
          label="전기가 제공되는 환경인가요?"
          name="electricSupply"
          description="전기 제공이 가능한 콘센트가 있을 경우, 체크해주세요"
          {...form.getInputProps('electricSupply', { type: 'checkbox' })}
        />

        <TextInput
          label="장소 관리자 또는 연락처"
          placeholder="공연 허가 및 문의를 위한 연락처를 입력해주세요"
          leftSection={<IconPhone size={16} />}
          {...form.getInputProps('contact')}
        />

        <Textarea
          label="장소 설명"
          placeholder="버스킹 장소에 대한 추가 정보를 입력해주세요 (공연 가능 시간, 전력 공급 여부 등)"
          minRows={3}
          leftSection={<IconInfoCircle size={16} />}
          {...form.getInputProps('notes')}
        />

        <FileInput
          label="장소 사진"
          placeholder="공연 장소 사진을 업로드해주세요"
          accept="image/*"
          leftSection={<IconPhoto size={16} />}
          value={file}
          onChange={setFile}
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="light" color="gray" onClick={onCancel}>
            취소
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            등록하기
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
