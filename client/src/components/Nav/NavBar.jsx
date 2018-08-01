import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const NavBar = (props) => {
  return (
    <Paper className="navBar">
      <List component="nav">
        <Link to={`/${props.user}`}>
          <ListItem button>
            <ListItemText primary="Trips" />
          </ListItem>
        </Link>
        <Divider />
        {props.isLoggedIn && 
        <div>
        <Link to={`/${props.user}/billing`}>
          <ListItem button>
            <ListItemText primary="Billing" />
          </ListItem>
        </Link>
        <Divider />
        <Link to={`/${props.user}/settings`}>
          <ListItem button>
            <ListItemText primary="Account" />
          </ListItem>
        </Link>
        </div>
        }
      </List>
    </Paper>
  );
}

export default withStyles(styles)(NavBar);
