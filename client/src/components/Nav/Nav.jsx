import React from 'react';
import NavBar from './NavBar.jsx';
import SignOut from './SignOut.jsx';
import NavBreadcrumb from './NavBreadcrumb.jsx';

const Nav = () => {
  return (
    <div>
      <SignOut />
      <NavBreadcrumb />
      <NavBar />
    </div>
  );
};

export default Nav;
