import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(45),
      height: theme.spacing(25),
    },
  },
}));

const ProtestDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const togglePostDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={togglePostDrawer(anchor, false)}
      onKeyDown={togglePostDrawer(anchor, false)}
      alignItems="stretch"
    >
      <Grid 
        container 
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Paper variant="outlined" />
        <Paper variant="outlined" />
        <Paper variant="outlined" />
      </Grid>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={togglePostDrawer(anchor, true)}>{anchor}</Button>
          <Drawer 
            anchor={anchor} 
            open={state[anchor]} 
            onClose={togglePostDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProtestDrawer;
