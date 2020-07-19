import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    // Nothing here for now
});

const CreateNewProtestCard = (props) => {
    const classes = useStyles();
    const { avatarSrc, host, date, protestTitle, protestLocation, description, protestorCount } = props;

    const cardStyle = {
        backgroundColor: '#F4F1DE',
        display: 'block',
        transitionDuration: '0.3s'
    };

    return (
        <Card style={cardStyle}>
            <Divider />
            <CardActionArea>
                <CardHeader
                    avatar={
                        <IconButton size="small">
                            <Avatar src={avatarSrc}/>
                        </IconButton>
                    }
                    title="Create New Post"
                />
            </CardActionArea>
        </Card>
    );
};

export default CreateNewProtestCard;
