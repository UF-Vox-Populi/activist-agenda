import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import theme from '../theme.js';
import { height } from '@material-ui/system';


const palette = theme.palette;

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      submitButton: {
          marginTop: theme.spacing(2),
      },
      bioField: {
          height: 50,
      }
}));

const EditProfile = (props) => {

    const classes = useStyles();
    const { window } = props;

    return (
        <div className={classes.paper}>
            <FormControl>
                <Container component="main" maxWidth="xs">      
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Edit Profile        
                        </Typography>
                        <Grid container spacing={2} style = {{marginTop: theme.spacing(1)}}>
                            <Grid item xs={12}>
                                <TextField
                                    name="Name"
                                    variant="outlined"
                                    fullWidth
                                    id="userName"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    autoFocus
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
                                    className={classes.bioField}
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
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={classes.submitButton}
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

