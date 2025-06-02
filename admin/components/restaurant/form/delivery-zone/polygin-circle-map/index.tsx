'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DrawingManager } from '@react-google-maps/api';

const LIBRARIES: 'drawing'[] = ['drawing'];
const GOOGLE_MAP_API_KEY = 'AIzaSyBk4tvTtPaSEAVSvaao2yISz4m8Q-BeE1M';

interface MapProps {
  containerStyle: React.CSSProperties;
  zoom?: number;
  onZoneComplete?: (shapeData: ShapeResult) => void;
}

type ShapeType = 'circle' | 'polygon' | null;

type ShapeResult =
  | { type: 'circle'; center: google.maps.LatLngLiteral; radius: number }
  | { type: 'polygon'; coordinates: google.maps.LatLngLiteral[] };

const ZoneSelectorMap: React.FC<MapProps> = ({ containerStyle, zoom = 17, onZoneComplete }) => {
  const [shapeType, setShapeType] = useState<ShapeType>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const shapeRef = useRef<google.maps.Circle | google.maps.Polygon | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setUserLocation({ lat: 33.6844, lng: 73.0479 }); // fallback to Islamabad
      }
    );
  }, []);

  const handleOverlayComplete = (e: google.maps.drawing.OverlayCompleteEvent) => {
    // Remove existing shape
    if (shapeRef.current) {
      shapeRef.current.setMap(null);
    }

    if (e.type === google.maps.drawing.OverlayType.CIRCLE) {
      const circle = e.overlay as google.maps.Circle;
      shapeRef.current = circle;

      const center = circle.getCenter()?.toJSON();
      const radius = circle.getRadius();

      if (center) {
        onZoneComplete?.({ type: 'circle', center, radius });
      }
    } else if (e.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = e.overlay as google.maps.Polygon;
      shapeRef.current = polygon;

      const path = polygon
        .getPath()
        .getArray()
        .map(latLng => latLng.toJSON());

      onZoneComplete?.({ type: 'polygon', coordinates: path });
    }

    setShapeType(null); // disable drawing mode
  };

  const handleRemoveShape = () => {
    if (shapeRef.current) {
      shapeRef.current.setMap(null);
      shapeRef.current = null;
    }
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAP_API_KEY}
        libraries={LIBRARIES}
        onLoad={() => setGoogleMaps(window.google)}
      >
        <div style={{ position: 'relative' }}>
          {googleMaps && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation || { lat: 33.6844, lng: 73.0479 }}
              zoom={zoom}
              onLoad={map => setMapRef(map)}
              options={{ disableDefaultUI: true }}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#FF0000',
                    fillOpacity: 1,
                    strokeWeight: 1,
                  }}
                />
              )}

              {shapeType && (
                <DrawingManager
                  onOverlayComplete={handleOverlayComplete}
                  options={{
                    drawingControl: false,
                    drawingMode:
                      shapeType === 'circle'
                        ? google.maps.drawing.OverlayType.CIRCLE
                        : google.maps.drawing.OverlayType.POLYGON,
                    circleOptions: {
                      fillColor: '#00bfff',
                      fillOpacity: 0.5,
                      strokeColor: '#00bfff',
                      strokeWeight: 2,
                      editable: true,
                      draggable: true,
                    },
                    polygonOptions: {
                      fillColor: '#ff0000',
                      fillOpacity: 0.6,
                      strokeColor: '#ff0000',
                      strokeWeight: 2,
                      editable: true,
                      draggable: true,
                    },
                  }}
                />
              )}
            </GoogleMap>
          )}

          {shapeRef.current && (
            <button
              onClick={handleRemoveShape}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 5,
                padding: '8px 12px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Remove Zone
            </button>
          )}
        </div>
      </LoadScript>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setShapeType('circle')}
          className={`cursor-pointer px-4 w-[110px] h-[100px] rounded ${
            shapeType === 'circle' ? 'bg-(--darkprimary) text-white' : 'bg-gray-200'
          }`}
        >
          Circle
        </button>
        <button
          onClick={() => setShapeType('polygon')}
          className={`cursor-pointer px-4 w-[110px] h-[100px] rounded ${
            shapeType === 'polygon' ? 'bg-(--darkprimary) text-white' : 'bg-gray-200'
          }`}
        >
          Polygon
        </button>
      </div>
    </div>
  );
};

export default ZoneSelectorMap;
