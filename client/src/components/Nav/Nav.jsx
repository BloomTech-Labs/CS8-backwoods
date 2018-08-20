import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import './Nav.css';
import Modal from '@material-ui/core/Modal';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import NavBreadcrumb from './NavBreadcrumb'
const fade = true;


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '400px',
    height: '250px',
    padding: '1% 2% 2% 2%',
    textAlign: 'center'
  };
}

// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // backgroundColor: '#8d8741'
    // marginLeft: drawerWidth,
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    // backgroundColor: '#659dbd'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: "-54px",
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  ListItemText: {
    // textAlign: 'center'
  },
  ChevronIcon: {
    height: '4rem',
    width: '4rem'
  },
  IconButton: {
    height: '80px',
    width: '80px'
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const isUser = this.props.user ? this.props.user : this.props.emailFromUser

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {this.state.mobileOpen &&
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerToggle} className={classes.IconButton}>
          {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.ChevronIcon}/> : <ChevronLeftIcon className={classes.ChevronIcon}/>}
        </IconButton>
        </div>
        }
          
          {/* <Paper className="navBar"> */}
      <List component="nav">
        <Link to={`/${isUser}`} className="navBarLinks">
          <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}`)}>
            <ListItemText
              disableTypography 
              className={classes.ListItemText}
              primary={<Typography variant="title">Trips</Typography>}
            />
          </ListItem>
        </Link>
        <Divider />
        {this.props.isLoggedIn &&
          <div>
            <Link to={`/${this.props.user}/archived`} className="navBarLinks">
              <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}/archived`)}>
                <ListItemText 
                  disableTypography 
                  className={classes.ListItemText}
                  primary={<Typography variant="title">Archived</Typography>}
                />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${this.props.user}/billing`} className="navBarLinks">
              <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}/billing`)}>
                <ListItemText
                  disableTypography 
                  className={classes.ListItemText}
                  primary={<Typography variant="title">Billing</Typography>}
                />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${this.props.user}/settings`} className="navBarLinks">
              <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}/settings`)}>
                <ListItemText
                  disableTypography
                  className={classes.ListItemText}
                  primary={<Typography variant="title">Account</Typography>}
                />
              </ListItem>
            </Link>
          </div>
        }
      </List>
        </div>
      
    );
    
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="absolute">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
              >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              <NavBreadcrumb user={this.props.user}/>
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
            <Slide direction="right" in={fade} mountOnEnter unmountOnExit>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
            >
            {drawer}
          </Drawer>
            </Slide>
        </Hidden>
        <main className={classes.content} id="globalBackground">
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
        <Modal
        open={this.props.tripSavedModal}
        onClose={this.props.tripModalFalse}
        disableAutoFocus={true}
      >
        <Fade in={this.props.tripSavedModal}>
          <Paper
            style={getModalStyle()}
            className={classes.paper}
            elevation={4}
          >
            <Typography variant="headline">
              Your trip will not be saved if you leave this page.<br />
              <br /> Do you want to continue?
            </Typography>
            <div className="stayOrLeaveButtons">
              <Button onClick={this.props.tripModalFalse}>Stay</Button>
              <Link className="leaveButton" to={this.props.navRedirect}>
                <Button onClick={this.props.modalContinue}>Leave</Button>
              </Link>
            </div>
          </Paper>
        </Fade>
      </Modal>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);