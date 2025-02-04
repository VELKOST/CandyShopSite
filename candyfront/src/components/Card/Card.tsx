// src/components/Card/Card.tsx

import React from 'react';
import classNames from 'classnames';
import './Card.css';
import Text from '../Text';
import Button from '../Button';

export type CardProps = {
  className?: string;
  image: string;
  imageAlt?: string; // Добавлен alt текст для изображения
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  imageAlt = '',
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const cardClass = classNames('card', className, {
    'card--clickable': onClick,
  });

  // Обработчик клавиатурных событий для доступности
  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      onClick(event as any);
    }
  };

  return (
    <div
      className={cardClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? handleKeyPress : undefined}
      aria-pressed={false}
    >
      <div className="card__image-container">
        <img src={image} alt={imageAlt} className="card__image" />
      </div>
      <div className="card__content">
        {/* Основной контент */}
        <div className="card__main-content">
          {captionSlot && <div className="card__caption">{captionSlot}</div>}
          <Text className="card__title" maxLines={2}>
            {title}
          </Text>
          <Text className="card__subtitle" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>

        {/* Футер карточки */}
        {(contentSlot || actionSlot) && (
          <div className="card__footer">
            {contentSlot && (
              <div className="card__content-slot">{contentSlot}</div>
            )}
            {actionSlot && (
              <div className="card__action-slot">{actionSlot}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Card);
