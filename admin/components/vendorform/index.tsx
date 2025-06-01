"use client";
import React, { useState } from "react";
import Progressbar from "../common/progressbar";
import CustomButton from "../common/buttons";
import FormData from "./form-data";
// import AddressForm from "./address-form";
// import TimingForm from "./timing-form";

const steps = ["Personal info", "Address", "Timing"];

const VendorForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    gst: "",
    cuisines: "",
    minDeliveryTime: "",
    maxDeliveryTime: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepComponent = () => {
    switch (step) {
      case 0:
        return <FormData formData={formData} handleChange={handleChange} />;
      case 1:
        return <div>Address Form Placeholder</div>;
      case 2:
        return <div>Timing Form Placeholder</div>;
      default:
        return null;
    }
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <div className="flex flex-col gap-8 pb-7">
      <div className="mt-1">
        <Progressbar step={step} data={steps} />
      </div>

      <div>{renderStepComponent()}</div>

      <div className="flex gap-2 justify-end">
        {step !== 0 && (
          <CustomButton
            title="Back"
            otherClasses="w-[120px] rounded-md h-[40px]"
            backgroundColor="bg-black"
            color="text-white"
            handleOnClick={handleBack}
          />
        )}
        {step < steps.length - 1 ? (
          <CustomButton
            title="Next"
            otherClasses="w-[120px] rounded-md h-[40px]"
            backgroundColor="bg-(--darkprimary)"
            color="text-white"
            handleOnClick={handleNext}
          />
        ) : (
          <CustomButton
            title="Submit"
            otherClasses="w-[120px] rounded-md h-[40px]"
            backgroundColor="bg-green-600"
            color="text-white"
            handleOnClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default VendorForm;
