import React, { Component } from "react";
import autoBindMethods from 'class-autobind-decorator';
import { toast } from 'react-toastify'; 
import axios from 'axios'

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import Header from "../../components/Header";
import PlaceCard from "../../components/PlaceCard";
import Preloader from "../../components/Preloader";

@autoBindMethods
class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        places: [],
        isDoneFetching: false,
        isLoading: true
    };
  }

  routeChange(pathname, placeId) {
    this.props.history.push({
      pathname,
      state: {
        placeId
      }
    });
  }

  componentDidMount() {
    let instance = this;
    const tripId = this.props.match.params.tripId;
    axios
      .request({
        url: APIS.voteResults(tripId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        instance.setState({places:response.data});
        instance.setState({isDoneFetching:true});
        instance.setState({isLoading:false});
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.landingPage);
          return;
        }
        toast(`Oops! Something went wrong.`, {
          type: 'error',
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
        return (<Preloader />);
    } else if (this.state.isDoneFetching) {
      let userId = this.props.match.params.userId;
      let tripId = this.props.match.params.tripId;
      let places = (
        <div className="places-container">
          <span>
            Let's start swiping! <br />
            We'll show you your top places here.
          </span>
        </div>
      );
      if (this.state.places.length > 0) {
         places = (
           <div className="places-container">
            {this.state.places.map((place, key) => (
              <PlaceCard
                key={key}
                place={place}
                onClick={() => this.routeChange(PATHS.swipe(userId, tripId), place.place_id)}
              />
            ))}
          </div>
        );
      }

      return (
        <div className="list-page">
          <div className="header-container">
            <Header />
          </div>
          <div className="buttons-container">
            <button className="swipe-button" onClick={() => this.routeChange(PATHS.swipe(userId, tripId))}>
              <span>continue swiping</span>
            </button>
            <button className="trips-button" onClick={() => this.routeChange(PATHS.trips(userId))}>
              <span>done</span>
            </button>
          </div>
          {places}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ListPage;