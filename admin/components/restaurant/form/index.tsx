'use client';
import React, { useState } from 'react';
import Progressbar from '../../common/progressbar';
import CustomButton from '../../common/buttons';
import FormData from './details';
import VendorAddress from './delivery-zone';
import FormTiming from './timings';
import { daysOfWeek, getCurrentTime } from '@/lib/constants';
import { ZoneData } from '@/lib/interfaces';
import { useForm } from 'react-hook-form';
import { vendorSchema, VendorFormValues } from '@/lib/schemas/vendorschema';
import { zodResolver } from '@hookform/resolvers/zod';

const steps = ['Personal info', 'Address', 'Timing'];

const VendorForm = () => {
  const [step, setStep] = useState(0);
  const [zoneData, setZoneData] = useState<ZoneData>(null);
  const [timings, setTimings] = useState(
    daysOfWeek.map(day => ({
      day,
      enabled: true,
      slots: [{ start: getCurrentTime(), end: getCurrentTime() }],
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      gst: '',
      cuisines: '',
      minDeliveryTime: '',
      maxDeliveryTime: '',
      coverPhoto: null,
      profilePhoto: null,
      // add any other fields present in VendorFormValues here with initial defaults
    },
  });

  const onSubmit = (data: VendorFormValues) => {
    // Add zoneData and timings validation or attach them to data here
    console.log('Form submitted with:', { ...data, zoneData, timings });
  };

  // const handleNext = () => {
  //   setStep(prev => Math.min(prev + 1, steps.length - 1));
  // };
  const handleNext = async () => {
    let stepIsValid = false;

    if (step === 0) {
      // Validate personal info fields only
      // List fields belonging to step 0
      const valid = await trigger([
        'name',
        'email',
        'phone',
        'password',
        'address',
        'gst',
        'cuisines',
        'minDeliveryTime',
        'maxDeliveryTime',
      ]);
      stepIsValid = valid;
    } else if (step === 1) {
      // Validate zoneData is present (your custom validation)
      if (zoneData) {
        stepIsValid = true;
      } else {
        alert('Please select a delivery zone.');
        stepIsValid = false;
      }
    } else if (step === 2) {
      // You can add timing validation here if needed
      stepIsValid = true;
    }

    if (stepIsValid) {
      setStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };
  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const renderStepComponent = () => {
    switch (step) {
      case 0:
        return <FormData register={register} errors={errors} setValue={setValue} />;
      case 1:
        return (
          <VendorAddress
            zoneData={zoneData}
            setZoneData={setZoneData}
            // error={errors.zoneData?.message}
          />
        );
      case 2:
        return <FormTiming timings={timings} setTimings={setTimings} />;
      default:
        return null;
    }
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
            handleOnClick={handleSubmit(onSubmit)}
          />
        )}
      </div>
    </div>
  );
};

export default VendorForm;
