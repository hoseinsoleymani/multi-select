export interface Option {
  value: string;
  label: string;
}

export interface SelectBoxProps {
  options: Option[];
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export interface SelectBoxButtonProps
  extends Omit<SelectBoxProps, 'onChange' | 'options'> {
  handleToggleOpen: () => void;
  isOpen: boolean;
  inputValue: string;
  handleKeyPress: (value: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectBoxOptionProps {
  optionValue: string;
  optionLabel: string;
  handleSelect: (value: string) => void;
  isSelectedValue: (value: string) => boolean;
}
