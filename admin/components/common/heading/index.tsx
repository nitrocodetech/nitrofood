import React from "react";
import { DynamicBreadcrumb } from "../breadcrums";

const Heading = ({
  title,
  breadcrumbItems,
}: {
  title: string;
  breadcrumbItems: { label: string; href?: string }[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[24px] font-semibold font-display">{title}</h1>
      <DynamicBreadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Heading;
