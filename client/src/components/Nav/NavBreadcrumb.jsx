import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';


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
        <i key={1} className="material-icons">
          keyboard_arrow_right
        </i>,
       <React.Fragment>
        {/* // <Typography key={2} className="breadCrumb"> */}
          {t[t.length - 1]}
          </React.Fragment>
      ];
    }
  }
  render() {
    return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
    <React.Fragment>
      {/* <Paper className="navBreadcrumb"> */}
        {/* <div style={bread}> */}
          <Typography variant="title" color="inherit" noWrap>
            <Link to={`/${this.props.user}`}>Home</Link>
          {this.nextBreadCrumb()}
          </Typography>
        {/* </div>
      </Paper> */}
      </React.Fragment>
    </Slide>
    );
  }
}

export default NavBreadcrumb;
