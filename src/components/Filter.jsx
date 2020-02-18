import React, { Component } from "react";

class Filter extends Component {
  state = {
    magnitudeFilter: "",
    timeFilter: ""
  };

  handleMagnitudeChange = event => {
    // event.preventDefault();
    //process to determine what startTime value to pass to filter

    console.log(event.target.value);
  };
  handleTimeChange = event => {
    const now = new Date();
    now.setHours(now.getHours() - event.target.value);
    const startTime = now.toISOString();
    this.setState({ timeFilter: startTime });
  };

  componentDidUpdate(prevProps) {
    console.log("here??");
    if (this.state.timeFilter !== prevProps.timeFilter) {
      this.props.fetchFilteredData(
        this.state.magnitudeFilter,
        this.state.timeFilter
      );
    } else if (this.state.magnitudeFilter !== prevProps.magnitudeFilter) {
      this.props.fetchFilteredData(
        this.state.magnitudeFilter,
        this.state.timeFilter
      );
    }
  }

  render() {
    return (
      <div className="filter">
        <h2>Filters</h2>
        <form>
          <h3>Magnitude</h3>
          <label>
            <input
              type="radio"
              name="magnitude"
              value="magAll"
              onChange={this.handleMagnitudeChange}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="magnitude"
              value="mag45below"
              onChange={this.handleMagnitudeChange}
            />
            {"<4.5"}
          </label>
          <label>
            <input
              type="radio"
              name="magnitude"
              value="mag45above"
              onChange={this.handleMagnitudeChange}
            />
            {">4.5"}
          </label>
        </form>
        <form>
          <h3>Time</h3>
          <label>
            <input
              type="radio"
              name="time"
              value={0}
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
