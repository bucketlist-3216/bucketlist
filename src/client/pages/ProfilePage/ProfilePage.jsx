import React, { Component } from "react";
import getUserData from "../../api/user.js";
import Preloader from "../../components/Preloader/index.js";
import axios from "axios";
import APIS from "../../constants/apis";

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
      email: 'ilovekaya@toast.com',
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
    getUserData(this, localStorage.getItem("userId")).then(() => {
      let {user_id, username, email, google_id, facebook_id, temporary, location, name, profile_photo, cover_photo} = this.state.userData[0];
      this.setState({
        name: name,
        username: username,
        location: location,
        email: email,
        profilePictureLink: profile_photo ? profile_photo : '../../../../assets/common/user-icon.png',
        coverPictureLink: cover_photo ? cover_photo : '../../../../assets/common/default-landscape.jpg',
        nameChanged: false,
        usernameChanged: false,
        locationChanged: false,
        emailChanged: false,
        profilePhotoChanged: false,
        coverPhotoChanged: false
      });
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
      coverPictureLink: URL.createObjectURL(event.target.files[0]),
      coverPictureFile: event.target.files[0]
    })
  }
  handleProfilePicChange(event) {
    this.setState({
      profilePhotoChanged: true,
      changesMade:true, 
      profilePictureLink: URL.createObjectURL(event.target.files[0]),
      profilePictureFile: event.target.files[0]
    })
  }

  sendForm() {
    var formData = new FormData();
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
    }).catch(function (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('platform');
        instance.routeChange(PATHS.login);
        return;
      }
      toast(`Oops! Something went wrong.`, {
        type: 'error',
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
    }).then(() => this.props.history.goBack());
  }

  render() {
    if (this.state.isLoading) return <Preloader/>;
    return (
    <div className="profile-page">
      <div className="header-space"></div>
      <div className="buttons-container">
        <label className="cancel-button" onClick={this.props.history.goBack}>Cancel</label>
        {this.state.changesMade ? 
        <label className="save-button" onClick={this.sendForm}>Save</label>
        :
        <label className="save-button-disabled">Save</label>}
      </div>
      <div className="pictures-container">
        <img className="cover-picture" src={this.state.coverPictureLink} onClick={this.changeCoverPic}/>
        <input type="file" id="cover-pic-file" style={{display: "none"}} 
          ref={this.coverUploadRef} accept="image/*" onChange={this.handleCoverPicChange}/>
        <img className="profile-picture" src={this.state.profilePictureLink} onClick={this.changeProfilePic}/>
        <input type="file" id="profile-pic-file" style={{display: "none"}}
          ref={this.profileUploadRef} accept="image/*" onChange={this.handleProfilePicChange}/>
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
          <input className="detail-value" type="text" value={this.state.email}
            onChange={(event)=>this.setState({emailChanged:true, changesMade:true, email: event.target.value})}
          />
        </div>
      </div>
    </div>
    )
  }

}

export default ProfilePage;