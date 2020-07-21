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
import {useState} from 'react';
import ProtestCard from './ProtestCard';
import CreateNewProtestCard from './CreateNewProtestCard';
import ProtestSortButtons from './ProtestSortButtons';

// Material-UI components
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
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
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import Dialog from '@material-ui/core/Dialog';


// ** This is needed to route to other pages. May not be necessary depending on how it's handled, but works for connecting components in a pinch.
import {useHistory} from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import Cookies from 'universal-cookie';

var calls = require('../serverCalls');

/********** USESTYLES **********/

const navDrawerWidth = 250;

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // needed for content to be below appbar
  toolbar: theme.mixins.toolbar,
  btn: {
    margin: theme.spacing(0, .5, 0)
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
  const cookie = new Cookies();

  // Handles when user is logged in
  const [loggedIn, setLoggedIn] = React.useState(false); // for logged in abilities

  const handleLoggedIn = () => {
    setUser(cookie.get('authedUser'));
    setLoggedIn(true);
    console.log('User logged in with id: ', user);
  }

  if (cookie.get('authedUser') && !loggedIn) handleLoggedIn();

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
  };

  // Handles component anchoring
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //when button is opened
  const [open1, setOpen1] = React.useState(false);

  const toggleOpen1 = (val) => {
    setOpen1(val);
  };

  const [open2, setOpen2] = React.useState(false);

  const toggleOpen2 = (val) => {
    setOpen2(val);
  };
  
  // Related to the avatar menu if logged in
  const [avatarMenuOpen, setAvatarMenuOpen] = React.useState(false);
  const handleAvatarMenuToggle = () => {
    setAvatarMenuOpen((prevOpen) => !prevOpen);
  };

  // Anchor the avatar menu
  const anchorRef = React.useRef(null);
  const handleAvatarMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target))
      return;
      setAvatarMenuOpen(false);
  };

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(avatarMenuOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && avatarMenuOpen === false)
      anchorRef.current.focus();
    prevOpen.current = avatarMenuOpen;
  }, [avatarMenuOpen]);

  // Data for the menu drawer
  const drawer = (
    <div>
      <div className={classes.toolbar}/>
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
          <ListItemText primary="Organizations"/>
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
      <List component="nav" aria-label="secondary nav items">
        <ListItem
          button
          selected={selectedNavIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Profile"/>
        </ListItem>
        <ListItem
          button
          selected={selectedNavIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings"/>
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h8" align="center">
        <p><i>© Vox-Populi 2020</i></p>
      </Typography>
    </div>
  );

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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <Button variant="outlined" className={classes.btn} color="secondary" onClick={() => toggleOpen1(true)}>
            Login
          </Button>
          <Dialog open={open1} onClose={() => toggleOpen1(false)} noValidate>
            <Login 
              handleOpen = {toggleOpen1}
              modal = {true}
            />
          </Dialog>
          <Button variant="outlined" className={classes.btn} color="secondary" onClick={() => toggleOpen2(true)}>
            Sign up
          </Button>
          <Dialog open={open2} onClose={() => toggleOpen2(false)} noValidate>
            <Signup 
              handleOpen = {toggleOpen2}
              modal = {true}
            />
          </Dialog>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="drawer">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} align="center">
              <ProtestSortButtons />
            </Grid>
            <Grid item xs={12} sm={12} md={8}><CreateNewProtestCard /></Grid>
            <Grid item xs={12} sm={12} md={8}><ProtestCard /></Grid>
            <Grid item xs={12} sm={12} md={8}><ProtestCard /></Grid>
            <Grid item xs={12} sm={12} md={8}><ProtestCard /></Grid>
          </Grid>
        </Typography>
      </main>
    </div>
  );
};

export default AppSkeleton;
