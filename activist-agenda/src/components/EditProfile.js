import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import theme from '../theme.js';
import { height } from '@material-ui/system';

import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';

var calls = require('../serverCalls');


const palette = theme.palette;

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.info.main,
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submitButton: {
        margin: theme.spacing(2, 0, 4),
    }
}));

const EditProfile = (props) => {

    const classes = useStyles();
    const { window } = props;
    const cookie = new Cookies();
    const history = useHistory();

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    
    const userID = cookie.get('authedUser');    

    const alterFirstName = () => {
        if (first != '') {
            calls.changeFirstName(userID, first);
        }
    }

    const alterLastName = () => {
        if (last != '') {
            calls.changeLastName(userID, last);
        }
    }

    const alterUsername = () => {
        if (username != '') {
            calls.changeUsername(userID, username);
        }
    }

    const alterBio = () => {
        if (bio != '') {
            calls.changeBio(userID, bio);
        }
    }

    const alterLocation = () => {
        if (location != '') {
            calls.changeLocation(userID, location);
        }
    }

    const handleSubmit = () => {
        alterFirstName();
        alterLastName();
        alterUsername();
        alterBio();
        alterLocation();
        props.toggleOpen(false);
    }

    /*
    
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Username"
                                    variant="outlined"
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    autoFocus
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Grid>
                            */

    return (
        <div className={classes.paper}>
            <FormControl>
                <Container component="main" maxWidth="xs">      
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Profile        
                        </Typography>
                        <Grid container spacing={2} style = {{marginTop: theme.spacing(1)}}>
                            <Grid item xs={12}>
                                <TextField
                                    name="First Name"
                                    variant="outlined"
                                    fullWidth
                                    id="userName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(event) => setFirst(event.target.value)}
                                    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    id="userName"
                                    label="Last Name"
                                    autoFocus
                                    onChange={(event) => setLast(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Bio"
                                    variant="outlined"
                                    fullWidth
                                    id="userName"
                                    label="Bio"
                                    autoFocus
                                    multiline={true}
                                    onChange={(event) => setBio(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Location"
                                    variant="outlined"
                                    fullWidth
                                    id="userName"
                                    label="Location"
                                    autoFocus
                                    onChange={(event) => setLocation(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={classes.submitButton}
                        onClick={handleSubmit}
                        >
                        Submit
                    </Button>
                  </div>

                </Container>
            </FormControl>
        </div>
    );
};
export default EditProfile;

