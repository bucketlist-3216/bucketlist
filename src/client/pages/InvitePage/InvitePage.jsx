import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

import PATHS from '../../constants/paths';
import APIS from '../../constants/apis';
import axios from "axios";


@autoBindMethods
class InvitePage extends Component {
  constructor(props) {
    super (props);
  }

  routeChange(pathname, state) {
    this.props.history.push({
      pathname, state
    });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (!localStorage.getItem('token')) {
      this.routeChange(PATHS.login, {"returnPrevious": true});
    } else {
      const { inviteLink } = this.props.match.params
      console.log("inviteLink: ", inviteLink);
      axios.request({
        url: APIS.trip(inviteLink),
        method: 'GET',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      }).then((tripIdJson) => this.routeChange(PATHS.list(tripIdJson.tripId)));
    }
    return null;
  }
}

export default InvitePage;
