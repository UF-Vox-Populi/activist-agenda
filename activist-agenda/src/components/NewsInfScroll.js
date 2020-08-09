import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "./NewsCard";

var calls = require('../serverCalls');

const InfScroll = () => {
    const [displayed, setDisplayed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        calls.getNews(['blacklivesmatter', 'protest']).then(out => {
            let newPosts = [];

            console.log(out);

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

    return (
        <div>
            <InfiniteScroll
                dataLength={displayed.length}
                next={loadMorePosts}
                hasMore={hasMore}
                scrollThreshold={0.8}
                loader={<p style={{ textAlign: "center" }}><CircularProgress/></p>}
                endMessage={<p style={{ textAlign: "center" }}>Loaded all posts!</p>}
            >
                {displayed}
            </InfiniteScroll>
        </div>
    );
}

export default InfScroll;