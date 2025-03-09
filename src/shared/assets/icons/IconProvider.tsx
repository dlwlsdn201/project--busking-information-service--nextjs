import { IconProps, Icon } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

const defaultProps = {
  size: 24,
  stroke: 1,
  color: '#000',
};

export const IconProvider = ({
  icon,
  color = defaultProps.color,
  size = defaultProps.size,
  stroke = defaultProps.stroke,
}: {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  size?: number;
  color?: string;
  stroke?: number; // stroke-width
}) => {
  const IconComponent = icon;

  return <IconComponent color={color} size={size} stroke={stroke} />;
};
