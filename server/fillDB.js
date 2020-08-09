import mongoose from 'mongoose';
import User from './database/UserSchema.js';
import Event from './database/EventSchema.js';
import Post from './database/PostSchema.js';
import path from 'path';
import * as fs from 'fs';

//Connects to the mongo database as soon as the server starts up.
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/AA_DB';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const __dirname = path.resolve();

//Handle Errors
function handleError(err,res) {
    if (res)
        res.send(err);
    else
        throw err;
}

/*
//Deletes all entries. Basically a reset, just used for testing purposes at the moment.
User.deleteMany({}, (err) => {
    if (err) throw err;
});
*/
Post.deleteMany({}, (err) => {
    if (err) throw err;
});
/*
//Reads the Filler Users json and puts in all of us for testing purposes.
fs.readFile('server/database/FillerUsers.json', 'utf8', (err, data) => {
    if (err) throw err;
    let userData = JSON.parse(data);

    userData.entries.forEach(element => {
        var thing = new User({username:element.username, email:element.email, password:element.password, firstName:element.firstName, lastName:element.lastName, bio:element.bio, location:element.location, organizer:element.organizer, authLevel:element.authLevel});
        thing.save(function (err) {
            if (err) {
              return handleError(err);
            }
        })
    }, () => {
        mongoose.connection.close();
    });
});
*/
fs.readFile('server/database/fillerEvents.json', 'utf8', (err, data) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    
    //Reset
    Event.deleteMany({}, (err) => {
        if (err) throw err;
    });
    
    console.log("Filling EventDB")
    if (err) throw err;
    let eventData = JSON.parse(data);

    eventData.entries.forEach(element => {
        var thing = new Event({summary:element.summary, address:element.address, coordinates:element.coordinates, date:element.date, description:element.description});
    thing.save(function (err) {
            if (err) {
              throw err;
            }
        })
    }, () => {
        mongoose.connection.close();
    });
});
    

fs.readFile('server/database/FillerPosts.json', 'utf8', (err, data) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    if (err) throw err;
    let postData = JSON.parse(data);

    postData.posts.forEach(element => {
        var thing = new Post({
            poster: element.poster,
            posterID: element.posterID,
            icon: element.icon,
            title: element.title,
            donationLink: element.donationLink,
            organizationLink: element.organizationLink,
            description: element.description,
            time: element.time,
            address: element.address,
            isEvent: element.isEvent
        });
        thing.save(function (err) {
            if (err) {
              throw err;
            }
        })
    }, () => {
        mongoose.connection.close();
    });
});