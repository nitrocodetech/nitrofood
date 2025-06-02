"use client";

import React, { FC, useState } from "react";
import ZoneSelectorMap from "./zoneselectormap";
import { VendorAddressProps, ZoneData } from "@/libs/interfaces";

const VendorAddress: FC<VendorAddressProps> = ({
  zoneData,
  setZoneData,
  error,
}) => {
  const handleZoneComplete = (data: ZoneData) => {
    console.log("Shape data received from map:", data);
    setZoneData(data);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        Address and Delivery Radius
      </h2>

      <ZoneSelectorMap
        containerStyle={{ width: "100%", height: "400px" }}
        onZoneComplete={handleZoneComplete}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {/* {zoneData && (
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm">
          {JSON.stringify(zoneData, null, 2)}
        </pre>
      )} */}
    </div>
  );
};

export default VendorAddress;
