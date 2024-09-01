import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../hooks';
import styles from './selectBox.module.scss';
import type { Option, SelectBoxProps } from './selectBox.type';

export const SelectBox = ({
  onChange,
  options,
  value,
  placeholder,
}: SelectBoxProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [localOptions, setLocalOptions] = useState<Option[]>(options);
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const { handleClickOutside, isOpen, setIsOpen } =
    useClickOutside(selectBoxRef);

  useEffect(() => {
    setFilteredOptions(
      localOptions.filter((option) =>
        option.label
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      ),
    );
  }, [searchTerm, localOptions]);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      const newOption: Option = { value: searchTerm, label: searchTerm };
      const isItemExist = localOptions.some(
        (option) => option.value === newOption.value,
      );

      if (!isItemExist) {
        const updatedOptions = [...localOptions, newOption];
        setLocalOptions(updatedOptions);
        onChange([...value]);
      }

      setSearchTerm('');
    }
  };

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  console.log(value);

  return (
    <div className={styles.selectBox} ref={selectBoxRef}>
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
          placeholder="Search or add new item..."
          onClick={handleToggleOpen}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Search options"
        />
        <div className={styles.selectBoxArrow}>&#9660;</div>
      </button>

      {isOpen ? (
        <div className={styles.selectBoxMenu}>
          <ul className={styles.selectBoxList} role="listbox">
            {filteredOptions.map((option) => (
              <li key={option.value}>
                <button
                  className={styles.selectBoxOption}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={value.includes(option.value)}
                >
                  {option.label}
                  {value.includes(option.value) && (
                    <span className={styles.selectBoxTick}>:heavy_tick:</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

// import React, { useEffect, useRef, useState } from 'react';

// import styles from './selectBox.module.scss';
// import type { Option, SelectBoxProps } from './selectBox.type';

// export const SelectBox = ({
//   options,
//   placeholder,
//   value,
//   onChange,
// }: SelectBoxProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [localOptions, setLocalOptions] = useState<Option[]>(options);
//   const selectBoxRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setLocalOptions((prevOptions) => {
//       return options
//         .filter((option) =>
//           option.label.toLowerCase().includes(searchTerm.toLowerCase()),
//         )
//         .concat(
//           prevOptions.filter(
//             (option) => !options.some((opt) => opt.value === option.value),
//           ),
//         );
//     });
//   }, [searchTerm, options]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         selectBoxRef.current &&
//         !selectBoxRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSelect = (selectedValue: string) => {
//     if (value.includes(selectedValue)) {
//       onChange(value.filter((v) => v !== selectedValue));
//     } else {
//       onChange([...value, selectedValue]);
//     }
//   };

//   const handleToggleOpen = () => setIsOpen((prev) => !prev);

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter' && searchTerm.trim()) {
//       const newOption: Option = { value: searchTerm, label: searchTerm };

//       if (!localOptions.some((option) => option.value === newOption.value)) {
//         setLocalOptions((prevOptions) => [...prevOptions, newOption]);
//         onChange([...value, newOption.value]);
//       }
//       setSearchTerm('');
//     }
//   };

//   const displayValue = value.join(', ');

//   return (
//     <div className={styles.selectBox} ref={selectBoxRef}>
//       <div
//         className={styles.selectBoxControl}
//         onClick={handleToggleOpen}
//         role="combobox"
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         aria-controls="listbox"
//         tabIndex={0}
//         onKeyDown={(e) => e.key === 'Enter' && handleToggleOpen()}
//       >
//         <input
//           type="text"
//           className={styles.selectBoxInput}
//           placeholder={placeholder}
//           value={searchTerm || displayValue}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={handleKeyPress}
//           aria-label="Search or add new item"
//         />
//         <div className={styles.selectBoxArrow}>&#9660;</div>
//       </div>

//       {isOpen ? (
//         <div className={styles.selectBoxMenu}>
//           <ul className={styles.selectBoxList} role="listbox">
//             {localOptions.map((option) => (
//               <li key={option.value}>
//                 <button
//                   className={styles.selectBoxOption}
//                   onClick={() => handleSelect(option.value)}
//                   role="option"
//                   aria-selected={value.includes(option.value)}
//                 >
//                   {option.label}
//                   {value.includes(option.value) && (
//                     <span className={styles.selectBoxTick}>
//                       :heavy_check_mark:
//                     </span>
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// import React, { useEffect, useRef, useState } from 'react';

// import styles from './selectBox.module.scss';
// import type { Option, SelectBoxProps } from './selectBox.type';

// export const SelectBox = ({
//   options,
//   placeholder = 'Select...',
//   selectedValues = [],
//   onChange,
// }: SelectBoxProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [currentOptions, setCurrentOptions] = useState<Option[]>(options);
//   const [selectedOptions, setSelectedOptions] =
//     useState<string[]>(selectedValues);
//   const containerRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     setCurrentOptions(options);
//   }, [options]);
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleOptionToggle = (option: Option) => {
//     let newSelectedOptions;

//     if (selectedOptions.includes(option.value)) {
//       newSelectedOptions = selectedOptions.filter(
//         (value) => value !== option.value,
//       );
//     } else {
//       newSelectedOptions = [...selectedOptions, option.value];
//     }
//     setSelectedOptions(newSelectedOptions);
//     onChange(newSelectedOptions);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter' && inputValue.trim()) {
//       const newOption: Option = {
//         value: inputValue.trim(),
//         label: inputValue.trim(),
//       };
//       setCurrentOptions([...currentOptions, newOption]);
//       handleOptionToggle(newOption);
//       setInputValue('');
//     }
//   };

//   const handleInputClick = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={styles.multiSelectContainer} ref={containerRef}>
//       <div className={styles.inputContainer}>
//         <input
//           type="text"
//           value={inputValue}
//           placeholder={
//             selectedOptions
//               .map(
//                 (val) =>
//                   currentOptions.find((opt) => opt.value === val)?.label || val,
//               )
//               .join(', ') || placeholder
//           }
//           onChange={handleInputChange}
//           onClick={handleInputClick}
//           onKeyDown={handleKeyDown}
//           className={styles.input}
//         />
//       </div>
//       {isOpen ? (
//         <ul className={styles.optionsList}>
//           {currentOptions.map((option) => (
//             <li
//               key={option.value}
//               className={`${styles.option} ${selectedOptions.includes(option.value) ? styles.selected : ''}`}
//               onClick={() => handleOptionToggle(option)}
//             >
//               {option.label}
//               {selectedOptions.includes(option.value) && (
//                 <span className={styles.tick}>:heavy_tick:</span>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// };
