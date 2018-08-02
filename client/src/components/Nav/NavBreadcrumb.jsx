import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

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
        <i className="material-icons">keyboard_arrow_right</i>,
        <Typography className="breadCrumb">{t[t.length - 1]}</Typography>
      ];
    }
  }
  render() {
    return (
      <Paper className="navBreadcrumb">
        <div style={bread}>
          <Typography>
            <Link to={`/${this.props.user}`}>Home</Link>
          </Typography>
          {this.nextBreadCrumb()}
        </div>
      </Paper>
    );
  }
}

export default NavBreadcrumb;
