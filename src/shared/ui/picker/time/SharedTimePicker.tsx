import { ActionIcon } from '@mantine/core';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form/lib/types';
import { IconClock } from '@tabler/icons-react';
import React, { useRef } from 'react';

interface FormValues {
  [key: string]: string;
}

interface SharedTimePickerProps extends Omit<TimeInputProps, 'form'> {
  label: string;
  placeholder?: string;
  withSeconds?: boolean;
  required?: boolean;
  formInputProps: ReturnType<
    UseFormReturnType<
      FormValues,
      (values: FormValues) => FormValues
    >['getInputProps']
  >;
}

export const SharedTimePicker: React.FC<SharedTimePickerProps> = ({
  formInputProps,
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
      {...formInputProps}
    />
  );
};
