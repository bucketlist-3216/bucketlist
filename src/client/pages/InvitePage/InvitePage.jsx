import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

import PATHS from '../../constants/paths';
import PROVIDERS from '../../constants/providers';
import APIS from '../../constants/apis';
import axios from "axios";

import SingleSignOnButton from '../../components/SingleSignOnButton';

@autoBindMethods
class InvitePage extends Component {
  constructor(props) {
    super (props);

    this.state = {
      isLoading: false,
      loggedIn: false
    };
  }

  routeChange(pathname, state) {
    this.props.history.push({
      pathname, state
    });
  }

  setLoggedIn() {
    this.setState({loggedIn: true});
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  redirectToTrip(tripIdJson) {
    this.routeChange(PATHS.list(tripIdJson.data.tripId));
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (localStorage.getItem('platform')  && localStorage.getItem('platform') !== 'jwt') {
      const { inviteLink } = this.props.match.params
      console.log("inviteLink: ", inviteLink);
      axios.request({
        url: APIS.trip(inviteLink),
        method: 'GET',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      }).then(this.redirectToTrip);
    } else {
      return (
        <div className="app-home">
          <h1 className="title">bucketlist</h1>
          <div className="row">
            <SingleSignOnButton
              providerName={PROVIDERS['google'].providerName}
              logo={PROVIDERS['google'].logo}
              setLoading={this.setLoading}
              onLoginSuccess={() => this.setLoggedIn}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default InvitePage;
