import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const fade = true;

const NavBar = (props) => {
  const isUser = props.user ? props.user : props.emailFromUser
  return (
    <Slide direction="right" in={fade} mountOnEnter unmountOnExit>
    <Paper className="navBar">
      <List component="nav">
        <Link to={`/${isUser}`}>
          <ListItem button onClick={(e) => props.checkIfTripSaved(e, `/${props.user}`)}>
            <ListItemText primary="Trips" />
          </ListItem>
        </Link>
        <Divider />
        {props.isLoggedIn &&
          <div>
            <Link to={`/${props.user}/archived`}>
              <ListItem button onClick={(e) => props.checkIfTripSaved(e, `/${props.user}/archived`)}>
                <ListItemText primary="Archived" />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${props.user}/billing`}>
              <ListItem button onClick={(e) => props.checkIfTripSaved(e, `/${props.user}/billing`)}>
                <ListItemText primary="Billing" />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${props.user}/settings`}>
              <ListItem button onClick={(e) => props.checkIfTripSaved(e, `/${props.user}/settings`)}>
                <ListItemText primary="Account" />
              </ListItem>
            </Link>
          </div>
        }
      </List>
    </Paper>
  </Slide>
  );
}

export default withStyles(styles)(NavBar);
