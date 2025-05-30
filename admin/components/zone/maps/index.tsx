import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, DrawingManager } from "@react-google-maps/api";

const LIBRARIES: "drawing"[] = ["drawing"];
const GOOGLE_MAP_API_KEY = "AIzaSyBk4tvTtPaSEAVSvaao2yISz4m8Q-BeE1M";

interface MapProps {
  containerStyle: React.CSSProperties;
  zoom?: number;
  onPolygonComplete?: (coordinates: google.maps.LatLngLiteral[]) => void;
}

const Map: React.FC<MapProps> = ({
  containerStyle,
  zoom = 19,
  onPolygonComplete,
}) => {
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);
  const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setUserLocation({ lat: 33.6844, lng: 73.0479 }); // Fallback to Islamabad
      }
    );
  }, []);

  const handleOnPolygonCompleted = (newPolygon: google.maps.Polygon) => {
    if (polygon) polygon.setMap(null);

    newPolygon.setEditable(true);
    newPolygon.setDraggable(true);
    setPolygon(newPolygon);
    drawingManagerRef.current?.setDrawingMode(null);

    const path = newPolygon.getPath();
    const coordinates = Array.from({ length: path.getLength() }, (_, i) =>
      path.getAt(i).toJSON()
    );

    if (onPolygonComplete) {
      onPolygonComplete(coordinates);
    }
  };

  const handleRemovePolygon = () => {
    if (polygon) {
      polygon.setMap(null);
      setPolygon(null);

      if (googleMaps) {
        drawingManagerRef.current?.setDrawingMode(
          googleMaps.maps.drawing.OverlayType.POLYGON
        );
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAP_API_KEY}
      libraries={LIBRARIES}
      onLoad={() => setGoogleMaps(window.google)}
    >
      <div style={{ position: "relative" }}>
        {googleMaps && userLocation && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={zoom}
            options={{ disableDefaultUI: true }}
          >
            {!polygon && (
              <DrawingManager
                onLoad={(manager) => {
                  if (!drawingManagerRef.current) {
                    drawingManagerRef.current = manager;
                    manager.setDrawingMode(
                      google.maps.drawing.OverlayType.POLYGON
                    );
                  }
                }}
                options={{
                  drawingControl: true,
                  drawingControlOptions: {
                    position: googleMaps.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                  },
                  polygonOptions: {
                    fillColor: "#ff0000",
                    fillOpacity: 0.6,
                    strokeWeight: 2,
                    strokeColor: "#ff0000",
                    clickable: true,
                    editable: true,
                    draggable: true,
                    zIndex: 1,
                  },
                }}
                onPolygonComplete={handleOnPolygonCompleted}
              />
            )}
          </GoogleMap>
        )}

        {polygon && (
          <button
            onClick={handleRemovePolygon}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 5,
              padding: "8px 12px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Remove Zone
          </button>
        )}
      </div>
    </LoadScript>
  );
};

export default Map;
