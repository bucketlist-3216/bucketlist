import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import autoBindMethods from 'class-autobind-decorator';
import 'react-datepicker/dist/react-datepicker.css';
import _ from 'lodash';
import axios from 'axios';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import CITIES from '../../constants/cities';
import Link from './link.png';

@autoBindMethods
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      to: new Date(),
      from: new Date()
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  handleChangeCity(event) {
    this.setState({ city: event.target.value });
  }

  handleChangeFrom(event) {
    this.setState({ from: event });
  }

  handleChangeTo(event) {
    this.setState({ to: event });
  }

  handleInvites(event) {
    this.setState({numOfInvites: this.state.numOfInvites + 1});
    alert('To Implement: Add friends!');
  }

  handleSubmit(event) {
    event.preventDefault();
    ReactGA.event({
      category: 'User',
      action: 'Created a New Trip',
      label: this.state.city
    });
    // ReactGA.event({
    //   category: 'User',
    //   action: 'Sent Invites',
    //   value: this.state.numOfInvites
    // });

    /* This is for future analytics like tracking peak periods for planned trips */
    /* ReactGA.event({
      category: 'Trip Start Date',
      action: this.state.from
    });
    ReactGA.event({
      category: 'Trip End Date',
      action: this.state.to
    });*/

    if (this.state.city === '') {
      alert('Please select city of destination');
    } else if (this.state.from > this.state.to) {
      alert('Start date should be before end date!');
    } else {
      let userId = this.props.match.params.userId;
      let trip = {
        destination: this.state.city,
        start_date: this.state.from.toISOString().slice(0,10),
        end_date: this.state.to.toISOString().slice(0,10),
        authorId: userId
      };
      let instance = this;
      axios
        .request({
          url: APIS.trip,
          method: 'post',
          headers: {
            token: localStorage.getItem('token'),
            platform: localStorage.getItem('platform')
          },
          data: { trip }
        })
        .then(function(response) {
          instance.routeChange(PATHS.trips(userId));
          instance.props.setLoading(false);
        })
        .catch(function(error) {
          if (error.response.status == 401) {
            instance.routeChange(PATHS.landingPage);
            return;
          }
          alert(error.message);
          console.log(error);
        });
      this.props.setLoading(true);
    }
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    return (
      <div className="create-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="select-city">
              <select
                value={this.state.city}
                onChange={this.handleChangeCity}
                className="form-dropdown-button"
              >
                <option value="choose" className="form-dropdown-button">
                  Select City
                </option>
                {_.map(CITIES, (city, key) => (
                  <option key={key} value={city} className="form-dropdown-button">
                    {city}
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
