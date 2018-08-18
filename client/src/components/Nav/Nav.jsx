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
const fade = true;

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
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
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
          <IconButton onClick={this.handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        }
          
          {/* <Paper className="navBar"> */}
      <List component="nav">
        <Link to={`/${isUser}`}>
          <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}`)}>
            <ListItemText primary="Trips" />
          </ListItem>
        </Link>
        <Divider />
        {this.props.isLoggedIn &&
          <div>
            <Link to={`/${this.props.user}/archived`}>
              <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}/archived`)}>
                <ListItemText primary="Archived" />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${this.props.user}/billing`}>
              <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}/billing`)}>
                <ListItemText primary="Billing" />
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/${this.props.user}/settings`}>
              <ListItem button onClick={(e) => this.props.checkIfTripSaved(e, `/${this.props.user}/settings`)}>
                <ListItemText primary="Account" />
              </ListItem>
            </Link>
          </div>
        }
      </List>
    {/* </Paper> */}
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
              Backwoods
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
        {/* <main className="MainContentWrapper">
    
          {this.props.children}
        </main> */}
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);