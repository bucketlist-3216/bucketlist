import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import queryString from 'query-string';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TripAPI from '../../api/trip';

import PATHS from '../../constants/paths';

import Preloader from '../../components/Preloader';

@autoBindMethods
class TripInfo extends Component {
  constructor(props) {
    super (props);

    const { trip, destination }  = props;

    this.state = {
      trip,
      isLoading: false,
      tripName: trip ? trip.trip_name : null,
      destination,
      startDate: trip ? new Date(trip.start_date) : null,
      endDate: trip ? new Date(trip.end_date) : null,
      isEditingName: trip ? false : true,
      isEditingDate: trip ? false : true
    };
  }

  routeChange(pathname) {
    this.props.routeChange(pathname);
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  toggleEditName() {
    const { isEditingName } = this.state;
    if (isEditingName) {
      this.setState({ tripName: null });
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
    this.setState({ tripName: event.target.value });
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
    const { trip, tripName, destination, startDate, endDate } = this.state;
    if (!trip) {
      // Add trip
      if (tripName == null || startDate == null || endDate == null) {
        alert("Please add trip name, start date and end date!");
        return;
      }

      const tripData = {
        tripName,
        destination,
        start_date: startDate,
        end_date: endDate
      }

      this.setLoading(true);
      const instance = this;
      TripAPI.addTrip(this, tripData)
        .then(function(response) {
          let tripId = response.data.insertedId;
          instance.routeChange(PATHS.swipe(tripId));
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error);
        });
    } else {
      // Update trip
      const tripData = {};
      if (tripName) tripData.trip_name = tripName;
      if (startDate) tripData.start_date = startDate;
      if (endDate) tripData.end_date = endDate;

      this.setLoading(true);
      const instance = this;
      TripAPI.updateTrip(this, trip.trip_id, tripData)
        .then(function(response) {
          Object.assign(trip, tripData);
          instance.setState({
            isEditingName: false,
            isEditingDate: false,
            isLoading: false
          });
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error);
        });
    }
  }

  handleDelete() {
    const { trip } = this.state;
    const instance = this;
    TripAPI.deleteTrip(this, trip.trip_id)
      .then(function (response) {
        if (response && response.data.tripsDeleted === 1) {
          instance.routeChange(PATHS.trips());
        } else {
          alert('You are not authorized to delete this trip');
        }
      })
      .catch(function (error) {
        alert(error.message);
        console.log(error);
      });
  }

  formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('default', options);
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

    const { isLoading, trip, tripName, startDate, endDate, isEditingName, isEditingDate } = this.state;

    if (isLoading) {
      return <Preloader />;
    }

    const isChanged = tripName !== null || startDate !== null || endDate !== null;
    return (
      <div className="create-trip" >
        <div className="top-bar">
          <div className="back" onClick={this.props.handleBack}>
            <span>back</span>
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
                        defaultValue={trip.trip_name}
                      />
                    </div>
                  : <span>{trip.trip_name}</span>
                }
              </div>
              { trip &&
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
                        selected={startDate}
                        onChange={this.handleChangeStartDate}
                        placeholderText="start date"
                      />
                      <span>-</span>
                      <DatePicker
                        className="value-form value-form-date"
                        selected={endDate}
                        onChange={this.handleChangeEndDate}
                        placeholderText="end date"
                      />
                    </div>
                  : <span>{this.formatDate(trip.start_date)} - {this.formatDate(trip.end_date)}</span>
                }
              </div>
              { trip &&
                <div className="edit" onClick={this.toggleEditDate}>
                  <span></span>
                </div>
              }
            </div>
          </Form>
        </div>
        { trip &&
          <div className="delete-button" onClick={this.handleDelete}>
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

export default TripInfo;
