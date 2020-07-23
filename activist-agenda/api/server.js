import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config.js';
import User from './database/UserSchema.js';
import * as fs from 'fs';

//Connects to the mongo database as soon as the server starts up.
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

function handleError(err,res) {
    if (res)
        res.send(err);
    else
        throw err;
}

//Deletes all entries. Basically a reset, just used for testing purposes at the moment.
User.deleteMany({}, (err) => {
    if (err) throw err;
});

//Reads the Filler Users json and puts in all of us for testing purposes.
fs.readFile('./database/FillerUsers.json', 'utf8', (err, data) => {
    if (err) throw err;
    let userData = JSON.parse(data);

    userData.entries.forEach(element => {
        var thing = new User({username:element.username, email:element.email, password:element.password, firstName:element.firstName, lastName:element.lastName});
        thing.save(function (err) {
            if (err) {
              return handleError(err);
            }
        })
    }, () => {
        mongoose.connection.close();
    });
});

//This is needed to run the Express app.
const app = express();

//This apparently helps transfer values.
app.use(cors());

/*
Okay so, explanation for the following:

The Express server runs on the local host, and handles things via requests to specific urls with that host.
The functions below check for calls to specific extensions, and so far this seems to be the best way to differentiate between calls.
Essentially, back on the React server, serverCalls.js sends a request to the express server via Axios, which gets handled below.

So if you want to do anything with the mongo database via code, you gotta do it here.
Or in another file that this file then references, but I've found that here works really well.

serverCalls.js can send parameters, which can be accessed through calling req.queries.
This file can also send back a response, using res.send(), followed by the data you want to send back.
*/

//Default, just used for some testing atm.
app.get("/", (req, res) => {
    res.send(true);
});
  
//Checks if a user is in the database. False if no, True if yes.
app.get("/userCheck", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true}); //Far as I can tell, you have to reconnect each time.

    User.find({email: req.query.mail, password: req.query.pass}, function (err, docs) {
        if (err) return handleError(err,res); //This will return it to the Express server, which you can read on your terminal.

        if (JSON.stringify(docs) === '[]') { //Basically checks if it's empty.
            res.send(false);
        }
        else res.send(true);
    })

});

//Retrieves a user's information from the database.
app.get("/userGet", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.findOne({username: req.query.user, password: req.query.pass}, function (err, docs) {
        if (err) return handleError(err,res);

        res.send(docs); //Just the regular mongoose commands package the info, which can then be sent back.
    })

});

//Checks if a username is already taken. Very similar to checkUser. False if no, True if yes.
app.get("/usernameCheck", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    // find is case insensitive
    User.find({username: {$regex:req.query.user,$options: 'i'}}, function (err, docs) {
        if (err) return handleError(err,res);

        if (JSON.stringify(docs) === '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

//Same but for email. False if no, True if yes.
app.get("/emailCheck", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    //email is stored as lower case already, but case insensitive just in case
    User.find({email: {$regex:req.query.address,$options: 'i'}}, function (err, docs) {
        if (err) return handleError(err,res);

        if (JSON.stringify(docs) === '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

//Adds a user to the database. NOTE: THIS DOES NOT AUTOMATICALLY CHECK FOR DUPLICATES. Returns false if not added, true if added.
app.get("/addUser", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    var newEntry = new User({username: req.query.user, password: req.query.pass, email: req.query.address, firstName: req.query.first, lastName: req.query.last})
    newEntry.save((err) => {
        if (err) {
            res.send(false);
            handleError(err,res);
        } else {
            res.send(true);
        }
    });
    
});

//Reads the given email and returns the corresponding entry's id.
app.get("/userIDGet", (req, res) => {
    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    User.findOne({email: req.query.email}, function (err, docs) {
        if (err) return handleError(err,res);
        res.send(docs._id);
    })
});

//Basically sets the server up to listen for any inputs from serverCalls.js and the like.
app.listen(config.port, () => console.log(`App now listening on port ${config.port}`));