import React from "react";
import FileUploadArea from "../common/fields/FileUploadArea";
import { Input } from "../ui/input";

type FormDataProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    gst: string;
    cuisines: string;
    minDeliveryTime: string;
    maxDeliveryTime: string;
    coverPhoto: File | null;
    profilePhoto: File | null;
  };
  handleChange: (field: string, value: string) => void;
  handleFileChange: (field: string, file: File) => void;
  errors: { [key: string]: string };
};

const FormData: React.FC<FormDataProps> = ({
  formData,
  handleChange,
  handleFileChange,
  errors,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Phone Number"
          placeholder="Enter Your Phone number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={errors.phone}
        />
        <Input
          label="Password"
          placeholder="Enter Your Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
        />
        <Input
          label="Address"
          placeholder="Enter Your Store Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          error={errors.address}
        />
        <Input
          label="GST/VAT %"
          placeholder="%0.00"
          value={formData.gst}
          onChange={(e) => handleChange("gst", e.target.value)}
          error={errors.gst}
        />
        <Input
          label="Cuisines"
          placeholder="Cuisines"
          value={formData.cuisines}
          error={errors.cuisines}
          onChange={(e) => handleChange("cuisines", e.target.value)}
        />
        <div className="flex gap-2">
          <Input
            label="Min Delivery Time"
            placeholder="Estimated Delivery Time in Minutes"
            value={formData.minDeliveryTime}
            onChange={(e) => handleChange("minDeliveryTime", e.target.value)}
            className="w-[240px]"
            error={errors.minDeliveryTime}
          />
          <Input
            label="Max Delivery Time"
            placeholder="Estimated Delivery Time in Minutes"
            value={formData.maxDeliveryTime}
            onChange={(e) => handleChange("maxDeliveryTime", e.target.value)}
            className="w-[240px]"
            error={errors.maxDeliveryTime}
          />
        </div>
        <div className="flex gap-4">
          <FileUploadArea
            title="Cover Photo"
            onDrop={(files) => handleFileChange("coverPhoto", files[0])}
          />
          <FileUploadArea
            title="Profile Photo"
            onDrop={(files) => handleFileChange("profilePhoto", files[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default FormData;
