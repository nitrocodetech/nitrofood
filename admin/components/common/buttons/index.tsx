"use client";
import { FC } from "react";
import { CustomButtonProps } from "@/libs/interfaces";
// import { CircularProgress } from '@mui/material'

const CustomButton: FC<CustomButtonProps> = ({
  title = "Custom Button",
  color = "text-white",
  loaderColor = "white",
  loading = false,
  backgroundColor = "",
  fontSize = "text-[14px] md:text-[16px]",
  otherClasses = "",
  handleOnClick,
  disabled = false,
  type,
  prefixIcon,
  postfixIcon,
  textClasses,
  onMouseEnter,
  onMouseLeave,
  style = {},
}) => {
  return (
    <button
      className={`${color} ${
        disabled ? "bg-gray-800 cursor-not-allowed" : backgroundColor
      } ${fontSize} rounded-button px-20 font-medium cursor-pointer ${otherClasses}`}
      type={type}
      onClick={handleOnClick}
      disabled={loading ? loading : disabled}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={style}
    >
      {prefixIcon && prefixIcon}
      <span className={textClasses}>
        {loading ? (
          // <CircularProgress
          //   size={20}
          //   sx={{
          //     flexDirection: 'row',
          //     justifyItems: 'center',
          //     color: `${loaderColor}`,
          //   }}
          // />
          <p>loading</p>
        ) : (
          title
        )}
      </span>
      {postfixIcon && postfixIcon}
    </button>
  );
};

export default CustomButton;
