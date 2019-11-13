import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import PATHS from '../../constants/paths';
import ProfileButton from '../../buttons/ProfileButton';

const SideDrawer = props => {
  const { sideDrawerOpen, drawerToggleClickHandler, routeChange, name, username, profilePictureLink } = props;
  let sideDrawerClassName = sideDrawerOpen ? "side-drawer-open" : "side-drawer";

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('platform');
    routeChange(PATHS.home)
  }

  if (localStorage.getItem('platform') == 'google') {
    return (
      <nav className={sideDrawerClassName}>
        <div className="side-drawer-container">
          <div className="swipe-drawer-profile">
            <ProfileButton
              imgSrc={profilePictureLink}
              onClick={() => drawerToggleClickHandler()}
            />
          </div>
          <div className="swipe-drawer-name">
            {name}
          </div>
          <div className="swipe-drawer-username">
            {'@' + username}
          </div>
          <div className="swipe-drawer-tab-container" onClick={() => routeChange(PATHS.trips())}>
            <div>
              <FontAwesomeIcon icon={ faUser } size="lg"></FontAwesomeIcon>
            </div>
            <div className="swipe-drawer-tab">
              {"Profile"}
            </div>
          </div>
          <div className="swipe-drawer-tab-container" onClick={() => alert('Coming soon!')}>
            <div>
              <FontAwesomeIcon icon={ faCog } size="lg"></FontAwesomeIcon>
            </div>
            <div className="swipe-drawer-tab">
              {"Settings"}
            </div>
          </div>
          <div className="swipe-drawer-tab-container" onClick={() => alert('Coming soon!')}>
            <div>
              <FontAwesomeIcon icon={ faSearch } size="lg"></FontAwesomeIcon>
            </div>
            <div className="swipe-drawer-tab">
              {"Search"}
            </div>
          </div>
          <div className="swipe-drawer-tab-last" onClick={() => handleLogOut()}>
            <div>
              <FontAwesomeIcon icon={ faSignOutAlt } size="xs"></FontAwesomeIcon>
            </div>
            <div className="swipe-drawer-tab">
              {"Log Out"}
            </div>
          </div>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className={sideDrawerClassName}>
        <div className="side-drawer-container">
          <div className="swipe-drawer-profile">
            <ProfileButton
              onClick={() => drawerToggleClickHandler()}
            />
          </div>
          <div className="swipe-drawer-name">
            {"Guest User"}
          </div>
          <div className="swipe-drawer-guest">
            <div>
              {"You are currently signed in as a guest."}
            </div>
            <div>
              {"Log in with Google to save your trip!"}
            </div>
          </div>
          <div className="swipe-drawer-login-container" onClick={() => routeChange(PATHS.login)}>
            <div className="swipe-drawer-login">
              {"Log In"}
            </div>
          </div>
        </div>
      </nav>
    )
  }
};

export default SideDrawer;
