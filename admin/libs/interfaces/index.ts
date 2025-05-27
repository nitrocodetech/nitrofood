import { ChangeEvent, CSSProperties, ReactNode } from "react";

export interface customFieldInterface {
  label: string;
  placeholder: string;
  width?: string;
  value: string | number;
  name: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  "data-field"?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
}

export interface CustomButtonProps {
  id?: string;
  title?: string;
  color?: string;
  loaderColor?: string;
  loading?: boolean;
  backgroundColor?: string;
  fontSize?: string;
  otherClasses?: string;
  handleOnClick?: any;
  disabled?: any;
  type?: "button" | "submit" | "reset";
  prefixIcon?: ReactNode;
  postfixIcon?: ReactNode;
  textClasses?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: CSSProperties;
}
