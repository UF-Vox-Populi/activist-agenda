import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Events from './Events';
import Calendar from './Calendar';

const useStyles = makeStyles((theme) => ({
  list: {
    width: "1000px",
  },
  fullList: {
    width: 'auto',
  },
  calendarCardStyle: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(120),
      height: theme.spacing(50),
    },
  },
  mapCardStyle: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(120),
      height: theme.spacing(50),
    },
  },
}));

const ProtestDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const {POI} = props.POI;

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
      onClick={togglePostDrawer(anchor, true)}
      onKeyDown={togglePostDrawer(anchor, false)}
      alignItems="stretch"
    >
      <Grid 
        container 
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.calendarCardStyle}
      >
        <Card variant="outlined">
          <Calendar/>
        </Card>
      </Grid>
      <Grid 
        container 
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.mapCardStyle}
      >
        <Card variant="outlined">
          <Events focusPoint={POI}/>
        </Card>
      </Grid>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={togglePostDrawer(anchor, true)}>Calendar & Map</Button>
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
