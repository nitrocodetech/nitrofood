import { customFieldInterface } from "@/libs/interfaces";
import React, { FC, useState } from "react";
import Image from "next/image";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

const CustomField: FC<customFieldInterface> = ({
  label,
  placeholder,
  width = "w-full",
  value,
  name,
  type,
  onChange,
  className = "",
  "data-field": dataField,
  error = false,
  errorMessage = "",
  required = false,
  disabled = false,
  onKeyDown,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className={`flex flex-col gap-[6px] ${width}`}>
      {label && (
        <label className="text-sm font-regular text-(--highlight)">
          {label}
        </label>
      )}
      <div className="relative">
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
