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


//Deletes all entries. Basically a reset, just used for testing purposes at the moment.
/*User.deleteMany({}, (err) => {
    if (err) throw err;
});*/

Post.deleteMany({}, (err) => {
    if (err) throw err;
});

Event.deleteMany({}, (err) => {
    if (err) throw err;
});