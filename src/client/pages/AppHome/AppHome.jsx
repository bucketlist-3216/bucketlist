import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

// Import paths
import PATHS from '../../constants/paths';

// Import components
@autoBindMethods
class AppHome extends Component {
  constructor(props) {
    super(props);

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
    if (this.state.isLoading) {
        return (<Preloader />);
    }

    return (
      <div className="app-home" onClick={() => this.routeChange(PATHS.createTrip)}>
        <h1 className="title">bucketlist</h1>
      </div>
    );
  }
}

export default AppHome;