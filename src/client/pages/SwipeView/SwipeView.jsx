import React, { Component } from "react";
import data from "./data.json";

import './SwipeView.scss'

const places_data = [ 
  {city: 'city a', picture: 'picture a',name: 'place a'},
  {city: 'city b', picture: 'picture b',name: 'place b'},
];

class SwipeView extends Component {
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
    this.setState({index: this.state.index + 1});
  }

  handleLike(event) {
    this.setState({index: this.state.index + 1});
  }

  render() {
    if (this.state.index < this.state.numberOfPlaces) {
      var current = this.state.places[this.state.index];

      return (
        <div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="SwipeBody">
            {current.city}
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="SwipeBody">
            {current.picture}
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

export default SwipeView;
