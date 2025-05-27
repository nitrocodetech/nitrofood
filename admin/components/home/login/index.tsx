"use client";
import React, { useState } from "react";
import Cross_Icon from "@/assets/Layer 2.png";
import Image from "next/image";
import CustomField from "@/components/common/fields";
import CustomButton from "@/components/common/buttons";
import Google_Icon from "@/assets/google.png";
import logo from "@/assets/Logo.png";
import loginsvg from "@/assets/loginsvg.svg";
import CustomSvg from "@/assets/TempSvg";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" px-8 h-screen grid grid-cols-2 gap-4">
      {/* Image section */}
      <div className="h-screen py-8">
        <div
          className="relative flex flex-col justify-between py-8 px-20 text-white w-full h-full"
        >
        <div className="absolute inset-0 -z-10 w-full h-full"><CustomSvg/></div>

          {/* Heading */}
          <div className="mt-10">
            <h1 className="text-6xl text-white font-bold leading-snug font-display">
              Start Your <br />
              Journey <br />
              with Us
            </h1>
          </div>

          {/* Subtext + Icon */}
          <div className="flex items-center gap-4 pl-16 text-sm font-medium font-display">
            <Image
              src={logo} // Path relative to /public if using Next.js
              alt="icon"
              width={48}
              height={48}
            />
            <p className="text-white">
              We’re crafting an attractive UI UX Design <br /> that can solve
              problems
            </p>
          </div>
        </div>
      </div>

      {/* Context section */}
      <div className="">
        {/* Cross icon */}
        <div className="flex items-center justify-end mb-16 pr-12 mt-3">
          <Image src={Cross_Icon} alt="cross" width={36} height={36} />
        </div>

        {/* Text section */}
        <div className="px-30 flex flex-col gap-[34px]">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-display font-bold text-[--highlight]">
              Welcome Back
            </h1>
            <p className="text-sm font-display font-normal text-[--baselight]">
              Sign in to your account
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Input Fields */}
            <div className="flex flex-col gap-4">
              <CustomField
                type="text"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="domat@example.com"
                className="text-(--baselight)"
              />

              <CustomField
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className="text-(--baselight)"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <p className="text-sm font-normal font-display text-(--highlight)">
                    Remember me
                  </p>
                </div>
                <div>
                  <p className="text-sm font-normal font-display text-(--underlight)">
                    Forgot Password ?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <CustomButton
                title="Sign in"
                color="text-white"
                backgroundColor="bg-(--darkprimary)"
                otherClasses="h-[44px] rounded-lg"
              />
              <div className="flex items-center gap-2 w-full">
                <span className="flex-1 h-px bg-gray-300"></span>
                <span className="text-sm text-gray-500">or</span>
                <span className="flex-1 h-px bg-gray-300"></span>
              </div>
              <div>
                <CustomButton
                  title="Sign in with Google"
                  prefixIcon={<Image src={Google_Icon} alt="google-icon" />}
                  color="text-(--buttoncolor)"
                  otherClasses="flex items-center justify-center gap-2 border border-(--borderstroke) rounded-full h-[48px] w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p className="text-sm font-normal text-(--baselight)">
                Don’t have an account?
              </p>
              <p className="text-sm font-medium font-display text-black cursor-pointer">
                Sign up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
