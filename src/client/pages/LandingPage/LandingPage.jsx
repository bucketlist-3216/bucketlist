import React, { Component } from 'react';

import ReactGA from 'react-ga';

import autoBindMethods from 'class-autobind-decorator';

import Login from '../../components/Login';
import Preloader from '../../components/Preloader';
import BucketListLogo from '../../../../assets/brand/brand-logo.png';

@autoBindMethods
class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  setLoading(loadingStatus) {
    this.setState({ isLoading: loadingStatus });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (this.state.isLoading) return <Preloader />;
  
    return (
      <div className="landing-page">
        <div className="brand">
          <img className="brand-logo" alt="Bucket List Logo" src={BucketListLogo} />
          <span className="brand-title">bucketlist</span>
        </div>
        <div className="login-container">
          <div className="login-title">
            <h1>Travel planning has never been easier</h1>
          </div>
          <Login {...this.props} setLoading={() => this.setLoading} />
        </div>
        <div className="title">
          <h1>Swipe. List. Go.</h1>
        </div>
      </div>
    );
  }
}

export default LandingPage;
