import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import CustomField from '../../common/fields';
import CustomButton from '../../common/buttons';
import Map from './polygon-map';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { CREATE_ZONE } from '@/lib/graphql/mutations/zone';

const containerStyle = {
  width: '100%',
  height: '500px',
};

interface ZoneModalProps {
  onClose: () => void;
  data: {
    title: string;
    description: string;
    zone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ onClose, data, onChange }) => {
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral[]>([]);
  const [createZone, { loading }] = useMutation(CREATE_ZONE);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // slight delay to trigger enter transition
  }, []);

  const handlePolygonData = (coords: google.maps.LatLngLiteral[]) => {
    setCoordinates(coords);
  };

  const closeWithTransition = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleSubmit = async () => {
    if (!data.title || !data.description || coordinates.length === 0) {
      toast.error('Please fill in all fields and draw a zone.');
      return;
    }

    const polygonCoordinates = coordinates.map(coord => [coord.lng, coord.lat]);

    if (
      polygonCoordinates.length > 0 &&
      JSON.stringify(polygonCoordinates[0]) !==
        JSON.stringify(polygonCoordinates[polygonCoordinates.length - 1])
    ) {
      polygonCoordinates.push(polygonCoordinates[0]);
    }

    const payload = {
      title: data.title,
      description: data.description,
      location: {
        type: 'Polygon',
        coordinates: [polygonCoordinates],
      },
    };

    console.log('Payload to send:', payload);

    try {
      const { data: result } = await createZone({
        variables: {
          createZoneInput: payload,
        },
      });

      toast.success('Zone created successfully!');
      console.log('Created zone:', result.createZone);
      closeWithTransition();
    } catch (error) {
      console.error('Error creating zone:', error);
      toast.error('Failed to create zone.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeWithTransition}
      />

      {/* Modal Panel */}
      <div
        className={`relative h-screen w-[500px] bg-white shadow-xl overflow-hidden transform transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end px-9 pt-9">
          <button onClick={closeWithTransition} className="cursor-pointer">
            <X />
          </button>
        </div>

        <div
          className="flex flex-col gap-4 overflow-y-auto hide-scrollbar p-9"
          style={{ maxHeight: 'calc(100vh - 50px)' }}
        >
          <h2 className="text-2xl font-semibold font-display">Add Zone</h2>

          <CustomField
            type="text"
            label="Title"
            name="title"
            value={data.title}
            onChange={onChange}
            placeholder="Title"
            className="text-(--baselight)"
            labelColor="text-black"
          />

          <CustomField
            type="textarea"
            label="Description"
            name="description"
            value={data.description}
            onChange={onChange}
            placeholder="Description"
            className="text-(--baselight)"
            labelColor="text-black"
          />

          <Map containerStyle={containerStyle} zoom={19} onPolygonComplete={handlePolygonData} />

          <div className="mt-4 flex items-center justify-end">
            <CustomButton
              title="Add Zone"
              otherClasses="flex items-center gap-2 rounded-md py-3 h-[40px]"
              backgroundColor="bg-(--darkprimary)"
              prefixIcon={<Plus />}
              handleOnClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneModal;
