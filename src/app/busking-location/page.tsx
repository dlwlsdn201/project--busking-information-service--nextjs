'use client';

import styled from 'styled-components';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { LocationForm, useLocations } from '@features/location';
import { LocationMapWidget } from '@widgets/busking-location/LocationMapWidget';
import { STANDARD_RADIUS } from '@app/config/style';
import { LocationControlWidget } from '@widgets/busking-location/LocationControlWidget';
import { BuskingSpot } from '@entities/location/model/spot';
import { BuskingLocationModal } from '@widgets/busking-location';
import { useLocationStore } from '@store/index';

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
  const { addLocation, updateLocation } = useLocations();

  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    targetLocation,
    setTargetLocation,
  } = useLocationStore();

  const handleAddLocation = (locationData: Omit<BuskingSpot, 'id'>) => {
    try {
      if (targetLocation) {
        // 수정 모드
        updateLocation({
          ...locationData,
          id: targetLocation.id,
        });
        notifications.show({
          title: '위치 수정 완료',
          message: '버스킹 장소가 성공적으로 수정되었습니다.',
          color: 'teal',
        });
      } else {
        // 등록 모드
        addLocation({
          ...locationData,
          id: Date.now().toString(),
        });
        notifications.show({
          title: '위치 추가 완료',
          message: '새로운 버스킹 장소가 성공적으로 등록되었습니다.',
          color: 'teal',
        });
      }
      close();
    } catch (error) {
      notifications.show({
        title: '오류 발생',
        message: targetLocation
          ? '위치 수정 중 문제가 발생했습니다. 다시 시도해주세요.'
          : '위치 추가 중 문제가 발생했습니다. 다시 시도해주세요.',
        color: 'red',
      });

      console.error('Error handling location:', error);
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
    setTargetLocation(undefined);
    open();
  };

  const openLocationEditModal = () => {
    open();
  };

  return (
    <MapSection>
      <LocationMapWidget />
      <LocationControlWidget openLocationAddModal={openLocationAddModal} />

      {/* 버스킹 정보 입력 폼 Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={targetLocation ? '버스킹 장소 수정' : '버스킹 장소 등록'}
        size="lg"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <LocationForm
          initialData={targetLocation}
          onSubmit={handleAddLocation}
          onCancel={close}
        />
      </Modal>

      {/* 버스킹 상세정보 Modal */}
      {targetLocation && (
        <BuskingLocationModal
          locationData={targetLocation}
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          onEdit={openLocationEditModal}
        />
      )}
    </MapSection>
  );
};

export default BuskingLocationsPage;
