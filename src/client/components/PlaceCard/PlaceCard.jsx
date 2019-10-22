import React from 'react';

class PlaceCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { place_id, name, address, image, voteCount } = this.props.place;

    if (!image || image === '<Null>') {
        image = '../../../../assets/places/default.jpg'
    }

    return (
      <div className="place-card" /*onClick={this.props.onClick.bind()}*/>
        <div className="place-img-container">
          <img src={image} className="place-img"/>
        </div>
        <div className="place-details">
          <div className="place-name">
            {name}
          </div>
          <div className="place-others">
            <div className="place-address">
              {address}
            </div>
            <div className="place-votes">
              Votes: {voteCount.LIKE}/{voteCount.LIKE + voteCount.DISLIKE}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PlaceCard;