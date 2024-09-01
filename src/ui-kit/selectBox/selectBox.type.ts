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
