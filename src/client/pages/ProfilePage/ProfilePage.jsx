import React, { Component } from "react";
import getUserData from "../../api/user.js";
import Preloader from "../../components/Preloader/index.js";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDoneFetching: false,
      isLoading: true,
      coverPictureLink: '../../../../assets/common/default-landscape.jpg',
      profilePictureLink: '../../../../assets/common/user-icon.png',
      name: 'Kaya Toast',
      username: 'kayaAndButter',
      location: 'Singapore',
      email: 'ilovekaya@toast.com'
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getUserData(this, localStorage.getItem("userId")).then(() => {
      let {user_id, username, email, google_id, facebook_id, temporary, location, name, profile_photo, cover_photo} = this.state.userData[0];
      this.setState({
        name: name,
        username: username,
        location: location,
        email: email
      });
    });
  }

  changePicture() {

  }

  render() {
    if (this.state.isLoading) return <Preloader/>;
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