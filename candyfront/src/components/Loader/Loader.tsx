import React from 'react';
import './Loader.css';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
};

const sizeMap = {
  s: 'loader--small',
  m: 'loader--medium',
  l: 'loader--large',
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  const LoaderClass = `loader ${sizeMap[size]} ${className ?? ''}`.trim();
  return (
    <div className={LoaderClass}>
      <div className="loader__circle" />
    </div>
  );
};

export default Loader;
