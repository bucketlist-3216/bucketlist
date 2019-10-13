import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

import PATHS from '../../constants/paths';
// import Preloader from '../../components/Preloader';


@autoBindMethods
class CreateTrip extends Component {
  constructor(props) {
    super (props);
    
    this.state = {
      isLoading: false
    };
  }
  
  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }
  
  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // if (this.state.isLoading) {
    //     return (<Preloader/>);
    // }

    return (
      <div className="create-trip" onClick={() => this.routeChange(PATHS.citySelect)}>
        <h2>Create Trip</h2>
      </div>
    );
  } 
}

export default CreateTrip;