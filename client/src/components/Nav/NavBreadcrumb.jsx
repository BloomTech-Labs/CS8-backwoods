import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

class NavBreadcrumb extends React.Component {
  nextBreadCrumb() {
    let currentLocation = window.location.pathname;
    let t = currentLocation.split('/');
    if (currentLocation === `/${this.props.user}`) {
      return null;
    } else {
      return [
        <i key={1} className="material-icons">
          keyboard_arrow_right
        </i>,
        <div key={2}>
          {t[t.length - 1]}
        </div>
      ];
    }
  }
  render() {
    return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <React.Fragment>
        <div style={{display: 'flex'}}>
          <Typography variant="title" color="inherit" noWrap>
            <Link to={`/${this.props.user}`} className="navBarLinks" >Home</Link>
          </Typography>
          {this.nextBreadCrumb()}
        </div>
      </React.Fragment>
    </Slide>
    );
  }
}

export default NavBreadcrumb;
