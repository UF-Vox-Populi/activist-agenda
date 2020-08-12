import express from 'express';
import mongoose from 'mongoose';
import User from './database/UserSchema.js';
import Event from './database/EventSchema.js';
import Post from './database/PostSchema.js';
import Token from './database/TokenSchema.js';
import path from 'path';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';

//Connects to the mongo database as soon as the server starts up.
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/AA_DB';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const __dirname = path.resolve();

//Handle Errors
function handleError(err,res) {
    if (res)
        res.send(false);
    else
        throw err;
}

//Deletes all entries. Basically a reset, just used for testing purposes at the moment.
User.deleteMany({}, (err) => {
    if (err) throw err;
});

Post.deleteMany({}, (err) => {
    if (err) throw err;
});
Token.deleteMany({}, (err) => {
    if (err) throw err;
});

//Reads the Filler Users json and puts in all of us for testing purposes.
fs.readFile('server/database/FillerUsers.json', 'utf8', (err, data) => {
    if (err) throw err;
    let userData = JSON.parse(data);

    userData.entries.forEach(element => {
        var thing = new User({username:element.username, email:element.email, password:element.password, firstName:element.firstName, lastName:element.lastName, bio:element.bio, location:element.location, organizer:element.organizer});
        thing.save(function (err) {
            if (err) {
              return handleError(err);
            }
        })
    }, () => {
        mongoose.connection.close();
    });
});

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
            icon: element.icon,
            title: element.title,
            donationLink: element.donationLink,
            organizationLink: element.organizationLink,
            description: element.description,
            time: element.time,
            location: element.location
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


//This is needed to run the Express app.
const app = express();

const port = process.env.PORT || 5000;

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
app.get("/api/test", (req, res) => {
    res.send(true);
});
  
//Checks if a user is in the database. False if no, True if yes.
app.get("/api/userCheck", (req, res) => {

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}); //Far as I can tell, you have to reconnect each time.

    User.find({email: req.query.mail, password: req.query.pass}, function (err, docs) {
        if (err) return handleError(err,res); //This will return it to the Express server, which you can read on your terminal.

        if (JSON.stringify(docs) === '[]') { //Basically checks if it's empty.
            res.send(false);
        }
        else res.send(true);
    })

});

//Retrieves a user's information from the database.
app.get("/api/userGet", (req, res) => {

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.findOne({_id: req.query.id}, function (err, docs) {
        if (err) return handleError(err,res);

        res.send(docs); //Just the regular mongoose commands package the info, which can then be sent back.
    })

});

//Checks if a username is already taken. Very similar to checkUser. False if no, True if yes.
app.get("/api/usernameCheck", (req, res) => {

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    var userLower = req.query.user.toLowerCase();
    User.find({username: userLower}, function (err, docs) {
        if (err) return handleError(err,res);

        if (JSON.stringify(docs) === '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

//Same but for email. False if no, True if yes.
app.get("/api/emailCheck", (req, res) => {

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    var emailLower = req.query.address.toLowerCase();
    User.find({email: emailLower}, function (err, docs) {

        if (err) return handleError(err,res);
        
        if (JSON.stringify(docs) === '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

//Adds a user to the database. NOTE: THIS DOES NOT AUTOMATICALLY CHECK FOR DUPLICATES. Returns false if not added, true if added.
app.get("/api/addUser", (req, res) => {

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    var newEntry = new User({username: req.query.user, password: req.query.pass, email: req.query.address, firstName: req.query.first, lastName: req.query.last, emailVerified:false});
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
app.get("/api/userIDGet", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    User.findOne({email: req.query.email}, function (err, docs) {
        if (err) 
            return handleError(err,res);
        else {
            if (docs) res.send(docs._id);
            else throw 'ERROR: no matching email found in database.';
        }
    });
});

app.get("/api/getEvents", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    Event.find( function(err, docs) {
        if (err) 
            return handleError(err);
        else
            res.send(docs);
    })
});
//Edit functions send true if they worked and false if they don't
//Edits user's username
app.get("/api/usernameChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { username: req.query.user }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Edits user's password
app.get("/api/passwordChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { password: req.query.pass }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Edits user's email
app.get("/api/emailChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { email: req.query.mail }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Edits user's first name
app.get("/api/firstChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { firstName: req.query.first }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Edits user's last name
app.get("/api/lastChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { lastName: req.query.last }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Edits user's bio
app.get("/api/bioChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { bio: req.query.biography }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Edits user's location
app.get("/api/locationChange", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.updateOne({ _id: req.query.id }, { location: req.query.loc }, function (err) {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    })
});

//Stores a post into the database
app.get("/api/addPost", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    var newEntry = new Post({
        poster: req.query.poste,
        icon: req.query.ico,
        title: req.query.titl,
        description: req.query.desc,
        time: req.query.tim,
        location: req.query.loc,
        donationLink: req.query.donation,
        organizationLink: req.query.organization
    })
    newEntry.save((err) => {
        if (err) {
            res.send(false);
            handleError(err,res);
        } else {
            res.send(true);
        }
    });
});

//Retrieves posts from the database. For now it just gets all of them.
app.get("/api/getAllPosts", (req, res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    Post.find( function (err, docs) {
        if (err) throw err;
        res.send(docs);
    })
});

app.get("/api/createToken", (req,res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    var newToken = new Token({
        userID: req.query.ID,
        emailToken: req.query.emailToken,
    })

    newToken.save((err) => {
        if (err) throw err;
    });
});

app.get("/api/updatePasswordToken", (req,res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    
    Token.findOneAndUpdate({userID:req.query.ID}, {passwordToken:req.query.passwordToken}, function (err, docs) {
        if (err) throw err;
        else if (!docs) {
            console.log('Could not find or update user: ',req.query.ID);
            res.send(false);
        } else res.send(true);
    });
});

app.get("/api/verifyEmail/", (req,res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    Token.findOne({userID: req.query.ID}, (err, token_) => {
        if (err || !token_) {
            res.send(false);
        } else {
            bcrypt.compare(req.query.emailToken, token_.emailToken, (errB, result) => {
                if (errB) throw errB;
                if (result) {
                    User.findByIdAndUpdate(req.query.ID, {emailVerified:true}, (err) => {
                        if (err) handleError(err);
                    });
                    res.send(true);
                }
                else 
                    res.send(false);
            });
        }
    });
});

app.get("/api/verifyPassToken/", (req,res) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    
    Token.findOne({userID: req.query.ID}, (err, token_) => {
        if (err) throw err;
        else if (!token_) {
            console.log('Password token does not exist for user: ',req.query.ID);
            res.send(false);
        } else {
            bcrypt.compare(req.query.passwordToken, token_.passwordToken, (errBcrypt, result) => {
                if (errBcrypt) throw errBcrypt;
                if (result) {
                    res.send(true);
                }
                else 
                    res.send(false);
            });
        }
    });
});

// production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'activist-agenda/build')));
    app.get('/*', (req, res) => {    
        res.sendFile(path.join(__dirname, 'activist-agenda/build/index.html'));  
    })
}

// Uncomment for local build
app.use(express.static(path.join(__dirname, 'activist-agenda/build')));
app.get('/*', (req, res) => {   
    res.sendFile(path.join(__dirname, 'activist-agenda/build/index.html'));  
})

//Basically sets the server up to listen for any inputs from serverCalls.js and the like.
app.listen(port, () => console.log(`App now listening on port ${port}`));