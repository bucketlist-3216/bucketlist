import React, { Component } from 'react';
import ReactGA from 'react-ga';
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
      from: new Date(),
      numOfInvites: 0
    };
  }

  handleChangeCity(event) {
    this.setState({ city: event.target.value });
  }

  handleChangeFrom(event) {
    this.setState({ from: event.target.value });
  }

  handleChangeTo(event) {
    this.setState({ to: event.target.value });
  }

  handleInvites(event) {
    this.setState({numOfInvites: this.state.numOfInvites + 1});
    alert('To Implement: Add friends!');
  }

  handleSubmit(event) {
    ReactGA.event({
      category: 'User',
      action: 'Created a New Trip',
      label: this.state.city
    });
    ReactGA.event({
      category: 'User',
      action: 'Sent Invites',
      value: this.state.numOfInvites
    });

    /* This is for future analytics like tracking peak periods for planned trips */
    /* ReactGA.event({
      category: 'Trip Start Date',
      action: this.state.from
    });
    ReactGA.event({
      category: 'Trip End Date',
      action: this.state.to
    });*/

    alert('To Implement: Form submitted!');
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
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
