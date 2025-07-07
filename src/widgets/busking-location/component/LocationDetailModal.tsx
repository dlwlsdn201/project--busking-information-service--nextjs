import React, { useLayoutEffect, useState } from 'react';
import { Modal, Button, Badge, Popover, Text } from '@mantine/core';
import styled from 'styled-components';
import { useConfirmStore, useLocationStore } from '@store/index';
import { BuskingSpot } from '@entities/location/model/spot';

// Styled Components
const StyledModal = styled(Modal)`
  .mantine-Modal-content {
    padding: 0 !important;
    border-radius: 0.5rem;
    overflow: hidden;
    max-width: 21.25rem;
    width: 100%;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 12.5rem;
  overflow: hidden;
`;

const CarouselSlides = styled.div<{ $currentSlide: number }>`
  display: flex;
  transition: transform 0.3s ease;
  height: 100%;
  transform: translateX(-${(props) => props.$currentSlide * 100}%);
`;

const CarouselSlide = styled.div<{ $imageUrl: string }>`
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.$imageUrl});
`;

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &.prev {
    left: 0.75rem;
  }

  &.next {
    right: 0.75rem;
  }
`;

const CarouselNav = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.375rem;
`;

const NavDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.2s;

  &.active {
    background: white;
  }
`;

const StatusDot = styled.div<{ $available: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$available ? '#48bb78' : '#f56565')};
`;

// Mock 데이터
// const mockLocationData = {
//   id: '1',
//   title: '홍대 걷고싶은거리',
//   address: '서울 마포구 홍대로 123',
//   lat: 37.5665,
//   lng: 126.978,
//   permitRequired: true,
//   contact: '02-1234-5678',
//   operatingHours: {
//     weekday: '18:00 - 22:00',
//     weekend: '14:00 - 22:00',
//   },
//   electricityAvailable: true,
//   notes: [
//     '소음 규제로 22시 이후 공연 금지',
//     '주차 공간 부족, 대중교통 이용 권장',
//     '우천시 실내 대체 장소 없음',
//   ],
//   images: [
//     'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
//     'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=200&fit=crop',
//     'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&fit=crop',
//   ],
// };

interface BuskingLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationData: BuskingSpot;
  onEdit: () => void;
}

export const BuskingLocationModal = ({
  isOpen,
  onClose,
  locationData,
  onEdit,
}: BuskingLocationModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const { opened, contents, onOk, openConfirm, closeConfirm, resetConfirm } =
    useConfirmStore();
  const { setTargetLocation } = useLocationStore();

  const totalSlides = locationData.images.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endX = e.changedTouches[0].screenX;
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
  };

  const handleEdit = () => {
    // 수정할 위치 데이터를 store에 설정 (이미 BuskingSpot 형식이므로 그대로 사용)
    setTargetLocation(locationData);
    onClose(); // 상세 모달 닫기
    onEdit(); // 수정 모달 열기
  };

  const handleDelete = () => {
    openConfirm({
      id: 'delete-location',
      contents: '정말로 이 장소를 삭제하시겠습니까?',
      onOk: () => {
        alert('삭제 API 호출!');
        // 삭제 로직 구현
      },
    });
    // 삭제 로직 구현
  };

  // confirm 창이 닫히기 전 내부 컨텐츠가 초기화되는 것이 보이는 UX 이슈 개선을 위해 confirm 이 닫히면 내부 컨텐츠 리셋
  useLayoutEffect(() => {
    console.log('opened:', opened);
    if (!opened) {
      setTimeout(() => {
        resetConfirm();
      }, 100);
    }
  }, [contents, opened, resetConfirm]);

  return (
    <>
      <Popover
        width={200}
        position="top"
        withArrow
        shadow="md"
        opened={opened && isOpen}
        closeOnClickOutside
        clickOutsideEvents={['click']}
      >
        <StyledModal
          opened={isOpen}
          onClose={onClose}
          withCloseButton={true}
          centered
          size="md"
          styles={{
            title: {
              width: '100%',
            },
            body: {
              padding: 0,
            },
          }}
          // Header Section
          title={
            <div className="flex items-center w-full justify-start gap-x-2">
              <div className="text-lg font-semibold">{locationData.name}</div>
              <Badge
                variant="outline"
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  locationData.permitRequired
                    ? 'bg-red-100 bg-opacity-20 border-red-200 border-opacity-40 text-white'
                    : 'bg-green-100 bg-opacity-20 border-green-200 border-opacity-40 text-white'
                }`}
              >
                {locationData.permitRequired ? '허가 필요' : '허가 불필요'}
              </Badge>
            </div>
          }
        >
          {/* Image Carousel */}
          <CarouselContainer
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CarouselSlides $currentSlide={currentSlide}>
              {locationData.images.map((image, index) => (
                <CarouselSlide key={index} $imageUrl={image} />
              ))}
            </CarouselSlides>

            <CarouselArrow className="prev" onClick={prevSlide}>
              ‹
            </CarouselArrow>
            <CarouselArrow className="next" onClick={nextSlide}>
              ›
            </CarouselArrow>

            <CarouselNav>
              {locationData.images.map((_, index) => (
                <NavDot
                  key={index}
                  className={currentSlide === index ? 'active' : ''}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </CarouselNav>
          </CarouselContainer>

          {/* Content Section */}
          <div className="p-5">
            {/* Operating Hours */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                운영 시간
              </div>
              <div className="text-sm text-gray-800 leading-relaxed">
                {locationData.operatingHours}
              </div>
            </div>

            {/* Electricity Status */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                전기 제공
              </div>
              <div
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  locationData.electricSupply
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                <StatusDot $available={locationData.electricSupply} />
                {locationData.electricSupply ? '이용 가능' : '이용 불가'}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                기타 사항
              </div>
              <div className="text-sm text-gray-800 leading-relaxed">
                {locationData.notes.split('\n').map((note, index) => (
                  <div key={index}>• {note.trim()}</div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="filled"
                className="flex-1 bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 transition-all"
                onClick={handleEdit}
              >
                수정
              </Button>
              <Popover.Target>
                <Button
                  variant="light"
                  color="red"
                  className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 hover:-translate-y-0.5 transition-all"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </Popover.Target>
            </div>
          </div>
        </StyledModal>
        {/* Confirm UI */}
        <Popover.Dropdown>
          <Text size="sm">{contents}</Text>
          <div className="flex justify-end gap-1">
            <Button
              size="xs"
              variant="default"
              color="black"
              onClick={() => {
                closeConfirm();
              }}
            >
              취소
            </Button>
            <Button
              size="xs"
              variant="filled"
              color="blue"
              onClick={() => {
                onOk();
              }}
            >
              확인
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};
