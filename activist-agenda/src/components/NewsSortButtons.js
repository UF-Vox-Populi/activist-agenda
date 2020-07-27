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

//Determines how the news posts are sorted. Will need additional working later.

const NewsSortButtons = () => {
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
                <ToggleButton value="sortBy=publishedAt" aria-label="sort by latest">
                    <DateRangeIcon fontSize="small" color="primary"/>Latest
                </ToggleButton>
                <ToggleButton value="sortBy=popularity" aria-label="sort by popular">
                    <WhatshotIcon fontSize="small" color="primary"/>Popular
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default NewsSortButtons;
