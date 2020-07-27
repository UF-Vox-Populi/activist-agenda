import React from 'react';
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
                    <Typography variant='h6'>Name</Typography>
                </Grid>
                <Grid item className={classes.nameSection}>
                    <Typography variant='h8'>@username</Typography>
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
                <Typography variant='h8'>This is a bio.</Typography>
            </Grid>

            {/* Location Section */}
            <Grid container container direction='column' className={classes.bioSection}>
                <Typography variant='h8'>Location</Typography>
            </Grid>

            {/* Edit, Fullow, Unfollow Button Section */}

            <Button variant='contained' className={classes.editFollowUnfollowButton}>
                Edit Profile
            </Button>

            </Grid>

            {/* Updates Section */}
            <Grid container className={classes.updateSection}>
            
            
            </Grid>
        </div>
    );

};
export default UserProfile;