import React from 'react';

import PATHS from '../../constants/paths';
import IconButton from '../IconButton';

const LogoutButton = (props) => {
  const { routeChange } = props;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('platform');
    routeChange(PATHS.login);
  }

  return (
    <IconButton
      icon=""
      className="logout-button"
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;
