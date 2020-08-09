import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardHeader from '@material-ui/core/CardHeader';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';

const NodeGeocoder = require('node-geocoder');
//https://www.npmjs.com/package/node-geocoder

const geoOptions = {
  provider: 'opencage',
 
  // Optional depending on the providers
  //fetch: customFetchImplementation,
  apiKey: 'da669438ed354fae88c82aed45a90e20', // for Mapquest, -->OpenCage<--, Google Premier
  formatter: null // 'gpx', 'string', ...
};
 
const geocoder = NodeGeocoder(geoOptions);

var calls = require('../serverCalls');

const useStyles = makeStyles({
    // Nothing here for now
});

function CreationSelectDropdown() {
    // The following hanldes the general dropdown menu options 

    const options = ['Donation', 'Petition', 'Protest']; // dropdown menu options
    const [selectedIndex, setSelectedIndex] = React.useState(2); // protest option by default
    const [open, setOpen] = React.useState(false); // determines if the dropdown menu is open
    const anchorRef = React.useRef(null); // anchors the dropdown menu right below the button
    const cookie = new Cookies(); // For getting user info when putting down a post

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    // The following handles pop up (dialogue box) when menu option button is selected

    const [dialogueOpen, setDialogueOpen] = React.useState(false);

    const handleDialogueOpen = () => {
        setDialogueOpen(true);
    };

    const handleDialogueClose = () => {
        setDialogueOpen(false);
    };

    // The following handles the character limit input for the description entry box

    const CHARACTER_LIMIT = 500;

    const [values, setValues] = React.useState({
      description: ""
    });

    const [pndVals, setPnDVals] = React.useState({
        title: '',
        link: '',
        desc: ''
    })

    const [protestVals, setProVals] = React.useState({
        title: '',
        location: '',
        date: '',
        donURL: '',
        orgURL: '',
        description: ''
    })

    const handleDescriptionChange = description => event => {
        setValues({ ...values, [description]: event.target.value });
    };

    const handlePnDChange = (num, event) => {
        switch (num) {
            case 0:
                setPnDVals({ ...pndVals, title: event.target.value })
                break;
            case 1:
                setPnDVals({ ...pndVals, link: event.target.value })
                break;
            case 2:
                setPnDVals({ ...pndVals, desc: event.target.value })
                break;
        }
    }

    const handleProtestChange = (num, event) => {
        switch (num) {
            case 0:
                setProVals({ ...protestVals, title: event.target.value })
                break;
            case 1:
                setProVals({ ...protestVals, location: event.target.value })
                //checkLocation();
                break;
            case 2:
                setProVals({ ...protestVals, date: event.target.value })
                break;
            case 3:
                setProVals({ ...protestVals, donURL: event.target.value })
                break;
            case 4:
                setProVals({ ...protestVals, orgURL: event.target.value })
                break;
            case 5:
                setProVals({ ...protestVals, description: event.target.value })
                break;
        
        }
    }

    const checkLocation = () => {
        addressValidator.validate(protestVals.location, addressValidator.match.streetAddress, function(err, exact, inexact){
            if (exact == []) {
                console.log("wrong");
            } else {
                console.log(exact);
            }
        })
    }

    const handlePnDSubmit = () => {
        if (
            pndVals.title != '' &&
            pndVals.link != '' &&
            pndVals.desc != ''
        ) {
            calls.getUser(cookie.get('authedUser')).then(out => {
                calls.addPost(false, out.username, cookie.get('authedUser'), '', pndVals.title, '', '', pndVals.desc, pndVals.link);
            })
            handleDialogueClose();
        }
    }

    const handlePost = () => {
        if (
            protestVals.title != '' &&
            protestVals.location != '' &&
            protestVals.date != '' &&
            protestVals.description != ''
            ) {
                calls.getUser(cookie.get('authedUser')).then(out => {
                    calls.addPost(true, out.username, cookie.get('authedUser'), '', protestVals.title, protestVals.location, protestVals.date, protestVals.description, protestVals.donURL, protestVals.orgURL);
                })
                handleDialogueClose();
            }
    }

    function handleDialogue () {
        // Selected DONATION option from menu
        if (selectedIndex == "0") {
            return (
                <Dialog open={dialogueOpen} onClose={handleDialogueClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">A Humble Donation</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please provide a title for the donation, a link to the source, 
                        and a short description for others to see.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handlePnDChange(0, e)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="link"
                        label="Link/URL"
                        type="text"
                        helperText="e.g. https://www.gofundme.com/"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handlePnDChange(1, e)}
                    />
                    <TextField
                        multiline 
                        required
                        rows="5"
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        inputProps={{ maxlength: CHARACTER_LIMIT }}
                        value={values.description}
                        helperText={`${values.description.length}/${CHARACTER_LIMIT}`}
                        onChange={handleDescriptionChange("description")}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handlePnDChange(2, e)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogueClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePnDSubmit} color="primary">
                        Post
                    </Button>
                    </DialogActions>
                </Dialog>
            )
        }
        // Selected PETITION option from menu
        else if (selectedIndex == "1") {
            return (
                <Dialog open={dialogueOpen} onClose={handleDialogueClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Post a Petition</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please provide a title for the petition, a link to sign, 
                        and a short description for others to see.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handlePnDChange(0, e)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Link/URL"
                        helperText="e.g. https://www.change.org/"
                        type="link"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handlePnDChange(1, e)}
                    />
                    <TextField
                        multiline 
                        required
                        rows="5"
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        inputProps={{ maxlength: CHARACTER_LIMIT }}
                        helperText={`${values.description.length}/${CHARACTER_LIMIT}`}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handlePnDChange(2, e)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogueClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePnDSubmit} color="primary">
                        Post
                    </Button>
                    </DialogActions>
                </Dialog>
            )
        }
        // Selected PROTEST option from menu
        else if (selectedIndex == "2") {
            return (
                <Dialog open={dialogueOpen} onClose={handleDialogueClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Organize a Protest</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please provide a title for the protest, date, time, location, petition link 
                        and/or donation link, and a short description for others to see.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleProtestChange(0, e)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Location"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleProtestChange(1, e)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="date and time"
                        label="Date"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleProtestChange(2, e)}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        label="Donation URL"
                        helperText="e.g. https://www.gofundme.com/"
                        type="url"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleProtestChange(3, e)}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        label="Petition URL"
                        helperText="e.g. https://www.change.org/"
                        type="url"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleProtestChange(4, e)}
                    />
                    <TextField
                        multiline 
                        required
                        rows="3"
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleProtestChange(5, e)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogueClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePost} color="primary">
                        Post
                    </Button>
                    </DialogActions>
                </Dialog>
            )
        }
    };

    return (
        <div style={{ position: 'relative', zIndex: '100' }}>
            <Grid container direction="column" alignItems="right">
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick} onClick={handleDialogueOpen}>{options[selectedIndex]}</Button>
                        <Button
                            color="primary"
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select post type"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                            top={0}
                        >
                        <ArrowDropDownIcon />
                        </Button>
                        {handleDialogue()}
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow 
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom', }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                        {option}
                                    </MenuItem>
                                    ))}
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                    </Popper>
                </Grid>
            </Grid>
        </div>
    );
};

const ContentCreationCard = (props) => {
    const classes = useStyles();
    const { avatarSrc, username, datetime, title, location, donationURL, petitionURL, description, supporters } = props;

    const cardStyle = {
        backgroundColor: '#F4F1DE',
        display: 'block',
        transitionDuration: '0.3s'
    };

    return (
        <Grid item>
            <Paper style={cardStyle}>
                <CardHeader
                    avatar={<IconButton size="small"><Avatar src={avatarSrc}/></IconButton>}
                    action={<CreationSelectDropdown/>}
                    title="Create Post"
                    subheader="User (Logged In)"
                />
            </Paper>
        </Grid>
    );
};

export default ContentCreationCard;
