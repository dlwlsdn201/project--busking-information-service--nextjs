'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Modal, Paper, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import {
  LocationForm,
  SearchLocationInput,
  useLocations,
} from '@features/location';
import { BuskingLocationCard } from '@entities/location';
import { MapContainerWidget } from '@widgets/busking-location/MapContainerWidget';

// 스타일 컴포넌트 정의
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background-color: #f5f8ff;
`;

const MapSection = styled.div`
  flex: 1;
  position: relative;
  height: calc(100vh - 180px);
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ButtonsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SearchContainer = styled(Paper)`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 100;
  width: 320px;
`;

const PageTitle = styled.h1`
  color: #4263eb;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  color: #5c7cfa;
  font-size: 16px;
  margin-bottom: 24px;
`;

const BuskingLocationsPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const { locations, addLocation, deleteLocation, isLoading } = useLocations();
  //   const router = useRouter();

  const handleAddLocation = (locationData: Omit<Location, 'id'>) => {
    try {
      addLocation({
        ...locationData,
        id: Date.now().toString(),
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
        requiresPermission: false,
      });
      notifications.show({
        title: '위치 추가 완료',
        message: '새로운 버스킹 장소가 성공적으로 등록되었습니다.',
        color: 'teal',
      });
      close();
    } catch (error) {
      notifications.show({
        title: '오류 발생',
        message: '위치 추가 중 문제가 발생했습니다. 다시 시도해주세요.',
        color: 'red',
      });
    }
  };

  const handleDeleteLocation = (locationId: string) => {
    try {
      deleteLocation(locationId);
      notifications.show({
        title: '위치 삭제 완료',
        message: '버스킹 장소가 성공적으로 삭제되었습니다.',
        color: 'blue',
      });
      if (selectedLocation?.id === locationId) {
        setSelectedLocation(null);
      }
    } catch (error) {
      notifications.show({
        title: '오류 발생',
        message: '위치 삭제 중 문제가 발생했습니다. 다시 시도해주세요.',
        color: 'red',
      });
    }
  };

  const handleOpenAddModal = () => {
    setEditingLocation(null);
    open();
  };

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <MapSection>
          <MapContainerWidget
            locations={locations}
            selectedLocation={selectedLocation}
            onMarkerClick={handleMarkerClick}
          />

          <SearchContainer p="md" withBorder>
            <SearchLocationInput
              onLocationSelect={(location) => {
                // 지도 중심 이동하는 로직
              }}
            />
          </SearchContainer>

          <ButtonsContainer>
            <Tooltip label="새 버스킹 장소 등록하기">
              <Button
                onClick={handleOpenAddModal}
                color="indigo"
                radius="md"
                size="md"
                leftSection={<IconPlus size={16} />}
                className="bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                장소 등록
              </Button>
            </Tooltip>
          </ButtonsContainer>
        </MapSection>

        {selectedLocation && (
          <BuskingLocationCard
            location={selectedLocation}
            onDelete={handleDeleteLocation}
          />
        )}

        {/* 
        {selectedLocation && (
          <Paper
            shadow="sm"
            p="lg"
            mt="md"
            radius="md"
            className="bg-white border border-blue-100"
          >
            <Group justify="space-between" mb="md">
              <div>
                <Text size="xl" fw={700} c="indigo.7">
                  {selectedLocation.name}
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedLocation.address}
                </Text>
              </div>
              <Group>
                <Badge
                  color={
                    selectedLocation.requiresPermission ? 'orange' : 'teal'
                  }
                  radius="sm"
                  size="lg"
                >
                  {selectedLocation.requiresPermission
                    ? '허가 필요'
                    : '자유 공연'}
                </Badge>
                <ActionIcon
                  color="red"
                  onClick={() => handleDeleteLocation(selectedLocation.id)}
                  variant="light"
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Group>

            <Group gap="xl" mt="lg">
              {selectedLocation.contactInfo && (
                <div className="flex items-center gap-2">
                  <IconPhone size={16} className="text-gray-500" />
                  <Text size="sm">{selectedLocation.contactInfo}</Text>
                </div>
              )}
            </Group>

            {selectedLocation.imageUrl && (
              <div className="mt-4">
                <img
                  src={selectedLocation.imageUrl}
                  alt={selectedLocation.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            )}

            {selectedLocation.description && (
              <Text mt="md" size="sm" className="text-gray-700">
                {selectedLocation.description}
              </Text>
            )}
          </Paper>
        )} */}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="버스킹 장소 등록"
        size="lg"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <LocationForm
          initialData={editingLocation}
          onSubmit={handleAddLocation}
          onCancel={close}
        />
      </Modal>
    </PageContainer>
  );
};

export default BuskingLocationsPage;
