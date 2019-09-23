import React, { Component } from "react";

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
          <div style={{display: 'flex',  justifyContent:'center'}} className="swipe-title">
            {current.city}
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="swipe-body">
            <img src={ require(`./images/${current.image}`) } className="img-card"/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}} className="swipe-body">
            {current.name}
          </div>
          <div style={{display: 'flex',  justifyContent:'center'}}>
            <input type="submit" value="Dislike" className="swipe-buttons" onClick={this.handleDislike}/>
            <input type="submit" value="Like" className="swipe-buttons" onClick={this.handleLike}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div style={{display: 'flex',  justifyContent:'center'}} className="swipe-body">
          {
            'Done swiping!'
          }
        </div>
      );
    }
  }
};

export default Swipe;
