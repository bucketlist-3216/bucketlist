import React, { Component } from "react";
import autoBindMethods from 'class-autobind-decorator';

import axios from 'axios'

import APIS from '../../constants/apis';
import Header from "../../components/Header";
import PlaceCard from "../../components/PlaceCard";

@autoBindMethods
class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        places: [],
        isDoneFetching: false
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
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  render() {
    if (this.state.isDoneFetching) {
      const userId = 1;
      return (
        <div className="list-page">
          <div className="header-container">
            <Header />
          </div>
          <div className="buttons-container">
            <button className="swipe-button" onClick={() => this.routeChange('/swipeview')}>
              <span>continue swiping</span>
            </button>
            <button className="trips-button" onClick={() => this.routeChange(`../../user/${userId}/trips`)}>
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
