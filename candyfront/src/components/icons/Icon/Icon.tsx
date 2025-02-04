import React from 'react';
import classNames from 'classnames';
import './Icon.css';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

export const Icon: React.FC<IconProps> = ({
  className,
  color,
  width,
  height,
  viewBox,
  children,
  ...restProps
}) => {
  const classes = classNames('icon', className, {
    [`icon--color-${color}`]: color,
  });

  return (
    <svg
      className={classes}
      width={width}
      height={height}
      fill="currentColor"
      aria-hidden="true"
      viewBox={viewBox}
      {...restProps}
    >
      {children}
    </svg>
  );
};
export default Icon;
