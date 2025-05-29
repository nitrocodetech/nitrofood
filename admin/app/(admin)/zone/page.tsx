import CustomButton from "@/components/common/buttons";
import Heading from "@/components/common/heading";
import Image from "next/image";
import React from "react";
import { Plus } from "lucide-react";

const breadcrumbItem = [{ label: "Dashboard", href: "/" }, { label: "Zone" }];

const Zone = () => {
  return (
    <div className="py-7 px-6">
      <div className="flex items-center justify-between mb-7">
        <Heading title="Zone" breadcrumbItems={breadcrumbItem} />
        <CustomButton
          title="Add Zone"
          otherClasses="flex items-center gap-2 rounded-md py-3 h-[40px]"
          backgroundColor="bg-(--darkprimary)"
          prefixIcon={<Plus />}
        />
      </div>
    </div>
  );
};

export default Zone;
