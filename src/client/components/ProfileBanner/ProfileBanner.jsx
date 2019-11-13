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
  }

  routeChange(pathname) {
    this.props.routeChange(pathname);
  }

  render() {
    let {user_id, username, email, location, name, profile_photo, cover_photo} = this.props.userData;
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

export default ProfileBanner;
