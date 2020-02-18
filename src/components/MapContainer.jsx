import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

class MapContainer extends Component {
  render() {
    const newIcon = new Icon({
      iconUrl: require("../marker-icon-2x-gold.png"),
      iconSize: [20, 30]
    });
    return (
      <LeafletMap center={[40, 0]} zoom={1.5}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {this.props.earthquakeData.map(quake => {
          return (
            <Marker key={quake.id} position={quake.position} icon={newIcon}>
              <Popup>
                {new Date(quake.time).toUTCString()}
                <br />
                {`${quake.magnitude} magnitude earthquake, situated ${quake.place}. Find out more `}
                <a href={quake.url}>here</a>.
              </Popup>
            </Marker>
          );
        })}
      </LeafletMap>
    );
  }
}

export default MapContainer;
