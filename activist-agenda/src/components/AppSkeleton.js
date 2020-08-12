/*************************************************
AppSkeleton.js is the foundation for App.js.

It consists of three main areas:
  1. Header (topmost area)
    a. web-app logo
    b. search
    c. signin/signup/avatar
  2. Navigation menu (left side) with links
    a. protests
    b. organizations
    c. petitions & donations
    d. recent news
  3. Feed (main content)
    a. based on selected menu option

Resources:
  - React: https://reactjs.org/
  - Material-UI: https://material-ui.com/
*************************************************/

/********** IMPORTS **********/

// Personal components
import React from 'react';
import ContentCreationCard from './ContentCreationCard'
import ProtestInfScroll from './ProtestInfScroll.js';
import {useState} from 'react';
import NewsInfScroll from './NewsInfScroll.js';
import OrgInfScroll from './OrgInfScroll.js';
import PnDInfScroll from './PnDInfScroll.js';

// Material-UI components
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Material-UI icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MenuIcon from '@material-ui/icons/Menu';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import Dialog from '@material-ui/core/Dialog';

// ** This is needed to route to other pages. May not be necessary depending on how it's handled, but works for connecting components in a pinch.
import {useHistory} from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import Cookies from 'universal-cookie';

var calls = require('../serverCalls');

/********** USESTYLES **********/

const navDrawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${navDrawerWidth}px)`,
      marginLeft: navDrawerWidth,
    },
  },
  appNameFlex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: navDrawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: navDrawerWidth,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
  },
  // needed for content to be below appbar
  toolbar: theme.mixins.toolbar,
  btn: {
    margin: theme.spacing(0, .5, 0)
  },
  mapCardStyle: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0),
      width: theme.spacing(50),
      height: theme.spacing(50),
    },
  },
}));

/********** MAIN **********/

const AppSkeleton = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { window } = props;
  const history = useHistory(); // ** Needed to switch to another page.

  //Check authedUser cookie and set user state
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');

  const cookie = new Cookies();

  // Handles when user is logged in, checks for cookie on load
  const [loggedIn, setLoggedIn] = React.useState(false); // for logged in abilities

  // Changes login state and stores userID in user state if cookie exists
  const checkLogin = () => {
    if (cookie.get('authedUser') && !loggedIn) {
      setUser(cookie.get('authedUser'));
      setLoggedIn(true);
      calls.getUser(cookie.get('authedUser')).then((user_) => {
        setUsername(user_.username);
      });
    }
  };

  checkLogin(); //run on startup

  // States
  const container = window !== undefined ? () => window().document.body : undefined; // for mobile viewing
  const [mobileOpen, setMobileOpen] = React.useState(false); // for mobile viewing
  const [selectedNavIndex, setSelectedNavIndex] = React.useState(0); // for left sidebar nav
  const [anchorEl, setAnchorEl] = React.useState(null); // passes location of button that called it
  
  // Toggles menu drawer in mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // Controls which menu list option should stay highlighted
  const handleListItemClick = (event, index) => {
    setSelectedNavIndex(index);
    if (index === 4) {
      if (loggedIn) {
        console.log('username: ',username);
        history.push("/userprofile/" + username);
      } else {
        history.push("/login");
      }
    }
  };

  //login form
  const [open1, setOpen1] = React.useState(false);

  const toggleOpen1 = (val, toggle) => {
    setOpen1(val);
    if (toggle) toggleOpen2(true);
  };

  //signup form
  const [open2, setOpen2] = React.useState(false);

  const toggleOpen2 = (val, signed) => {
    setOpen2(val);
    if (signed) toggleOpen1(true);
  };

  // Removes the cookie and logs the user out
  const logOut = () => {
    cookie.remove('authedUser');
    history.push('/login');
  }

  // Header buttons (either login/signup or avatar)
  function HeaderButtons() {
    if (!loggedIn) {
      return (
        <>
          <Button variant="outlined" className={classes.btn} color="secondary" onClick={() => toggleOpen1(true)}>
            Login
          </Button>
          <Dialog open={open1} onClose={() => {toggleOpen1(false)
            checkLogin()}} noValidate>
            <Login 
              handleOpen = {toggleOpen1}
              modal = {true}
            />
          </Dialog>
          <Button variant="outlined" className={classes.btn} color="secondary" onClick={() => toggleOpen2(true)}>
            SignUp
          </Button>
          <Dialog open={open2} onClose={() => toggleOpen2(false)} noValidate>
            <Signup 
              handleOpen = {toggleOpen2}
              modal = {true}
            />
          </Dialog>
        </>
      )
    }
    else {
      return (
        <div>
        <Button variant="outlined" className={classes.btn} color="secondary" onClick={logOut}>
          Log Out
        </Button>
        <IconButton size="small" onClick={goToProfile}>
            <Avatar />
        </IconButton>
        </div>
      )
    }
  };

  // Display more nav menu items when logged in
  function UserDrawerListItems() {
    if (loggedIn) {
      return (
        <List component="nav" aria-label="secondary nav items">
          <ListItem
            button
            selected={selectedNavIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile"/>
          </ListItem>
          {/* <ListItem
            button
            selected={selectedNavIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings"/>
          </ListItem> */}
        </List>
      )
    };
  };
  
  // Data for the menu drawer
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography className={classes.appNameFlex} color="primary" align="center">
          <br/><img src="logo-circle.png" width="128px" height="128px" />
        </Typography>
      </div>
      <Divider />
      <List component="nav" aria-label="main nav items">
        <ListItem
          button
          selected={selectedNavIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon><EmojiPeopleIcon /></ListItemIcon>
          <ListItemText primary="Protests"/>
        </ListItem>
        <ListItem
          button
          selected={selectedNavIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Organizers"/>
        </ListItem>
        <ListItem
          button
          selected={selectedNavIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Petitions & Donations"/>
        </ListItem>
        <ListItem
          button
          selected={selectedNavIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon><NewReleasesIcon /></ListItemIcon>
          <ListItemText primary="Recent News"/>
        </ListItem>
      </List>
      <Divider />
      {UserDrawerListItems()}
      <Divider />
      <Typography variant="h8" align="center">
        <p><i>© Vox-Populi 2020</i></p>
      </Typography>
    </div>
  );

  //Sets the protest cards
  const protests = (
    <>
      <Grid item xs={12} sm={12} md={6}>{loggedIn ? <><ContentCreationCard/><br/></> : <><Divider/><br/></>}</Grid>
      <ProtestInfScroll/>
    </>
  );

  //Sets the news cards
  const news = (
    <>
      <NewsInfScroll/>
    </>
  )

  const orgs = (
    <>
      <OrgInfScroll/>
    </>
  )

  const PnD = (
    <>
    <Grid item xs={12} sm={12} md={6}>{loggedIn ? <><ContentCreationCard/><br/></> : <><Divider/><br/></>}</Grid>
    <PnDInfScroll/>
    </>
  )

  //Sets which set of cards it displays, protests or news.
  const selectNav = () => {
    switch(selectedNavIndex) {
      case 0:
        return protests;
      case 1:
        return orgs;
      case 2:
        return PnD;
      case 3:
        return news;
      default:
        return protests;
    };
  };

  //Moves to the user profile upon the avatar button being clicked
  const goToProfile = () => {
    history.push("/userprofile/" + username);
  }

  //newPosts();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open menu drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.appNameFlex} variant="h6" noWrap>
            Activist Agenda
          </Typography>
          {HeaderButtons()}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="drawer">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // better open performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Typography paragraph>
          {selectNav()}
        </Typography>
      </main>
    </div>
  );
};

export default AppSkeleton;
