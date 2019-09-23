import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Link from './link.png';

import "react-datepicker/dist/react-datepicker.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Select City',
      to: new Date(),
      from: new Date()
    };

    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCity(event) {
    this.setState({city: event.target.city});
  }

  handleChangeFrom(event) {
    this.setState({from: event});
  }

  handleChangeTo(event) {
    this.setState({to: event});
  }

  handleAddFriends(event) {
    alert('To Implement: Add friends!');
  }

  handleSubmit(event) {
    alert('To Implement: Form submitted!');
  }

  render() {
    return (
      <div style={{display: 'flex',  justifyContent:'center'}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div style={{textAlign: 'center'}} className="create-title">
              Create New Trip
            </div>
            <div style={{textAlign: 'center'}}>
              <select value={this.state.city} onChange={this.handleChangeCity} className="form-dropdown-button">
                <option value="Select City" className="form-dropdown-button">Select City</option>
                <option value="Singapore" className="form-dropdown-button">Singapore</option>
                <option value="New York" className="form-dropdown-button">New York</option>
                <option value="Thailand" className="form-dropdown-button">Thailand</option>
              </select>
            </div>
            <div style={{textAlign: 'center'}} className="create-body">
              Travel Dates
            </div>
            <div style={{textAlign: 'center'}}>
              <DatePicker className="form-date"
                selected={this.state.from}
                onChange={this.handleChangeFrom}
              />
              <DatePicker className="form-date"
                selected={this.state.to}
                onChange={this.handleChangeTo}
              />
            </div>
            <div style={{textAlign: 'center'}} className="create-body">
              Add Friends
            </div>
            <div style={{textAlign: 'center'}}>
              <Button variant="outline-primary" className="form-button" onClick={this.handleAddFriends}>+</Button>
            </div>
            <div style={{textAlign: 'center'}} className="create-body">
               <img src={Link} alt="Link icon" className="link-icon" /> or generate sharing link
            </div>
            <div style={{textAlign: 'center'}}>
              <input type="submit" value="Let's go!" className="form-submit"/>
            </div>
          </label>
        </form>
      </div>
    );
  }
}

export default Create;
