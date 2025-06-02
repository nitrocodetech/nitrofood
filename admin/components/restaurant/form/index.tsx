'use client';
import React, { useState } from 'react';
import Progressbar from '../../common/progressbar';
import CustomButton from '../../common/buttons';
import FormData from './details';
import VendorAddress from './delivery-zone';
import FormTiming from './timings';
import { daysOfWeek, getCurrentTime } from '@/lib/constants';
import { ZoneData } from '@/lib/interfaces';
// import AddressForm from "./address-form";
// import TimingForm from "./timing-form";

const steps = ['Personal info', 'Address', 'Timing'];

const VendorForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    gst: '',
    cuisines: '',
    minDeliveryTime: '',
    maxDeliveryTime: '',
    coverPhoto: null as File | null,
    profilePhoto: null as File | null,
  });
  const [zoneData, setZoneData] = useState<ZoneData>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };
  const handleFileChange = (field: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      [field]: file,
    }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const [timings, setTimings] = useState(
    daysOfWeek.map(day => ({
      day,
      enabled: true,
      slots: [{ start: getCurrentTime(), end: getCurrentTime() }],
    }))
  );
  const validateStep = (): boolean => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      // Validate formData fields
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        valid = false;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
        valid = false;
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
        valid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        valid = false;
      }
      // Add more validations as needed
    } else if (step === 1) {
      if (!zoneData) {
        newErrors.zoneData = 'Delivery zone is required';
        valid = false;
      }
    } else if (step === 2) {
      // Validate timings
      timings.forEach(({ day, enabled, slots }) => {
        if (enabled) {
          slots.forEach(({ start, end }, index) => {
            if (!start || !end) {
              newErrors[`timing_${day}_slot_${index}`] = 'Start and end time required';
              valid = false;
            } else if (start >= end) {
              newErrors[`timing_${day}_slot_${index}`] = 'Start time must be before end time';
              valid = false;
            }
          });
        }
      });
    }

    setErrors(newErrors);
    return valid;
  };
  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // All validations passed
      console.log('Form submitted!', { formData, zoneData, timings });
    }
  };
  const renderStepComponent = () => {
    switch (step) {
      case 0:
        return (
          <FormData
            formData={formData}
            errors={errors}
            handleFileChange={handleFileChange}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <VendorAddress zoneData={zoneData} setZoneData={setZoneData} error={errors.zoneData} />
        );
      case 2:
        return <FormTiming timings={timings} setTimings={setTimings} />;
      default:
        return null;
    }
  };

  console.log(formData);
  console.log(timings);

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
