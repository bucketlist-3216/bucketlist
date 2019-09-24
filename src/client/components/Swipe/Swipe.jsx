import React, { Component } from "react";

import './Swipe.scss'

import axios from 'axios'

const places_data = [
  {city: 'Singapore', image: 'image1.png', name: 'Raffles Place'},
  {city: 'Singapore', image: 'image2.png', name: 'City Hall'},
];

class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: places_data,
      likedPlaces: [],
      index: 0,
      numberOfPlaces: places_data.length,
    };

    this.handleDislike = this.handleDislike.bind(this);
    this.handleLike = this.handleLike.bind(this);
  };

  handleDislike(event) {
    let that = this;
    axios
      .post('http://localhost:3001/api/v1/trips/vote', {
      	"vote": {
      		"trip_place_id": "6",
      		"trip_friend_id": "5",
      		"vote": "DISLIKE"
      	}
      })
      .then(function (response) {
        that.setState({index: that.state.index + 1});
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  handleLike(event) {
    let that = this;
    axios
      .post('http://localhost:3001/api/v1/trips/vote', {
        "vote": {
          "trip_place_id": "6",
          "trip_friend_id": "5",
          "vote": "LIKE"
        }
      })
      .then(function (response) {
        that.setState({index: that.state.index + 1});
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  render() {
    if (this.state.index < this.state.numberOfPlaces) {
      var current = this.state.places[this.state.index];

      return (
        <div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="SwipeTitle">
            {current.city}
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="SwipeBody">
            <img src={ require(`./images/${current.image}`) } className="SwipeImg"/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="SwipeBody">
            {current.name}
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}}>
            <input type="submit" value="Dislike" className="SwipeInput" onClick={this.handleDislike}/>
            <input type="submit" value="Like" className="SwipeInput" onClick={this.handleLike}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div style={{display: 'flex',  justifyContent:'center'}} className="SwipeBody">
          {
            'Done swiping!'
          }
        </div>
      );
    }
  }
};

export default Swipe;
