import React from "react";
import autoBindMethods from 'class-autobind-decorator';
import { toast } from 'react-toastify';

import UserAPI from "../../api/user.js";
import Preloader from "../Preloader";
import PATHS from '../../constants/paths';

@autoBindMethods
class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  routeChange(pathname) {
    this.props.routeChange(pathname);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const instance = this;
    UserAPI.getUserData(this.routeChange, localStorage.getItem("userId"))
      .then(function (response) {
        instance.setState({
          userData : response.data[0],
          isLoading: false
        });
      })
      .catch(function (error) {
        const errorMessage = error.hasSpecialMessage ? error.message : `Oops! Something went wrong.`;
        toast(errorMessage, {
          type: 'error',
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });
      });
  }

  render() {
    if (this.state.isLoading) return null;
    else {
      let {user_id, username, email, location, name, profile_photo, cover_photo} = this.state.userData;
      if (!cover_photo) cover_photo = '../../../../assets/common/default-cover.jpg';
      if (!profile_photo) profile_photo = '../../../../assets/common/user-icon.png'
      return (
        <div className='profile-banner'>
          <div className='photos-container'>
            <img className='cover-photo' src={cover_photo}/>
            <div className='profile-and-button-container'>
              <img className='profile-photo' src={profile_photo} alt={name.charAt(0)}/>
              <label className='edit-button' onClick={() => this.props.routeChange(PATHS.profile)}>edit profile</label>
            </div>
          </div>
          {localStorage.getItem('platform') === 'jwt' ?
          <div className='details-container'>
            <label className='name'>Guest</label>
          </div>
          :
          <div className='details-container'>
            <label className='name'>{name}</label>
            <label className='username'>@{username}</label>
            <label className='location'>{location}</label>
            <label className='trip-count'>{this.props.tripCount} trips</label>
          </div>
          }
        </div>
      );
    }
  }
}

export default ProfileBanner;
