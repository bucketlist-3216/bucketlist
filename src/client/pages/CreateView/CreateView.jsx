import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

import PATHS from '../../constants/paths';
import Title from "../../components/Title";
import Create from "../../components/Create";
import Preloader from '../../components/Preloader';


@autoBindMethods
class CreateView extends Component {
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
    if (this.state.isLoading) {
        return (<Preloader />);
    }

    return (
      <div className="create-page">
        <Header />
        <div className="create-header">
          <BackButton onClick={() => {
            this.routeChange(PATHS.trips(this.props.match.params.userId));
          }}/>
        </div>
        <Title text="Create New Trip" />
        <Create {...this.props} setLoading={this.setLoading}/>
      </div>
    );
  }
  
}