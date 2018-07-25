import React from 'react';
import NavBar from './NavBar.jsx';
import NavBreadcrumb from './NavBreadcrumb.jsx';

const Nav = (props) => {
  return (
    <div>
      
      <NavBreadcrumb user={props.user}/>
      <NavBar user={props.user} isLoggedIn={props.isLoggedIn}/>
    </div>
  );
};

export default Nav;
