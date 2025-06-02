'use client';

import React, { FC, useState } from 'react';
import ZoneSelectorMap from './polygin-circle-map';
import { VendorAddressProps, ZoneData } from '@/lib/interfaces';

const VendorAddress: FC<VendorAddressProps> = ({ zoneData, setZoneData, error }) => {
  const handleZoneComplete = (data: ZoneData) => {
    console.log('Shape data received from map:', data);
    setZoneData(data);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Address and Delivery Radius</h2>
      {/* dropdown here */}
      <ZoneSelectorMap
        containerStyle={{ width: '100%', height: '400px' }}
        onZoneComplete={handleZoneComplete}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default VendorAddress;
