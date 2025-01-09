import React from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Chamber = () => {
  // markers
  const markers = [
    {
      geocode: [8.481, 124.645],
      popUp: "Marker 1: Near City Center",
    },
    {
      geocode: [8.4825, 124.6512],
      popUp: "Marker 2: Riverside Area",
    },
    {
      geocode: [8.4789, 124.6534],
      popUp: "Marker 3: Business District",
    },
  ];

  return (
    <MapContainer center={[8.4803, 124.6498]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Marker position={marker.geocode}>{marker.popUp}</Marker>
      ))}
    </MapContainer>
  );
};

export default Chamber;
