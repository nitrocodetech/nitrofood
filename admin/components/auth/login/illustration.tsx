import React from "react";
import Image from "next/image";
import CustomSvg from "@/assets/TempSvg";
import logo from "@/assets/Logo.png";

const LoginIllustration = () => {
  return (
    <div className="h-screen py-8">
      <div className="relative flex flex-col justify-between py-8 px-20 text-white w-full h-full">
        <div className="absolute inset-0 -z-10 w-full h-full">
          <CustomSvg />
        </div>
        <div className="mt-10">
          <h1 className="text-6xl text-white font-bold leading-snug font-display">
            Start Your <br /> Journey <br /> with Us
          </h1>
        </div>
        <div className="flex items-center gap-4 pl-16 text-sm font-medium font-display">
          <Image src={logo} alt="icon" width={48} height={48} />
          <p>
            We’re crafting an attractive UI UX Design <br /> that can solve
            problems
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginIllustration;
