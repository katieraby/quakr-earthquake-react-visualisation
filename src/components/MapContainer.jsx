import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

class MapContainer extends Component {
  render() {
    const newIcon = new Icon({
      iconUrl: require("../marker-icon-2x-gold.png"),
      iconSize: [20, 30],
    });
    return (
      <LeafletMap
        center={[35, -40]}
        zoom={3}
        minZoom="2.5"
        maxBounds={[
          [90, 180],
          [-90, -180],
        ]}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {this.props.earthquakeData.map((quake) => {
          return (
            <Marker key={quake.id} position={quake.position} icon={newIcon}>
              <Popup>
                <span className="popup__span">
                  {new Date(quake.time).toUTCString()}
                </span>
                <br />
                {`${quake.magnitude} magnitude earthquake, situated ${quake.place}. Find the details `}
                <a className="popup__a" href={quake.url}>
                  here
                </a>
                .
              </Popup>
            </Marker>
          );
        })}
      </LeafletMap>
    );
  }
}

export default MapContainer;
