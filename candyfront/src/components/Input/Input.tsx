// src/components/Input/Input.tsx

import React from 'react';
import classNames from 'classnames';
import './Input.css';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  /** Состояние ошибки */
  hasError?: boolean;
};

const Input: React.FC<InputProps> = ({
  value: propValue,
  onChange,
  afterSlot,
  hasError = false,
  className,
  disabled = false,
  type = 'text',
  id,
  ...restProps
}) => {
  // Внутреннее состояние для управления значением
  const [internalValue, setInternalValue] = React.useState(propValue);

  // Обновляем внутреннее состояние, если внешний value изменяется
  React.useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);

  const inputClass = classNames('input__field', {
    'input__field--disabled': disabled,
    'input__field--error': hasError,
  });

  const containerClass = classNames(
    'input',
    className,
    { 'input--disabled': disabled },
    { 'input--focus': !disabled && restProps.autoFocus },
    { 'input--has-icon': !!afterSlot }
  );

  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={containerClass}>
      <input
        id={id}
        className={inputClass}
        value={internalValue}
        onChange={(e) => {
          const newVal = e.target.value;
          setInternalValue(newVal); // обновляем внутреннее состояние
          onChange(newVal); // уведомляем родителя
        }}
        disabled={disabled}
        type={type}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...restProps}
      />
      {afterSlot && (
        <div className="input__after-slot" aria-hidden="true">
          {afterSlot}
        </div>
      )}
      {hasError && id && (
        <p id={errorId} className="input__error-message">
          Произошла ошибка
        </p>
      )}
    </div>
  );
};

export default React.memo(Input);
