// src/components/MultiDropdown/MultiDropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input';
import './MultiDropdown.css';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводиться в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setInputValue('');
        setIsInputActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    if (value.some((v) => v.key === option.key)) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const isOptionSelected = (option: Option) =>
    value.some((v) => v.key === option.key);

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      setIsInputActive(true);
    }
  };

  // Определяем, нужно ли отображать выбранные опции серым
  const shouldShowSelectedInfo = isOpen && value.length > 0;

  // Формируем строку для отображения
  const selectedOptionsText = value.map((opt) => opt.value).join(', ');

  const displayValue = shouldShowSelectedInfo
    ? selectedOptionsText
    : isInputActive || inputValue
      ? inputValue
      : value.length > 0
        ? getTitle(value)
        : '';

  // Определяем, нужно ли применить серый стиль
  const inputClassName = shouldShowSelectedInfo
    ? 'multi-dropdown__input--selected'
    : '';

  const placeholder = value.length === 0 ? getTitle([]) : '';

  // Добавляем иконку стрелки для afterSlot
  const arrowIcon = (
    <span
      className={`multi-dropdown__arrow ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)} // Стрелка также открывает и закрывает дропдаун
    />
  );

  return (
    <div className={`multi-dropdown ${className || ''}`} ref={dropdownRef}>
      <Input
        type="text"
        value={disabled ? '' : displayValue}
        onChange={handleInputChange}
        onClick={handleInputFocus}
        onFocus={handleInputFocus}
        placeholder={disabled ? '' : placeholder}
        disabled={disabled}
        afterSlot={arrowIcon} // Передаем стрелку в afterSlot
        className={inputClassName} // Применяем класс при необходимости
      />
      {isOpen && !disabled && (
        <ul className="options-list">
          {filteredOptions.map((option) => (
            <li
              key={option.key}
              className={`option-item ${
                isOptionSelected(option) ? 'selected' : ''
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
