import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGlobeAmericas, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import PATHS from '../../constants/paths';
import HomeButton from '../../buttons/HomeButton';

const SideDrawer = props => {
  const { sideDrawerOpen, drawerToggleClickHandler, routeChange } = props;
  let sideDrawerClassName = sideDrawerOpen ? "side-drawer-open" : "side-drawer";

  return (
    <nav className={sideDrawerClassName}>
      <div className="side-drawer-container">
        <div className="swipe-drawer-profile">
          <HomeButton
            onClick={() => drawerToggleClickHandler()}
          />
        </div>
        <div className="swipe-drawer-name">
          {"Name"}
        </div>
        <div className="swipe-drawer-username">
          {"@username"}
        </div>
        <div className="swipe-drawer-tab-container" onClick={() => alert('Coming soon!')}>
          <div>
            <FontAwesomeIcon icon={ faUser } size="lg"></FontAwesomeIcon>
          </div>
          <div className="swipe-drawer-tab">
            {"Profile"}
          </div>
        </div>
        <div className="swipe-drawer-tab-container" onClick={() => routeChange(PATHS.trips())}>
          <div>
            <FontAwesomeIcon icon={ faGlobeAmericas } size="lg"></FontAwesomeIcon>
          </div>
          <div className="swipe-drawer-tab">
            {"Trips"}
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
        { 
          localStorage.getItem('platform') == 'google' &&
          <div className="swipe-drawer-tab-last" onClick={() => alert('Coming soon!')}>
            <div>
              <FontAwesomeIcon icon={ faSignOutAlt } size="xs"></FontAwesomeIcon>
            </div>
            <div className="swipe-drawer-tab">
              {"Log Out"}
            </div>
          </div>
        }
      </div>
    </nav>
  )
};

export default SideDrawer;
