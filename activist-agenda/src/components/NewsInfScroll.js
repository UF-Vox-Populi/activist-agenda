import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "./NewsCard";
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import WhatshotIcon from '@material-ui/icons/Whatshot';
const NewsAPI = require('newsapi');

var calls = require('../serverCalls');

const InfScroll = () => {
    const [displayed, setDisplayed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const newsapi = new NewsAPI('8d3338893f324fa3934af0ce26e695ca', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });

    useEffect(() => {
        newsapi.v2.everything({
            q: 'blacklivesmatter',
            language: 'en',
            sortBy: 'publishedAt'
          }).then(out => {
            let newPosts = [];

            for (var x = 0; x < out.articles.length; x++) {
                newPosts.push(<NewsCard 
                    title={out.articles[x].title} 
                    author={out.articles[x].author} 
                    avatarSrc={out.articles[x].urlToImage} 
                    desc={out.articles[x].description} 
                    source={out.articles[x].source.name} 
                    url={out.articles[x].url} />)
            }

            if (out.length <= 5) {
                setHasMore(false);
            }

            setPosts(posts.concat(newPosts));
            setDisplayed(displayed.concat(newPosts.slice(0, 5)));
        });
    }, []);

    const loadMorePosts = () => {

        setTimeout(() => {

            if (displayed.length >= posts.length - 5) {
                setHasMore(false);
            }
        
            setDisplayed(displayed.concat(posts.slice(displayed.length, displayed.length + 5)));

        }, 2000);

    };

    const [sortBy, setSortBy] = React.useState('');
  
    const handleSortBy = (event, newSortBy) => {

        newsapi.v2.everything({
            q: 'blacklivesmatter',
            language: 'en',
            sortBy: newSortBy
          }).then(out => {
            let newPosts = [];

            for (var x = 0; x < out.articles.length; x++) {
                newPosts.push(<NewsCard 
                    title={out.articles[x].title} 
                    author={out.articles[x].author} 
                    avatarSrc={out.articles[x].urlToImage} 
                    desc={out.articles[x].description} 
                    source={out.articles[x].source.name} 
                    url={out.articles[x].url} />)
            }

            if (out.length <= 5) {
                setHasMore(false);
            }

            setPosts(posts.concat(newPosts));
            setDisplayed(displayed.filter(post => post.title !== post.title).concat(newPosts.slice(0, 5)));

            console.log(out);
            console.log(displayed);
            
        });
    };

    return (
        <div>
            <div>
            <ToggleButtonGroup
                value={sortBy}
                exclusive={true}
                onChange={handleSortBy}
                aria-label="sort by"
                size="small"
                align="center"
            >
                <ToggleButton value="publishedAt" aria-label="sort by latest">
                    <DateRangeIcon fontSize="small" color="primary"/>Latest
                </ToggleButton>
                <ToggleButton value="popularity" aria-label="sort by popular">
                    <WhatshotIcon fontSize="small" color="primary"/>Popular
                </ToggleButton>
            </ToggleButtonGroup>
            </div>
            <div>
            <InfiniteScroll
                dataLength={displayed.length}
                next={loadMorePosts}
                hasMore={hasMore}
                scrollThreshold={0.8}
                loader={<p style={{ textAlign: "center" }}><CircularProgress/></p>}
                endMessage={<p style={{ textAlign: "center" }}>Loaded all posts!</p>}
                refreshFunction={handleSortBy}
            >
                {displayed}
            </InfiniteScroll>
            </div>
        </div>
    );
}

export default InfScroll;