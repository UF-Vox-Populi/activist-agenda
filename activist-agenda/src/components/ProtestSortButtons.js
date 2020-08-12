import React from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles((theme) => ({
    // Nothing here for now
}));

const ProtestSortButtons = () => {
    const classes = useStyles();
    const [sortBy, setSortBy] = React.useState('');
  
    const handleSortBy = (event, newSortBy) => {
        setSortBy(newSortBy);
    };
  
    return (
        <div>
            <ToggleButtonGroup
                value={sortBy}
                exclusive={true}
                onChange={handleSortBy}
                aria-label="sort by"
                size="small"
            >
                <ToggleButton value="Upcoming" aria-label="sort by upcoming">
                    <DateRangeIcon fontSize="small" color="primary"/>Upcoming
                </ToggleButton>
                <ToggleButton value="location" aria-label="sort by location">
                    <LocationOnIcon fontSize="small" color="primary"/>Location
                </ToggleButton>
                <ToggleButton value="top" aria-label="sort by top">
                    <WhatshotIcon fontSize="small" color="primary"/>Top
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default ProtestSortButtons;
