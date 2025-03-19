'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { LocationForm, useLocations } from '@features/location';
import { LocationMapWidget } from '@widgets/busking-location/LocationMapWidget';
import { Location } from '@features/location/model/location';
import { STANDARD_RADIUS } from '@app/config/style';
import { LocationControlWidget } from '@widgets/busking-location/LocationControlWidget';

const MapSection = styled.div`
  flex: 1;
  position: relative;
  height: calc(100vh - 180px);
  width: 100%;
  overflow: hidden;
  border-radius: ${STANDARD_RADIUS};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const BuskingLocationsPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  // TODO - [Zustand 로 이동]
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  // TODO - [Zustand 로 이동]
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const { locations, addLocation } = useLocations();
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
        requiresApprove: false,
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

      console.error('Error adding location:', error);
    }
  };

  // const handleDeleteLocation = (locationId: string) => {
  //   try {
  //     deleteLocation(locationId);
  //     notifications.show({
  //       title: '위치 삭제 완료',
  //       message: '버스킹 장소가 성공적으로 삭제되었습니다.',
  //       color: 'blue',
  //     });
  //     if (selectedLocation?.id === locationId) {
  //       setSelectedLocation(null);
  //     }
  //   } catch (error) {
  //     notifications.show({
  //       title: '오류 발생',
  //       message: '위치 삭제 중 문제가 발생했습니다. 다시 시도해주세요.',
  //       color: 'red',
  //     });
  //   }
  // };

  const openLocationAddModal = () => {
    setEditingLocation(null);
    open();
  };

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <MapSection>
      <LocationMapWidget
        locations={locations}
        selectedLocation={selectedLocation}
        onMarkerClick={handleMarkerClick}
      />
      <LocationControlWidget openLocationAddModal={openLocationAddModal} />

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
    </MapSection>
  );
};

export default BuskingLocationsPage;
