import React, { Component } from "react";
import autoBindMethods from 'class-autobind-decorator';

// Import paths
import PATHS from '../../constants/paths';

// Import components
import CitySelect from '../../components/CitySelect';
import TripInfo from '../../components/TripInfo';

@autoBindMethods
class CreateTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: null
    };
  }

  handleSelectCity(destination) {
    this.setState({ destination });
  }

  handleClose() {
    this.routeChange(PATHS.trips());
  }

  handleCancel() {
    this.setState({ destination: null });
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
    if (!this.state.destination) {
      // return "abs";
      return <CitySelect handleSelectCity={this.handleSelectCity} handleClose={this.handleClose}/>;
    } else {
      return <TripInfo isNewTrip={true} destination={this.state.destination} handleCancel={this.handleCancel} routeChange={this.routeChange}/>;
    }
  }
}

export default CreateTrip;
