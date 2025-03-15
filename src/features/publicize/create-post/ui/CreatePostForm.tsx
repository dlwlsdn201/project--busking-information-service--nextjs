import {
  TextInput,
  Textarea,
  Select,
  Group,
  Button,
  Switch,
  FileInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { styled } from 'styled-components';
import { IconCalendar, IconPhoto } from '@tabler/icons-react';
import { BUSKING_CATEGORIES } from '@shared/config/categories';
import { REGIONS } from '@shared/config/locations';
import { SharedTimePicker } from '@shared/ui/picker';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface CreatePostFormProps {
  closeModal: () => void;
}

export const CreatePostForm = ({ closeModal }: CreatePostFormProps) => {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      region: '',
      category: '',
      isFree: true,
      image: null,
    },
    validate: {
      title: (value) =>
        value.trim().length < 3 ? '제목은 3자 이상이어야 합니다' : null,
      description: (value) =>
        value.trim().length < 10 ? '상세 설명은 10자 이상이어야 합니다' : null,
      date: (value) => (!value ? '날짜를 선택해주세요' : null),
      time: (value) => (!value ? '시간을 입력해주세요' : null),
      location: (value) => (!value ? '장소를 입력해주세요' : null),
      region: (value) => (!value ? '지역을 선택해주세요' : null),
      category: (value) => (!value ? '장르를 선택해주세요' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // API 호출 로직
    console.log('Form submitted:', values);

    // 성공 시 모달 닫기
    onSubmitSuccess();
  };

  return (
    <StyledForm onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="공연 제목"
        placeholder="공연 제목을 입력하세요"
        required
        {...form.getInputProps('title')}
      />

      {/* TODO - [컴포넌트 모듈화 필요] */}
      <Textarea
        label="공연 상세 설명"
        placeholder="공연에 대한 설명을 자세히 작성해주세요"
        minRows={4}
        required
        {...form.getInputProps('description')}
      />

      <Group grow>
        <DateTimePicker
          label="공연 날짜"
          placeholder="공연 날짜들을 선택하세요."
          required
          {...form.getInputProps('date')}
          rightSection={<IconCalendar />}
        />

        <SharedTimePicker
          label="공연 시간 (시작)"
          placeholder="HH:MM - HH:MM"
          withSeconds={false}
          required
          form={form}
          // {...form.getInputProps('time')}
        />
        <SharedTimePicker
          label="공연 시간 (종료)"
          placeholder="HH:MM - HH:MM"
          withSeconds={false}
          required
          form={form}
          // {...form.getInputProps('time')}
        />
      </Group>
      {/* TODO - [컴포넌트 모듈화 필요] */}
      <TextInput
        label="공연 장소"
        placeholder="정확한 장소명을 입력해주세요"
        required
        {...form.getInputProps('location')}
      />

      <Group grow>
        <Select
          label="지역"
          placeholder="지역을 선택하세요"
          data={REGIONS}
          required
          {...form.getInputProps('region')}
        />

        <Select
          label="장르"
          placeholder="장르를 선택하세요"
          data={BUSKING_CATEGORIES}
          required
          {...form.getInputProps('category')}
        />
      </Group>

      <FileInput
        label="공연 이미지"
        placeholder="이미지를 선택해주세요"
        accept="image/png,image/jpeg"
        rightSection={<IconPhoto size={16} />}
        {...form.getInputProps('image')}
      />

      <Switch
        label="무료 공연"
        checked={form.values.isFree}
        onChange={(event) =>
          form.setFieldValue('isFree', event.currentTarget.checked)
        }
        className="cursor-pointer!"
        color="indigo"
      />

      <Group justify="flex-end" gap={'0.5rem'}>
        {/* TODO - [컴포넌트 모듈화 필요] */}
        <Button
          type="button"
          variant="outline"
          color="gray"
          className="h-auto! w-[4rem]! px-4! py-3!"
          onClick={closeModal}
        >
          취소
        </Button>
        <Button
          type="submit"
          color="indigo"
          className="h-auto! w-[4rem]! px-4! py-3!"
        >
          등록
        </Button>
      </Group>
    </StyledForm>
  );
};
