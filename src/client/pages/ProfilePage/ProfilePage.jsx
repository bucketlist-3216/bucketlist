import React, { Component } from "react";
import autoBindMethods from 'class-autobind-decorator';
import axios from "axios";

import UserAPI from "../../api/user.js";
import Preloader from "../../components/Preloader/index.js";
import APIS from "../../constants/apis";

const DEFAULT_COVER = '../../../../assets/common/default-cover.jpg';

@autoBindMethods
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      cover_photo: DEFAULT_COVER,
      profile_photo: null,
      name: null,
      username: null,
      location: null,
      email: null,
      changesMade: false
    };
    this.coverUploadRef = React.createRef();
    this.profileUploadRef = React.createRef();
    this.changeCoverPic = this.changeCoverPic.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.handleCoverPicChange = this.handleCoverPicChange.bind(this)
    this.handleProfilePicChange = this.handleProfilePicChange.bind(this)
    this.sendForm = this.sendForm.bind(this)
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    UserAPI.getUserData(this.routeChange, localStorage.getItem("userId"))
      .then((response) => {
        const newState = Object.assign({
          nameChanged: false,
          usernameChanged: false,
          locationChanged: false,
          emailChanged: false,
          profilePhotoChanged: false,
          coverPhotoChanged: false,
          isLoading: false
        }, response.data[0]);
        newState.cover_photo = newState.cover_photo || DEFAULT_COVER;
        this.setState(newState);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  changeCoverPic() {
    this.coverUploadRef.current.click();
  }
  changeProfilePic(){
    this.profileUploadRef.current.click();
  }

  handleCoverPicChange(event) {
    this.setState({
      coverPhotoChanged: true,
      changesMade:true,
      cover_photo: URL.createObjectURL(event.target.files[0]),
      coverPictureFile: event.target.files[0]
    })
  }
  handleProfilePicChange(event) {
    this.setState({
      profilePhotoChanged: true,
      changesMade:true,
      profile_photo: URL.createObjectURL(event.target.files[0]),
      profilePictureFile: event.target.files[0]
    })
  }

  sendForm() {
    const formData = new FormData();
    if (this.state.nameChanged) formData.set('name', this.state.name);
    if (this.state.usernameChanged) formData.set('username', this.state.username);
    if (this.state.locationChanged) formData.set('location', this.state.location);
    if (this.state.emailChanged) formData.set('email', this.state.email);
    if (this.state.profilePhotoChanged) formData.append('profile-pic-file', this.state.profilePictureFile);
    if (this.state.coverPhotoChanged) formData.append('cover-pic-file', this.state.coverPictureFile);
    axios.request({
      url: APIS.user(localStorage.getItem('userId')),
      method: 'put',
      data: formData,
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      }
    })
    .then(() => this.props.history.goBack())
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('platform');
        instance.routeChange(PATHS.login);
        return;
      }
      alert(error.message);
    });
  }

  render() {
    if (this.state.isLoading) return <Preloader/>;
    const editImageIcon = (
      <div className="edit-image-icon">
        <span className="camera-icon"></span>
        <span className="plus-icon">+</span>
      </div>
    );

    return (
    <div className="profile-page">
      <div className="buttons-container">
        <label className="cancel-button" onClick={this.props.history.goBack}>Cancel</label>
        <label className={this.state.changesMade ? "save-button" : "save-button-disabled"} onClick={this.sendForm}>Save</label>
      </div>
      <div className="cover-picture" onClick={this.changeCoverPic}>
        <img src={this.state.cover_photo}/>
        <div className="overlay"></div>
        <input
          type="file"
          id="cover-pic-file"
          ref={this.coverUploadRef}
          accept="image/*"
          onChange={this.handleCoverPicChange}
        />
        {editImageIcon}
      </div>
      <div className="profile-picture" onClick={this.changeProfilePic}>
        <img src={this.state.profile_photo}/>
        <input
          type="file"
          id="profile-pic-file"
          ref={this.profileUploadRef}
          accept="image/*"
          onChange={this.handleProfilePicChange}
        />
        <div className="overlay"></div>
        {editImageIcon}
      </div>
      <div className="details-container">
        <div className="detail-row">
          <label className="detail-field">Name</label>
          <input className="detail-value" type="text" value={this.state.name}
            onChange={(event)=>this.setState({nameChanged:true, changesMade:true, name: event.target.value})}
          />
        </div>
        <div className="detail-row">
          <label className="detail-field">Username</label>
          <input className="detail-value" type="text" value={this.state.username}
            onChange={(event)=>this.setState({usernameChanged:true, changesMade:true, username: event.target.value})}
          />
        </div>
        <div className="detail-row">
          <label className="detail-field">Location</label>
          <input className="detail-value" type="text" value={this.state.location}
            onChange={(event)=>this.setState({locationChanged:true, changesMade:true, location: event.target.value})}
          />
        </div>
        <div className="detail-row">
          <label className="detail-field">Email</label>
          <span className="detail-value detail-value-unchangeable">{this.state.email}</span>
        </div>
      </div>
      <div className="log-out-button">
        <span>Log Out</span>
      </div>
    </div>
    )
  }

}

export default ProfilePage;
