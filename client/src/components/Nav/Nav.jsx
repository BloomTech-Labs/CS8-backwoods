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
import SignInOut from '../SignInOut/SignInOut'
import NavBreadcrumb from './NavBreadcrumb';
import ModalTripSave from './ModalTripSave';

const fade = true;
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
  },
  CoolStuff: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const Nav = (props) => {
  const { classes, theme } = props; // Materail-UI 
  const { user, emailFromUser, mobileOpen, handleDrawerToggle,
          checkIfTripSaved, isLoggedIn } = props; //NAV
  const { handleTabChange, handleLogOut, tabState, handleChange,
          handleSignUp, handleSignIn, firstName, lastName, email,
          password, validatePassword, handleClose, handleOpen, open} = props //sign IN/out
  const isUser = user ? user : emailFromUser
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {mobileOpen &&
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle} className={classes.IconButton}>
        {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.ChevronIcon}/> : <ChevronLeftIcon className={classes.ChevronIcon}/>}
      </IconButton>
      </div>
      }
    <List component="nav">
      <Link to={`/${isUser}`} className="navBarLinks">
        <ListItem button onClick={(e) => checkIfTripSaved(e, `/${user}`)}>
          <ListItemText
            disableTypography 
            className={classes.ListItemText}
            primary={<Typography variant="title">Trips</Typography>}
          />
        </ListItem>
      </Link>
      <Divider />
      {isLoggedIn &&
        <div>
          <Link to={`/${user}/archived`} className="navBarLinks">
            <ListItem button onClick={(e) => checkIfTripSaved(e, `/${user}/archived`)}>
              <ListItemText 
                disableTypography 
                className={classes.ListItemText}
                primary={<Typography variant="title">Archived</Typography>}
              />
            </ListItem>
          </Link>
          <Divider />
          <Link to={`/${user}/billing`} className="navBarLinks">
            <ListItem button onClick={(e) => checkIfTripSaved(e, `/${user}/billing`)}>
              <ListItemText
                disableTypography 
                className={classes.ListItemText}
                primary={<Typography variant="title">Billing</Typography>}
              />
            </ListItem>
          </Link>
          <Divider />
          <Link to={`/${user}/settings`} className="navBarLinks">
            <ListItem button onClick={(e) => checkIfTripSaved(e, `/${user}/settings`)}>
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
        <Toolbar className={classes.CoolStuff}>
        <div className="breadAndHanburger">

          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            <NavBreadcrumb user={user}/>
          </Typography>
            </div>
          <SignInOut
            buttonVariant="flat"
            styleName='signInOutMain'
            handleTabChange={handleTabChange}
            handleLogOut={handleLogOut}
            tabState={tabState}
            handleChange={handleChange}
            handleSignUp={handleSignUp}
            handleSignIn={handleSignIn}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            validatePassword={validatePassword}
            isLoggedIn={isLoggedIn}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
          />
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
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
        {props.children}
      </main>
      <ModalTripSave
        tripSavedModal={props.tripSavedModal}
        tripModalFalse={props.tripModalFalse}
        navRedirect={props.navRedirect}
        modalContinue={props.modalContinue}
        />
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

  user: PropTypes.string.isRequired,
  emailFromUser: PropTypes.string.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  checkIfTripSaved: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(Nav);