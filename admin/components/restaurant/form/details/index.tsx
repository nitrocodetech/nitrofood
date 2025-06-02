import React from 'react';
import FileUploadArea from '../../../common/fields/FileUploadArea';
import { Input } from '../../../ui/input';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { VendorFormValues } from '@/lib/schemas/vendorschema';

type FormDataProps = {
  register: UseFormRegister<VendorFormValues>;
  errors: FieldErrors<VendorFormValues>;
  setValue: UseFormSetValue<VendorFormValues>;
};

const FormData: React.FC<FormDataProps> = ({ register, errors, setValue }) => {
  // File change handler to integrate with RHF
  const onFileChange = (field: keyof VendorFormValues, files: File[]) => {
    if (files && files.length > 0) {
      setValue(field, files[0], { shouldValidate: true });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input label="Name" placeholder="Name" {...register('name')} error={errors.name?.message} />
        <Input
          label="Email"
          placeholder="Enter Your Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone Number"
          placeholder="Enter Your Phone number"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Password"
          placeholder="Enter Your Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          label="Address"
          placeholder="Enter Your Store Address"
          {...register('address')}
          error={errors.address?.message}
        />
        <Input
          label="GST/VAT %"
          placeholder="%0.00"
          {...register('gst')}
          error={errors.gst?.message}
        />
        <Input
          label="Cuisines"
          placeholder="Cuisines"
          {...register('cuisines')}
          error={errors.cuisines?.message}
        />
        <div className="flex gap-2">
          <Input
            label="Min Delivery Time"
            placeholder="Estimated Delivery Time in Minutes"
            {...register('minDeliveryTime')}
            className="w-[240px]"
            error={errors.minDeliveryTime?.message}
          />
          <Input
            label="Max Delivery Time"
            placeholder="Estimated Delivery Time in Minutes"
            {...register('maxDeliveryTime')}
            className="w-[240px]"
            error={errors.maxDeliveryTime?.message}
          />
        </div>
        <div className="flex gap-4">
          <FileUploadArea
            title="Cover Photo"
            onDrop={files => onFileChange('coverPhoto', files)}
            // error={errors.coverPhoto?.message}
          />
          <FileUploadArea
            title="Profile Photo"
            onDrop={files => onFileChange('profilePhoto', files)}
            // error={errors.profilePhoto?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default FormData;
