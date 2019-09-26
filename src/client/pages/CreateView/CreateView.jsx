import React, { Component } from "react";
import ReactGA from 'react-ga';

import Header from "../../components/Header";
import Create from "../../components/Create";

class CreateView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    
    return (
      <div>
        <Header />
        <Create />
      </div>
    );
  }
}

export default CreateView;
