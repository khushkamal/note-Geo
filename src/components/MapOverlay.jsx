import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapOverlay = ({ onMapClick }) => {
  const position = [20.5937, 78.9629]; // Center of India

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        onMapClick(`${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`);
      },
    });
    return null;
  };

  return (
    <div className="flex-1 h-full">
      <MapContainer 
        center={position} 
        zoom={5} 
        scrollWheelZoom={true}
        className="h-full w-full invert hue-rotate-180 brightness-[0.9]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <Marker position={position}>
          <Popup>
            India <br /> Zen-Geo Central.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapOverlay;
