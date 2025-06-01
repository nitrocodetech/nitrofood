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
    // Add image fields here if needed later
  };
  handleChange: (field: string, value: string) => void;
};

const FormData: React.FC<FormDataProps> = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          label="Email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Phone Number"
          placeholder="Enter Your Phone number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <Input
          label="Password"
          placeholder="Enter Your Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <Input
          label="Address"
          placeholder="Enter Your Store Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <Input
          label="GST/VAT %"
          placeholder="%0.00"
          value={formData.gst}
          onChange={(e) => handleChange("gst", e.target.value)}
        />
        <Input
          label="Cuisines"
          placeholder="Cuisines"
          value={formData.cuisines}
          onChange={(e) => handleChange("cuisines", e.target.value)}
        />
        <div className="flex justify-between ">
          <Input
            label="Min Delivery Time"
            placeholder="Estimated Delivery Time in Minutes"
            value={formData.minDeliveryTime}
            onChange={(e) => handleChange("minDeliveryTime", e.target.value)}
          />
          <Input
            label="Max Delivery Time"
            placeholder="Estimated Delivery Time in Minutes"
            value={formData.maxDeliveryTime}
            onChange={(e) => handleChange("maxDeliveryTime", e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <FileUploadArea title="Cover Photo" />
          <FileUploadArea title="Profile Photo" />
        </div>
      </div>
    </div>
  );
};

export default FormData;
