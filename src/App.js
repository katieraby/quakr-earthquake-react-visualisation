import React from "react";
import "./App.css";
import Header from "./components/Header";
import Map from "./components/MapContainer";

class App extends React.Component {
  state = {
    earthquakeData: []
  };
  render() {
    return (
      <main>
        <Header />
        <Map id="mapid"></Map>
      </main>
    );
  }
}

export default App;
