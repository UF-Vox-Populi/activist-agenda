import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import theme from '../theme.js';
import { height } from '@material-ui/system';

import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
var calls = require('../serverCalls');

const palette = theme.palette;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    userInfoSection: {
        backgroundColor: palette.primary.main,
    },
    profilePicture: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginTop: theme.spacing(4),
    },
    nameSection: {
        color: '#FFFFFF',
    },
    followInfoSection: {
        alignItems: 'center',
        margin: theme.spacing(4),
    },
    followInfoButton: {
        alignItems: 'center',
        color: '#FFFFFF',
        backgroundColor: palette.primary.main,
    },
    bioSection: {
        alignItems: 'center',
        marginTop: theme.spacing(1),
        color: '#FFFFFF',        
    },
    locationSection: {
        alignItems: 'center',
        marginTop: theme.spacing(1),
        color: '#FFFFFF',        
    },
    editFollowUnfollowButton: {
        color: '#FFFFFF',
        backgroundColor: palette.primary.main,
        margin: theme.spacing(4),
    },
    updateSection: {
        backgroundColor: palette.secondary.main,
        padding: theme.spacing(4),
    }


}));

const UserProfile = (props) => {

    const classes = useStyles();
    const { window } = props;
    const history = useHistory();

    const goToEdit = () => {
        history.push("/editprofile");
    }

    const goHome = () => {
        history.push("/");
    }

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');

    //Check authedUser cookie and set user state
    const [user, setUser] = useState('');
    const cookie = new Cookies();

    // Handles when user is logged in, checks for cookie on load
    const [loggedIn, setLoggedIn] = React.useState(false); // for logged in abilities

    // Changes login state and stores userID in user state if cookie exists
    const checkLogin = () => {
        if (cookie.get('authedUser') && !loggedIn) {
            setUser(cookie.get('authedUser'));
            setLoggedIn(true);
            console.log('User logged in with id: ', cookie.get('authedUser')); //remove later
            calls.getUser(cookie.get('authedUser')).then(out => {
                setName(out.firstName + ' ' + out.lastName);
                setUsername(out.username);
                setBio(out.bio);
                setLocation(out.location);
            })
        }
    };

    checkLogin(); //run on startup

    return (
        <div className={classes.root}>
            {/* User Info Section */}
            <Grid container direction='column' alignItems='center' className={classes.userInfoSection}>

            {/* Profile Picture Section */}
                <Grid item>
                    <Avatar className={classes.profilePicture}/>
                </Grid>
            
            {/* Username and Name Section */}
                <Grid item className={classes.nameSection}>
                    <Typography variant='h6'>{name}</Typography>
                </Grid>
                <Grid item className={classes.nameSection}>
                    <Typography variant='h8'>{username}</Typography>
                </Grid>
            {/* Follow Info Section */}
                <Grid container container direction='column' className={classes.followInfoSection}>
                    <Grid item alignItems='center'>
                        <Button variant='contained' className={classes.followInfoButton}>
                            <ListItemText primary='20' secondary={<Typography variant='h8' style={{color: '#FFFFFF'}}>Followers</Typography>}/>
                        </Button>
                        <Button variant='contained' className={classes.followInfoButton}>
                            <ListItemText primary='20' secondary={<Typography variant='h8' style={{color: '#FFFFFF'}}>Following</Typography>}/>
                        </Button>
                    </Grid>
                </Grid>

            {/* Bio Section */}
            <Grid container container direction='column' className={classes.bioSection}>
                <Typography variant='h8'>{bio}</Typography>
            </Grid>

            {/* Location Section */}
            <Grid container container direction='column' className={classes.bioSection}>
                <Typography variant='h8'>{location}</Typography>
            </Grid>

            {/* Edit, Fullow, Unfollow Button Section */}

            <div>
            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={goHome}>
                Back
            </Button>
            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={goToEdit}>
                Edit
            </Button>
            </div>

            </Grid>

            {/* Updates Section */}
            <Grid container className={classes.updateSection}>
            
            
            </Grid>
        </div>
    );

};
export default UserProfile;