
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerPopup from './MarkerPopup';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ markers, addMarker, updateMarker }) => {
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const newMarker = {
          position: e.latlng,
          placeName: '',
          dateVisited: '',
          notes: ''
        };
        addMarker(newMarker);
      }
    });
    return null;
  };

  return (
    <MapContainer
      center={[20, 0]}  // Central coordinates for a global view
      zoom={2}          // Adjusted zoom for showing the full world map
      style={{ height: '100%', width: '100%' }}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <MarkerPopup
              marker={marker}
              onUpdate={(newData) => updateMarker(index, { ...marker, ...newData })}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;