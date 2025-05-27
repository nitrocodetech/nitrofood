// FormPage.tsx
import React from "react";
import Image from "next/image";
import CustomField from "@/components/common/fields";
import CustomButton from "@/components/common/buttons";
import Cross_Icon from "@/assets/Layer 2.png";
import Google_Icon from "@/assets/google.png";

interface FormPageProps {
  formData: {
    email: string;
    password: string;
  };
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormPage: React.FC<FormPageProps> = ({
  formData,
  handleOnChange,
  handler,
}) => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-end mb-16 pr-12 mt-3">
        <Image src={Cross_Icon} alt="cross" width={36} height={36} />
      </div>

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
              <p className="text-sm font-normal font-display text-(--underlight)">
                Forgot Password ?
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <CustomButton
              title="Sign in"
              color="text-white"
              backgroundColor="bg-(--darkprimary)"
              otherClasses="h-[44px] rounded-lg"
              handleOnClick={handler}
            />

            <div className="flex items-center gap-2 w-full">
              <span className="flex-1 h-px bg-gray-300"></span>
              <span className="text-sm text-gray-500">or</span>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            <CustomButton
              title="Sign in with Google"
              prefixIcon={<Image src={Google_Icon} alt="google-icon" />}
              color="text-(--buttoncolor)"
              otherClasses="flex items-center justify-center gap-2 border border-(--borderstroke) rounded-full h-[48px] w-full"
            />
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
  );
};

export default FormPage;
