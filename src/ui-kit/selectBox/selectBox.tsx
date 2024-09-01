import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useClickOutside } from '../../hooks';
import styles from './selectBox.module.scss';
import type {
  Option,
  SelectBoxButtonProps,
  SelectBoxOptionProps,
  SelectBoxProps,
} from './selectBox.type';

const SelectBoxOption = ({
  optionValue,
  optionLabel,
  handleSelect,
  isSelectedValue,
}: SelectBoxOptionProps) => {
  return (
    <li>
      <button
        style={{
          backgroundColor: isSelectedValue(optionValue) ? '#cfdaff6f' : '',
          color: isSelectedValue(optionValue) ? '#2d57ff' : '#000',
        }}
        className={styles.selectBoxOption}
        onClick={() => handleSelect(optionValue)}
        role="option"
        aria-selected={isSelectedValue(optionValue)}
      >
        {optionLabel}
        {isSelectedValue(optionValue) && (
          <span className={styles.selectBoxTick}>
            <FaCheck />
          </span>
        )}
      </button>
    </li>
  );
};

const SelectBoxButton = ({
  handleToggleOpen,
  isOpen,
  value,
  placeholder,
  inputValue,
  handleKeyPress,
  handleInputChange,
}: SelectBoxButtonProps) => {
  return (
    <button
      className={styles.selectBoxControl}
      onClick={handleToggleOpen}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls="listbox"
    >
      {value.length <= 0 ? null : (
        <div className={styles.selectBoxPlaceholder}>
          {value.length > 0 ? value.join(', ') : placeholder}
        </div>
      )}
      <input
        type="text"
        className={styles.selectBoxSearch}
        placeholder={placeholder}
        onClick={handleToggleOpen}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        aria-label="Search options"
      />
      <div className={styles.selectBoxArrow}>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </button>
  );
};

export const SelectBox = ({
  onChange,
  options,
  value,
  placeholder,
}: SelectBoxProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [localOptions, setLocalOptions] = useState<Option[]>(options);
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useClickOutside(selectBoxRef);

  useEffect(() => {
    setFilteredOptions(
      localOptions.filter((option) =>
        option.label
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase()),
      ),
    );
  }, [inputValue, localOptions]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      const newOption: Option = { value: inputValue, label: inputValue };
      const isItemExist = localOptions.some(
        (option) => option.value === newOption.value,
      );

      if (!isItemExist) {
        const updatedOptions = [...localOptions, newOption];
        setLocalOptions(updatedOptions);
        onChange([...value]);
      }

      setInputValue('');
    }
  };

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  const isSelectedValue = (itemValue: string) => value.includes(itemValue);

  return (
    <div className={styles.selectBox} ref={selectBoxRef}>
      <SelectBoxButton
        handleKeyPress={handleKeyPress}
        handleToggleOpen={toggleOpen}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        isOpen={isOpen}
        placeholder={placeholder}
        value={value}
      />

      {isOpen ? (
        <div className={styles.selectBoxMenu}>
          <ul className={styles.selectBoxList} role="listbox">
            {filteredOptions.map(
              ({ label: optionLabel, value: optionValue }) => (
                <SelectBoxOption
                  key={optionValue}
                  handleSelect={handleSelect}
                  optionLabel={optionLabel}
                  optionValue={optionValue}
                  isSelectedValue={isSelectedValue}
                />
              ),
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
