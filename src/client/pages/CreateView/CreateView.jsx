import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

import Header from "../../components/Header";
import Title from "../../components/Title";
import Create from "../../components/Create";
import Preloader from '../../components/Preloader';

@autoBindMethods
class CreateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
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
      <div>
        <Header />
        <Title text="Create New Trip" />
        <Create {...this.props} setLoading={this.setLoading}/>
      </div>
    );
  }
}

export default CreateView;
