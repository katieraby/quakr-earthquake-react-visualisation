import React, { Component } from "react";

class Filter extends Component {
  state = {
    magnitudeFilter: "",
    timeFilter: null,
    selectedTime: null,
    isFilterOpen: false
  };

  handleMagnitudeChange = event => {
    this.setState({ magnitudeFilter: event.target.value });
  };

  toggleFilter = event => {
    this.setState(currentState => {
      return { isFilterOpen: !currentState.isFilterOpen };
    });
  };

  handleTimeChange = event => {
    if (event.target.value === 30) {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      const startTime = now.toISOString();
      this.setState({
        timeFilter: startTime,
        selectedTime: event.target.value
      });
    } else {
      const now = new Date();
      now.setHours(now.getHours() - event.target.value);
      const startTime = now.toISOString();
      this.setState({
        timeFilter: startTime,
        selectedTime: event.target.value
      });
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
    console.log(this.state.isFilterOpen);
    return (
      <>
        <div className="filter">
          <h2 className="filter__h2" onClick={this.toggleFilter}>
            Filters
          </h2>
          <i className="arrow down" onClick={this.toggleFilter}></i>
          {this.state.isFilterOpen === false ? null : (
            <>
              <form>
                <h3 className="filter__h3">Magnitude</h3>
                <label>
                  <input
                    type="radio"
                    name="magnitude"
                    value={-1}
                    checked={this.state.magnitudeFilter == -1}
                    onChange={this.handleMagnitudeChange}
                  />
                  All
                </label>
                <label>
                  <input
                    type="radio"
                    name="magnitude"
                    value={3.5}
                    checked={this.state.magnitudeFilter == 3.5}
                    onChange={this.handleMagnitudeChange}
                  />
                  {"> 3.5"}
                </label>
                <label>
                  <input
                    type="radio"
                    name="magnitude"
                    value={6}
                    checked={this.state.magnitudeFilter == 6}
                    onChange={this.handleMagnitudeChange}
                  />
                  {"> 6"}
                </label>
              </form>
              <form>
                <h3 className="filter__h3">Time</h3>
                <p className="filter__p">Defaults to the last 30 days</p>
                <label>
                  <input
                    type="radio"
                    name="time"
                    value={30}
                    checked={this.state.selectedTime == 30}
                    onChange={this.handleTimeChange}
                  />
                  All
                </label>
                <label>
                  <input
                    type="radio"
                    name="time"
                    value={1}
                    checked={this.state.selectedTime == 1}
                    onChange={this.handleTimeChange}
                  />
                  {"Last Hour"}
                </label>
                <label>
                  <input
                    type="radio"
                    name="time"
                    value={24}
                    checked={this.state.selectedTime == 24}
                    onChange={this.handleTimeChange}
                  />
                  {"Last 24 Hours"}
                </label>
              </form>{" "}
            </>
          )}
        </div>
      </>
    );
  }
}

export default Filter;
