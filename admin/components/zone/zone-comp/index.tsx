"use client";
import CustomButton from "@/components/common/buttons";
import Heading from "@/components/common/heading";
import Image from "next/image";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ZoneModal from "@/components/zone/zone-modal";
import { useQuery } from "@apollo/client";
import { GET_ZONES } from "@/libs/graphql/queries/getZones";

const breadcrumbItem = [{ label: "Dashboard", href: "/" }, { label: "Zone" }];

type Zone = {
  id: string;
  title: string;
  description: string;
  location: any;
  createdAt: string;
  updatedAt: string;
};

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Zone>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
  // },
  {
    accessorKey: "location",
    header: "Coordinates",
    cell: ({ row }) => {
      const coords = JSON.stringify(row.original.location.coordinates[0]);
      return <span title={coords}>{coords.slice(0, 50)}...</span>;
    },
  },
];

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

const ZoneComp = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    zone: "",
  });
  const { data, loading, error, refetch } = useQuery(GET_ZONES);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="py-7 px-6">
      <div className="flex items-center justify-between mb-7">
        <Heading title="Zone" breadcrumbItems={breadcrumbItem} />
        <CustomButton
          title="Add Zone"
          otherClasses="flex items-center gap-2 rounded-md py-3 h-[40px]"
          backgroundColor="bg-(--darkprimary)"
          prefixIcon={<Plus />}
          handleOnClick={handleCloseModal}
        />
      </div>
      {/* <div>
        <DataTable data={payments} columns={columns} />
      </div> */}
      <div>
        {loading ? (
          <p>Loading zones...</p>
        ) : (
          <DataTable data={data?.zones || []} columns={columns} />
        )}
      </div>
      {isModalOpen && (
        <ZoneModal
          onClose={handleCloseModal}
          data={formData}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ZoneComp;
