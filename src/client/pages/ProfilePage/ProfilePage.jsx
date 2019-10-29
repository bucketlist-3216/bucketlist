import React, { Component } from "react";

class ProfilePage extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      isDoneFetching: false,
      isLoading: true,
      coverPictureLink: '../../../../assets/demo/MarinaBaySands.jpg',
      profilePictureLink: '../../../../assets/demo/YaKunKayaToast.jpg'
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  changePicture() {

  }

  render() {
    return (
    <div className="profile-page">
      <div className="header-space"></div>
      <div className="buttons-container">
        <label className="cancel-button" onClick={this.props.history.goBack}>Cancel</label>
        <label className="save-button">Save</label>
      </div>
      <div className="pictures-container">
        <img className="cover-picture" src={this.state.coverPictureLink} onClick={this.changeCoverPic}></img>
        <img className="profile-picture" src={this.state.profilePictureLink} onclick={this.changeProfilePic}></img>
      </div>
      <div className="details-container">
        <div className="detail-row">
          <label className="detail-field">Name</label>
          <label className="detail-value">{this.state.name}</label>
        </div>
        <div className="detail-row">
          <label className="detail-field">Username</label>
          <label className="detail-value">{this.state.username}</label>
        </div>
        <div className="detail-row">
          <label className="detail-field">Location</label>
          <label className="detail-value">{this.state.location}</label>
        </div>
        <div className="detail-row">
          <label className="detail-field">Email</label>
          <label className="detail-value">{this.state.email}</label>
        </div>
      </div>
    </div>
    )
  }

}

export default ProfilePage;