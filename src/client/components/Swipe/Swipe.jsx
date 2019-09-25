import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';

const PLACES = [
  { city: 'Singapore', image: 'image1.png', name: 'Raffles Place' },
  { city: 'Singapore', image: 'image2.png', name: 'City Hall' }
];

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: PLACES,
      likedPlaces: [],
      index: 0,
      numberOfPlaces: PLACES.length
    };
  }

  handleDislike(event) {
    const { index } = this.state;
    axios
      .post('http://localhost:3001/api/v1/trips/vote', {
        vote: {
          trip_place_id: '6',
          trip_friend_id: '5',
          vote: 'DISLIKE'
        }
      })
      .then(response => {
        index += 1;
        this.setState({ index });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  handleLike(event) {
    const { index } = this.state;
    axios
      .post('http://localhost:3001/api/v1/trips/vote', {
        vote: {
          trip_place_id: '6',
          trip_friend_id: '5',
          vote: 'LIKE'
        }
      })
      .then(response => {
        index += 1;
        this.setState({ index });
      })
      .catch(error => {
        alert(error.message);
      });
  }

  render() {
    const { index, numberOfPlaces, places } = this.state;
    if (index < numberOfPlaces) {
      const current = places[index];

      return (
        <div>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            className="swipe-title"
          >
            {current.city}
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            className="swipe-body"
          >
            <img
              src={require(`./images/${current.image}`)}
              className="img-card"
            />
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            className="swipe-body"
          >
            {current.name}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="submit"
              value="Dislike"
              className="swipe-buttons"
              onClick={this.handleDislike}
            />
            <input
              type="submit"
              value="Like"
              className="swipe-buttons"
              onClick={this.handleLike}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          className="swipe-body"
        >
          {'Done swiping!'}
        </div>
      );
    }
  }
}

export default Swipe;
