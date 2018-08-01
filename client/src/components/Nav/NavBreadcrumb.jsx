import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const bread = {
  display: 'flex'
};
class NavBreadcrumb extends React.Component {
  nextBreadCrumb() {
    let currentLocation = window.location.pathname;
    let t = currentLocation.split('/');
    if (currentLocation === `/${this.props.user}`) {
      return null;
    } else {
      return [
        <i class="material-icons">keyboard_arrow_right</i>,
        <span>{t[t.length - 1]}</span>
      ];
    }
  }
  render() {
    return (
      <Paper className="navBreadcrumb">
        <div style={bread}>
          <Link to={`/${this.props.user}`}>Home</Link>
          {this.nextBreadCrumb()}
        </div>
      </Paper>
    );
  }
}

export default NavBreadcrumb;
