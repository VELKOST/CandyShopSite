import React from 'react';
import classNames from 'classnames';
import './Button.css'; // Файл стилей кнопки
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки или дочерний элемент */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled = false,
  onClick,
  ...restProps
}) => {
  const isDisabled = loading || disabled;

  const buttonClass = classNames(
    'button', // Базовый класс кнопки
    className, // Дополнительный внешний класс
    {
      'button--loading': loading,
      'button--disabled': disabled, // Применяем класс только при disabled
    }
  );

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      aria-busy={loading}
      aria-label={loading ? 'Загрузка...' : undefined} // Добавление aria-label
      onClick={!isDisabled ? onClick : undefined} // Обработчик клика
      {...restProps}
    >
      {loading ? (
        <>
          <Loader size="s" className="loader--white" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
