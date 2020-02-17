import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

class MapContainer extends Component {
  render() {
    const coordinates = [
      this.props.earthquakeData[0].geometry.coordinates[1],
      this.props.earthquakeData[0].geometry.coordinates[0]
    ];
    return (
      <LeafletMap center={[40, 0]} zoom={1.5}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates}>
          <Popup>
            {new Date(
              this.props.earthquakeData[0].properties.time
            ).toUTCString()}
            <br />
            {`${this.props.earthquakeData[0].properties.mag} magnitude earthquake, situated ${this.props.earthquakeData[0].properties.place}. Find out more `}
            <a href={this.props.earthquakeData[0].properties.url}>here</a>.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default MapContainer;
