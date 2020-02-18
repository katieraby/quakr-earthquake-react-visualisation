import React, { Component } from "react";

class Filter extends Component {
  state = {
    magnitudeFilter: "",
    timeFilter: null
  };

  handleMagnitudeChange = event => {
    console.log(event.target.value);
    this.setState({ magnitudeFilter: event.target.value });
  };

  handleTimeChange = event => {
    console.log(event.target.value);
    if (event.target.value === 30) {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      const startTime = now.toISOString();
      console.log(startTime, "30 days log");
      this.setState({ timeFilter: startTime });
    } else {
      const now = new Date();
      now.setHours(now.getHours() - event.target.value);
      const startTime = now.toISOString();
      this.setState({ timeFilter: startTime });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timeFilter !== prevState.timeFilter) {
      this.props.fetchFilteredData(
        this.state.magnitudeFilter,
        this.state.timeFilter
      );
    } else if (this.state.magnitudeFilter !== prevState.magnitudeFilter) {
      this.props.fetchFilteredData(
        this.state.magnitudeFilter,
        this.state.timeFilter
      );
    }
  }

  render() {
    console.log(this.state.magnitudeFilter);
    return (
      <div className="filter">
        <h2>Filters</h2>
        <form>
          <h3>Magnitude</h3>
          <label>
            <input
              type="radio"
              name="magnitude"
              value={-1}
              checked={this.state.magnitudeFilter === -1}
              onChange={this.handleMagnitudeChange}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="magnitude"
              value={3.5}
              onChange={this.handleMagnitudeChange}
            />
            {">3.5"}
          </label>
          <label>
            <input
              type="radio"
              name="magnitude"
              value={6}
              onChange={this.handleMagnitudeChange}
            />
            {">6"}
          </label>
        </form>
        <form>
          <h3>Time</h3>
          <label>
            <input
              type="radio"
              name="time"
              value={30}
              onChange={this.handleTimeChange}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value={1}
              onChange={this.handleTimeChange}
            />
            {"last hour"}
          </label>
          <label>
            <input
              type="radio"
              name="time"
              value={24}
              onChange={this.handleTimeChange}
            />
            {"last 24 hours"}
          </label>
        </form>
      </div>
    );
  }
}

export default Filter;
