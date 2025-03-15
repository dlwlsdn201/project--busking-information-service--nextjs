import { ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { IconClock } from '@tabler/icons-react';
import React, { useRef } from 'react';

interface SharedTimePickerProps {
  form?: UseFormReturnType<{
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    region: string;
    category: string;
    isFree: boolean;
    image: null;
  }>;
  label: string;
  placeholder?: string;
  withSeconds?: boolean;
  required?: boolean;
}

export const SharedTimePicker: React.FC<SharedTimePickerProps> = ({
  form,
  label,
  placeholder,
  withSeconds = false,
  required = false,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <TimeInput
      label={label}
      placeholder={placeholder}
      withSeconds={withSeconds}
      pointer={true}
      required={required}
      ref={ref}
      rightSection={pickerControl}
      {...form?.getInputProps('time')}
    />
  );
};
