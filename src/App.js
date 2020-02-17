import React from "react";
import "./App.css";
import Header from "./components/Header";
import Map from "./components/MapContainer";

class App extends React.Component {
  state = {
    earthquakeData: []
  };
  fetchData = () => {
    fetch(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1"
    )
      .then(buffer => buffer.json())
      .then(({ features }) => {
        this.setState({ earthquakeData: features });
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  render() {
    return (
      <main>
        <Header />
        <Map earthquakeData={this.state.earthquakeData}></Map>
      </main>
    );
  }
}

export default App;
