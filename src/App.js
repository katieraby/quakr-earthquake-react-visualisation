import React from "react";
import "./App.css";
import Header from "./components/Header";
import Map from "./components/MapContainer";
import Filter from "./components/Filter";

class App extends React.Component {
  state = {
    earthquakeData: []
  };
  fetchData = () => {
    fetch(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=250"
    )
      .then(buffer => buffer.json())
      .then(({ features }) => {
        const selectedData = features.map(quake => {
          return {
            magnitude: quake.properties.mag,
            place: quake.properties.place,
            url: quake.properties.url,
            time: quake.properties.time,
            code: quake.properties.code,
            position: [
              quake.geometry.coordinates[1],
              quake.geometry.coordinates[0]
            ],
            id: quake.id
          };
        });

        this.setState({ earthquakeData: selectedData });
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchFilteredData = () => {
    console.log("fetching filtered data");
  };

  render() {
    return (
      <main>
        <Header />
        <Map earthquakeData={this.state.earthquakeData}></Map>
        <Filter fetchFilteredData={this.fetchFilteredData} />
      </main>
    );
  }
}

export default App;
