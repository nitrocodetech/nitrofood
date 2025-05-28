import React from "react";
import Image from "next/image";
import bell_icon from "@/assets/fi-sr-bell.png";
import message_icon from "@/assets/fi-sr-envelope.png";
import calender_icon from "@/assets/Icon.png";
import flag_icon from "@/assets/Img.png";
import caret_down_icon from "@/assets/fi-sr-caret-down.png";

const Navbar = () => {
  const isActive = true;

  return (
    <div className="w-full flex justify-end items-center px-6 py-3 max-h-[64px] border-b border-gray-200 bg-white">
      <div className="flex items-center gap-6">
        {/* Icon group */}
        <div className="flex items-center gap-4 px-2">
          <Image src={calender_icon} alt="calendar" />
          <Image src={message_icon} alt="message" />
          <Image src={bell_icon} alt="bell" />
          <Image src={flag_icon} alt="flag" />
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3">
          {/* Profile image with status indicator */}
          <div className="relative w-8 h-7">
            <Image
              src={flag_icon}
              alt="profile"
              className="rounded-full object-cover"
              fill
            />
            {isActive && (
              <div className="absolute bottom-[-2px] right-0 w-3 h-3 bg-[#22CAAD] rounded-full ring-2 ring-white z-10" />
            )}
          </div>

          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold text-black font-display">
              Jay Hargudson
            </p>
            <p className="text-xs text-gray-500 font-display">Manager</p>
          </div>

          <Image src={caret_down_icon} alt="dropdown" width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
