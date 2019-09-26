import React, { Component } from "react";
import autoBindMethods from 'class-autobind-decorator';

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

  routeChange(path) {
    this.props.history.push(path);
  }

  componentDidMount() {
    let instance = this;
    const tripId = this.props.match.params.tripId;
    axios
      .get(APIS.vote.results(1))
      .then(function (response) {
        instance.setState({places:response.data});
        instance.setState({isDoneFetching:true});
        instance.setState({isLoading:false});
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  render() {
    if (this.state.isLoading) {
        return (<Preloader />);
    } else if (this.state.isDoneFetching) {
      const userId = 1;
      return (
        <div className="list-page">
          <div className="header-container">
            <Header />
          </div>
          <div className="buttons-container">
            <button className="swipe-button" onClick={() => this.routeChange(PATHS.swipe())}>
              <span>continue swiping</span>
            </button>
            <button className="trips-button" onClick={() => this.routeChange(PATHS.trips(userId))}>
              <span>done</span>
            </button>
          </div>
          <div className="places-container">
            {this.state.places.map((place, key) => (
              <PlaceCard
                key={key}
                place={place}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ListPage;
