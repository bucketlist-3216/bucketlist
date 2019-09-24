import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class TripButton extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    this.props.history.push(this.props.url);
  }

  render() {
    return (
      <div>
        <button className="trip-button" onClick={this.routeChange}>
          <span>{this.props.text}</span>
        </button>
      </div>
    );
  }
};

export default withRouter(TripButton);
