import React from 'react';

import HomeButton from '../../buttons/HomeButton';

const SideDrawer = props => {
  const { sideDrawerOpen, drawerToggleClickHandler } = props;
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
        </div>
        <div className="swipe-drawer-username">
        </div>
        <div className="swipe-drawer-profile">
          <div>
            <a href="/">Profile</a>
          </div>
        </div>
        <div className="swipe-drawer-settings">
          <div>
            <a href="/">Settings</a>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default SideDrawer;
