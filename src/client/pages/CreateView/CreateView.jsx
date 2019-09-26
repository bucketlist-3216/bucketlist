import React, { Component } from "react";
import ReactGA from 'react-ga';

import Header from "../../components/Header";
import Title from "../../components/Title";
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
        <Title text="Create New Trip" />
        <Create {...this.props}/>
      </div>
    );
  }
}

export default CreateView;
