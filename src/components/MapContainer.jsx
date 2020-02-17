import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

class MapContainer extends Component {
  render() {
    return (
      <LeafletMap center={[50, 10]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LeafletMap>
    );
  }
}

export default MapContainer;
