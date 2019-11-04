import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TripAPI from '../../api/trip';

import PATHS from '../../constants/paths';

@autoBindMethods
class TripInfo extends Component {
  constructor(props) {
    super (props);

    const { new: isNewTrip, destination }  = queryString.parse(this.props.location.search);

    this.state = {
      isLoading: false,
      name: null,
      destination,
      startDate: null,
      endDate: null,
      isEditingName: isNewTrip ? true : false,
      isEditingDate: isNewTrip ? true : false
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  toggleEditName() {
    const { isEditingName } = this.state;
    if (isEditingName) {
      this.setState({ name: null });
    }
    this.setState({ isEditingName: !isEditingName });
  }

  toggleEditDate() {
    const { isEditingDate } = this.state;
    if (isEditingDate) {
      this.setState({ startDate: null, endDate: null });
    }
    this.setState({ isEditingDate: !isEditingDate });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
    this.setState({ isChanged: true });
  }

  handleChangeStartDate(event) {
    this.setState({ startDate: event });
    this.setState({ isChanged: true });
  }

  handleChangeEndDate(event) {
    this.setState({ endDate: event });
    this.setState({ isChanged: true });
  }

  handleSave() {
    const { new: isNewTrip }  = queryString.parse(this.props.location.search);
    const { name, destination, startDate, endDate } = this.state;
    if (isNewTrip) {
      if (name == null || startDate == null || endDate == null) {
        alert("Please add trip name, start date and end date!");
        return;
      }

      const trip = {
        name,
        destination,
        start_date: startDate,
        end_date: endDate
      }

      this.setLoading(true);
      const instance = this;
      TripAPI.addTrip(this, trip)
        .then(function(response) {
          let tripId = response.data.insertedId;
          instance.routeChange(PATHS.swipe(tripId));
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error);
        });
    }
  }

  render() {
    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "TripInfoPage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Create Trip Page',
      label: ga_info,
    });

    const { new: isNewTrip } = queryString.parse(this.props.location.search);

    const { name, startDate, endDate, isEditingName, isEditingDate } = this.state;
    const isChanged = name !== null || startDate !== null || endDate !== null;
    return (
      <div className="create-trip" >
        <div className="top-bar">
          <div className="cancel">
            <span>cancel</span>
          </div>
          <div className={isChanged ? "save" : "save disabled"} onClick={this.handleSave}>
            <span>save</span>
          </div>
        </div>
        <div className="cover-photo">
          <span>SINGAPORE</span>
          <div className="overlay"></div>
          <img src="https://place-image.s3-ap-southeast-1.amazonaws.com/progressive/1a9147e4-f3bc-11e9-9da4-f0189856d4a6.jpg"/>
        </div>
        <div className="trip-details">
          <Form>
            <div className="row">
              <div className="field">
                <span>Trip Name</span>
              </div>
              <div className="value">
                { isEditingName
                  ?
                    <div className="value-form-container">
                      <Form.Control
                        onChange={this.handleChangeName}
                        className="value-form"
                        type="email"
                        placeholder="trip name"
                      />
                    </div>
                  : <span>Dance Trip Singapore</span>
                }
              </div>
              { !isNewTrip &&
                <div className="edit" onClick={this.toggleEditName}>
                  <span></span>
                </div>
              }
            </div>
            <div className="row">
              <div className="field">
                <span>Location</span>
              </div>
              <div className="value">
                <span>Singapore</span>
              </div>
            </div>
            <div className="row">
              <div className="field">
                <span>Dates</span>
              </div>
              <div className="value">
                { isEditingDate
                  ?
                    <div className="value-form-container">
                      <DatePicker
                        className="value-form value-form-date"
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        placeholderText="start date"
                      />
                      <span>-</span>
                      <DatePicker
                        className="value-form value-form-date"
                        selected={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        placeholderText="end date"
                      />
                    </div>
                  : <span>26/11/19 - 4/12/19</span>
                }
              </div>
              { !isNewTrip &&
                <div className="edit" onClick={this.toggleEditDate}>
                  <span></span>
                </div>
              }
            </div>
          </Form>
        </div>
        { !isNewTrip &&
          <div className="delete-button">
            <div className="icon">
              <span></span>
            </div>
            <div className="text">
              <span>Delete Trip</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(TripInfo);
