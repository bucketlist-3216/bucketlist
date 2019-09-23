import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import Link from './link.png';

import './Create.scss'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {city: 'Select City',
                  to: 'To',
                  from: 'From'};

    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCity(event) {
    this.setState({city: event.target.city});
  }

  handleChangeTo(event) {
    this.setState({to: event.target.to});
  }

  handleChangeFrom(event) {
    this.setState({from: event.target.from});
  }

  handleAddFriends(event) {
    alert('Add friends!');
  }

  handleSubmit(event) {
    alert('Form submitted!');
  }

  render() {
    return (
      <div style={{display: 'flex',  justifyContent:'center'}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div style={{textAlign: 'center'}} className="CreateTitle">
              Bucketlist
            </div>
            <div style={{textAlign: 'center'}}>
              <select value={this.state.city} onChange={this.handleChangeCity} className="InputCity">
                <option value="Select City">Select City</option>
                <option value="City 1">Singapore</option>
                <option value="City 2">New York</option>
                <option value="City 3">Thailand</option>
              </select>
            </div>
            <div style={{textAlign: 'center'}} className="CreateBody">
              Travel Dates
            </div>
            <div style={{textAlign: 'center'}}>
              <select value={this.state.from} onChange={this.handleChangeFrom} className="InputFromTo">
                <option value="Select From">From</option>
                <option value="From 1">From 1</option>
                <option value="From 2">From 2</option>
                <option value="From 3">From 3</option>
              </select>
              <select value={this.state.to} onChange={this.handleChangeTo} className="InputFromTo">
                <option value="Select To">To</option>
                <option value="To 1">To 1</option>
                <option value="To 2">To 2</option>
                <option value="To 3">To 3</option>
              </select>
            </div>
            <div style={{textAlign: 'center'}} className="CreateBody">
              Add Friends
            </div>
            <div style={{textAlign: 'center'}}>
              <Button variant="outline-primary" className="InputCity" onClick={this.handleAddFriends}>+</Button>
            </div>
            <div style={{textAlign: 'center'}}>
               <img src={Link} alt="Link icon" className="Link-Icon" /> or generate sharing link
            </div>
            <div style={{textAlign: 'center'}}>
              <input type="submit" value="Let's go!" className="InputSubmit"/>
            </div>
          </label>
        </form>
      </div>
    );
  }
}

export default Create;
