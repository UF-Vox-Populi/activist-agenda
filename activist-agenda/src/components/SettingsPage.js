import React, {useState} from 'react';
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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme.js';
import { height } from '@material-ui/system';
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';

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

const SettingsPage = (props) => {

    const classes = useStyles();
    const { window } = props;



    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
                </MenuList>
            </Paper>
        </div>
    );

};
export default SettingsPage;