import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import autoBindMethods from 'class-autobind-decorator';
import _ from 'lodash';

import Link from './link.png';
import 'react-datepicker/dist/react-datepicker.css';

const CITIES = [
  { value: 'choose', option: 'Select City' },
  { value: 'singapore', option: 'Singapore' },
  { value: 'newyork', option: 'New York' },
  { value: 'thailand', option: 'Thailand' }
];

@autoBindMethods
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Select City',
      to: new Date(),
      from: new Date()
    };
  }

  handleChangeCity(event) {
    this.setState({ city: event.target.city });
  }

  handleChangeFrom(event) {
    this.setState({ from: event });
  }

  handleChangeTo(event) {
    this.setState({ to: event });
  }

  handleAddFriends(event) {
    alert('To Implement: Add friends!');
  }

  handleSubmit(event) {
    alert('To Implement: Form submitted!');
  }

  render() {
    return (
      <div className="create-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="title">Create New Trip</div>

            <div className="select-city">
              <select
                value={this.state.city}
                onChange={this.handleChangeCity}
                className="form-dropdown-button"
              >
                {_.map(CITIES, city => (
                  <option value={city.value} className="form-dropdown-button">
                    {city.option}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-body">Travel Dates</div>
            <div className="select-date">
              <DatePicker
                className="form-date"
                selected={this.state.from}
                onChange={this.handleChangeFrom}
              />
              <DatePicker
                className="form-date"
                selected={this.state.to}
                onChange={this.handleChangeTo}
              />
            </div>

            <div className="create-body">Add Friends</div>
            <Button
              variant="outline-primary"
              className="form-button"
              onClick={this.handleAddFriends}
            >
              +
            </Button>

            <div className="create-body">
              <img src={Link} alt="Link icon" className="link-icon" /> or
              generate sharing link
            </div>

            <div className="submit-container">
              <input type="submit" value="Let's go!" className="form-submit" />
            </div>
          </label>
        </form>
      </div>
    );
  }
}

export default Create;
