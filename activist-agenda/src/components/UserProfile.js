import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import theme from '../theme.js'
import EditProfile from './EditProfile';
import {useHistory, useParams} from 'react-router-dom';
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
    let { user } = useParams();

    // Edit button modal
    const [modalOpen, toggleModal] = useState(false);

    const goHome = () => {
        history.push("/");
    }

    const [userID, setUserID] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState('');

    //Check authedUser cookie and set user state
    const cookie = new Cookies();

    // Checks for user commands and abilities
    const [started, setStarted] = useState(true);
    const [loggedIn, setLoggedIn] = React.useState(false); // for logged in abilities
    const [profileLevel, setProfileLevel] = useState(0);
    const [userLevel, setUserLevel] = useState(0);

    // Gets information needed at the start
    useEffect(() => {
        if (started) {
            setStarted(false);
            calls.getUserIDbyUsername(user).then((profID) => {
                if (profID === 'error') {
                    setName('User Does Not Exist');
                }
                else {                    
                    setUserID(profID);
                    
                    if (cookie.get('authedUser') === profID) {
                        setLoggedIn(true);
                    }
                    calls.getUser(profID).then(out => {
                        var first,last = '';
                        (out.firstName) ? first = out.firstName : first = ' ';
                        (out.lastName) ? last = ' ' + out.lastName: last = ' ';
                        
                        setName(first + last);
                        setUsername(out.username);
                        if(out.bio) setBio(out.bio);
                        if (out.location) setLocation(out.location);
                        
                        if (cookie.get('authedUser') === profID) {
                            setEmail(out.email);
                            (out.emailVerified) ? setVerified('Email Verified') : setVerified('Email Not Verified.\nPlease Check Your Email.');
                        }
                        
                        setProfileLevel(out.authLevel);
                        calls.getUser(cookie.get('authedUser')).then(out2 => {
                            setUserLevel(out2.authLevel);
                        });
                    });
                }
            })

        }
    },[started]);

    const toggleOpen = (state) => {
        // Close edit modal after submit
        setStarted(true);
        toggleModal(state);
        //Need to refresh page or update states here
    }

    const changeAuth = (newLevel) => {
        calls.changeAuth(userID, newLevel).then(out => {
            setStarted(true);
        });
    }

    const setButtons = () => {
        if (loggedIn) {
            return (
            <>
                <Button variant='contained' className={classes.editFollowUnfollowButton} color="primary" onClick={() => toggleOpen(true)}>
                    Edit
                </Button>
                <Dialog open={modalOpen} onClose={() => {modalOpen(false)}} noValidate>
                    <EditProfile 
                        toggleOpen={toggleOpen}
                    />
                </Dialog>
            </>
            );
        }
        switch (userLevel) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                switch (profileLevel) {
                    case 0:
                        return (
                            <div>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(1)}>
                                Promote to Organizer
                            </Button>
                            </div>
                        );
                        break;
                    case 1:
                        return (
                            <div>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(0)}>
                                Demote to User
                            </Button>
                            </div>
                        );
                        break;
                }
            case 3:
                switch (profileLevel) {
                    case 0:
                        return (
                            <div>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(1)}>
                                Promote to Organizer
                            </Button>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(2)}>
                                Promote to Moderator
                            </Button>
                            </div>
                        );
                        break;
                    case 1:
                        return (
                            <div>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(0)}>
                                Demote to User
                            </Button>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(2)}>
                                Promote to Moderator
                            </Button>
                            </div>
                        );
                        break;
                    case 2:
                        return (
                            <div>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(0)}>
                                Demote to User
                            </Button>
                            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={() => changeAuth(1)}>
                                Demote to Organizer
                            </Button>
                            </div>
                        );
                        break;
                }
        }
    }

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
                    <Typography variant='h7'>{username}</Typography>
                </Grid>

            {/* Bio Section */}
            <Grid container container direction='column' className={classes.bioSection}>
                <Typography variant='h8'>{bio}</Typography>
            </Grid>

            {/* Location Section */}
            <Grid container container direction='column' className={classes.bioSection}>
                <Typography variant='h8'>{location}</Typography>
            </Grid>

            {/* Email and Verified Section */}
            <Grid item className={classes.bioSection}>
                    <Typography variant='h8'>{email}</Typography>
            </Grid>
            <Grid item className={classes.bioSection}>
                    <Typography variant='h8'>{verified}</Typography>
            </Grid>

            {/* Edit, Fullow, Unfollow Button Section */}


            <div>
            <Button variant='contained' className={classes.editFollowUnfollowButton} onClick={goHome}>
                Back
            </Button>
            </div>


            {setButtons()}

            </Grid>

            {/* Updates Section */}
            <Grid container className={classes.updateSection}>
            
            
            </Grid>
        </div>
    );

};
export default UserProfile;