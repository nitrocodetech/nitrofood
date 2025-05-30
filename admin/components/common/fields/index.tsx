import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import { EyeOff, Eye } from "lucide-react";

interface CustomFieldProps {
  label?: string;
  placeholder?: string;
  width?: string; // Tailwind CSS width classes like "w-full"
  value: string | number;
  name: string;
  type?: string; // e.g. "text", "password", "email", "textarea", etc.
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  "data-field"?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  rows?: number;
  labelColor?: string;
}

const CustomField: FC<CustomFieldProps> = ({
  label,
  labelColor,
  placeholder,
  width = "w-full",
  value,
  name,
  type = "text",
  onChange,
  className = "",
  "data-field": dataField,
  error = false,
  errorMessage = "",
  required = false,
  disabled = false,
  onKeyDown,
  rows = 4, // default rows for textarea
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPasswordField = type === "password";
  const isTextArea = type === "textarea";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className={`flex flex-col gap-[6px] ${width}`}>
      {label && (
        <label
          className={`text-sm font-regular ${
            labelColor ? labelColor : "text-(--highlight)"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {isTextArea ? (
          <textarea
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            data-field={dataField}
            rows={rows}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-base font-regular text-placeholder focus:border-primary outline-none ${
              disabled
                ? "bg-gray-800"
                : error
                ? "border-red-900"
                : value
                ? "border-black"
                : "border-(--borderstroke)"
            } ${className} ${disabled ? "cursor-not-allowed" : ""}`}
            required={required}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            data-field={dataField}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-base font-regular text-placeholder focus:border-primary outline-none ${
              disabled
                ? "bg-gray-800"
                : error
                ? "border-red-900"
                : value
                ? "border-black"
                : "border-(--borderstroke)"
            } ${className} ${disabled ? "cursor-not-allowed" : ""}`}
            required={required}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        )}

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye size={20} className="text-gray-500" />
            ) : (
              <EyeOff size={20} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && errorMessage && (
        <span className="text-error text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomField;
