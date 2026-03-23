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

const MapOverlay = ({ onMapClick, notes = [], trees = [] }) => {
  const position = [20.5937, 78.9629]; // Center of India

  // Custom Tree Icon
  const treeIcon = L.divIcon({
    html: `<div class="bg-emerald-500 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
            <span style="font-size: 1.2rem;">🌲</span>
          </div>`,
    className: 'custom-tree-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

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
        
        {/* Note Markers */}
        {notes.map((note) => {
          const coords = note.location.split(',').map(Number);
          if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) return null;
          
          return (
            <Marker key={note.id} position={coords}>
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-blue-600 mb-1">{note.text}</p>
                  <span className="text-xs opacity-60">{note.timestamp}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Tree Markers */}
        {trees.map((tree) => {
          const coords = tree.location.split(',').map(Number);
          if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) return null;
          
          return (
            <Marker key={tree.id} position={coords} icon={treeIcon}>
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-emerald-600 mb-1">Concentration Tree 🌲</p>
                  <span className="text-xs opacity-60">Grown at: {tree.timestamp}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapOverlay;
