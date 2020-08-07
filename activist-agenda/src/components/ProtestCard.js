import React from 'react';
import ProtestDrawer from './ProtestDrawer';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    cardStyle: {
        backgroundColor: '#ffffff',
        display: 'block',
        transitionDuration: '0.3s',
    },
});

const makeProfLink = (id) => {
    return "/userprofile/" + id;
}

const ProtestCard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { avatarSrc, id, host, date, protestTitle, protestLocation, description, donLink, orgLink, protestorCount } = props;
    const profLink = makeProfLink(id);

    return (
        <Grid item>
            <Card className={classes.cardStyle}>
                {/*<CardActionArea>*/}
                    {
                        props.displayLoggedInBtns 
                        ? <CardHeader
                            avatar={
                                <IconButton size="small">
                                    <Avatar src={avatarSrc}/>
                                </IconButton>
                            }
                            action={
                                <IconButton aria-label="flag">
                                    <EmojiFlagsIcon />
                                </IconButton>
                            }
                            title={protestTitle}
                            subheader={
                                <Link href={profLink}>
                                {host}
                                </Link>
                            }
                        />
                        : <CardHeader
                            avatar={
                                <IconButton size="small">
                                    <Avatar src={avatarSrc}/>
                                </IconButton>
                            }
                            title={protestTitle}
                            subheader={host}
                        />
                    }
                    <Divider />
                    <CardContent>
                        <Typography className={classes.pos} color="textSecondary">
                            {protestLocation} | {date}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {description}<br/>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <br/>Link(s): <Link href="https://gofundme.com">Donation</Link> | <Link href="https://change.org">Petition</Link>
                        </Typography>
                        <Typography variant="body2">
                            <b>Supporters: #</b>
                        </Typography>
                        <Typography>
                            {props.displayLoggedInBtns 
                            ? <FormControlLabel
                                    control={<Checkbox style={{ color: theme.palette.error.main }} icon={<FavoriteBorder />} 
                                    checkedIcon={<Favorite />} 
                                    name="checkedH" />}
                                    label="I SUPPORT THIS" 
                            />
                            : null
                            }
                        </Typography>
                    </CardContent>
                    <Divider/>
                {/*</CardActionArea>*/}
                <CardActions>
                    <ProtestDrawer />
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProtestCard;
