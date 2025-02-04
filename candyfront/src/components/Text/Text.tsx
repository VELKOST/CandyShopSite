import React from 'react';
import './Text.css';
import classNames from 'classnames';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

interface ExtendedCSSProperties extends React.CSSProperties {
  WebkitLineClamp?: number;
  WebkitBoxOrient?:
    | 'horizontal'
    | 'vertical'
    | 'inline-axis'
    | 'block-axis'
    | 'inherit'
    | 'initial'
    | 'unset';
}

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const Component = tag as keyof JSX.IntrinsicElements;

  const classes = classNames('text', className, {
    [`text--weight-${weight}`]: weight,
    [`text--view-${view}`]: view && !weight,
    [`text--color-${color}`]: color,
    'text--with-max-lines': maxLines,
    [`text--max-lines-${maxLines}`]: maxLines,
  });

  const style: ExtendedCSSProperties | undefined = maxLines
    ? {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : undefined;

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};
export default Text;
