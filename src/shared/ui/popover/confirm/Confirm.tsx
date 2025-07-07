import { Popover, Button, Text } from '@mantine/core';
import React from 'react';

/* TODO - [Confirm 컴포넌트 작성해서 LocationDetailModal에 적용하기] */
export const Confirm = ({ open }) => {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          This is uncontrolled popover, it is opened when button is clicked
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
