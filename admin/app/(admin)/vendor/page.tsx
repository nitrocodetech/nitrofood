"use client";
import CustomButton from "@/components/common/buttons";
import Heading from "@/components/common/heading";
import Modal from "@/components/common/modal";
import VendorForm from "@/components/vendorform";
import { Plus } from "lucide-react";
import React, { useState } from "react";
const breadcrumbItem = [{ label: "Dashboard", href: "/" }, { label: "Vendor" }];

const VendorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="py-4 px-3">
      <div className="flex items-center justify-between mb-7">
        <Heading title="Vendor" breadcrumbItems={breadcrumbItem} />
        <CustomButton
          title="Add Vendor"
          otherClasses="flex items-center gap-2 rounded-md py-3 h-[40px]"
          backgroundColor="bg-(--darkprimary)"
          prefixIcon={<Plus />}
          handleOnClick={handleCloseModal}
        />
      </div>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          title="Add Restaurant"
          children={<VendorForm />}
        />
      )}
    </div>
  );
};

export default VendorsPage;
