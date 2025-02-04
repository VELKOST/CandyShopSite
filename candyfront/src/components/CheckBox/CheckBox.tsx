// src/components/CheckBox/CheckBox.tsx
import React from 'react';
import classNames from 'classnames';
import './CheckBox.css';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  disabled = false,
  onChange,
  className,
  ...restProps
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(event.target.checked);
  };

  return (
    <label
      className={classNames('checkbox', className, {
        'checkbox--disabled': disabled,
      })}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...restProps}
        className="checkbox__input"
      />
      <span className="checkbox__box">
        {checked && (
          <svg
            className="checkbox__icon"
            width="30"
            height="23"
            viewBox="0 0 30 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66663 9.35484L11.4625 20L28.3333 1.66667"
              stroke="#518581"
              strokeWidth="3.33333"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CheckBox;
