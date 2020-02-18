import React from "react";
import "./App.css";
import Header from "./components/Header";
import Map from "./components/MapContainer";
import Filter from "./components/Filter";
import axios from "axios";

class App extends React.Component {
  state = {
    earthquakeData: [],
    isLoaded: false
  };
  fetchData = () => {
    axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=500"
      )
      .then(({ data: { features } }) => {
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

        this.setState({ earthquakeData: selectedData, isLoaded: true });
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchFilteredData = (magnitude, time) => {
    this.setState({ isLoaded: false }, () => {
      axios
        .get(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=500`,
          {
            params: {
              starttime: time,
              minmagnitude: magnitude
            }
          }
        )
        .then(({ data: { features } }) => {
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

          this.setState({ earthquakeData: selectedData, isLoaded: true });
        });
    });
  };

  render() {
    console.log(this.state.isLoaded);
    return this.state.isLoaded ? (
      <main>
        <Header />
        <Map earthquakeData={this.state.earthquakeData}></Map>
        <Filter fetchFilteredData={this.fetchFilteredData} />
      </main>
    ) : (
      <div>
        <Header />
        <p>Loading...</p>
      </div>
    );
  }
}

export default App;
