// src/components/icons/CheckIcon.tsx

import React from 'react';
import { Icon, IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({
  width = 24, // Уменьшенный width для тестов
  height = 20, // Уменьшенный height для тестов
  ...props
}) => (
  <Icon
    {...props}
    width={width}
    height={height}
    viewBox="-3 -3 24 20"
    // style={{ transform: 'scale(0.8)' }}
  >
    <path
      d="M1 5.6129L6.87755 12L17 1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      transform="translate(0.5, 0.5)" // Подвинем path чуть вправо и вниз
    />
  </Icon>
);

export default CheckIcon;
