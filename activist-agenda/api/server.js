import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config.js';
import User from './database/UserSchema.js';
import * as fs from 'fs';
import async from 'async';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

User.deleteMany({}, (err) => {
    if (err) throw err;
});

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

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send(true);
});
  
app.get("/userCheck", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.find({username: req.query.user, password: req.query.pass}, function (err, docs) {
        if (err) return handleError(err);

        if (JSON.stringify(docs) == '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

app.get("/userGet", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.findOne({username: req.query.user, password: req.query.pass}, function (err, docs) {
        if (err) return handleError(err);

        res.send(docs);
    })

});

app.get("/usernameCheck", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.find({username: req.query.user}, function (err, docs) {
        if (err) return handleError(err);

        if (JSON.stringify(docs) == '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

app.get("/emailCheck", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    User.find({email: req.query.address}, function (err, docs) {
        if (err) return handleError(err);

        if (JSON.stringify(docs) == '[]') {
            res.send(false);
        }
        else res.send(true);
    })

});

app.get("/addUser", (req, res) => {

    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    var newEntry = new User({username: req.query.user, password: req.query.pass, email: req.query.address, firstName: req.query.first, lastName: req.query.last})
    newEntry.save((err) => {
        if (err) {
            res.send(false);
            handleError(err);
        } else {
            res.send(true);
        }
    });
    
});

app.listen(config.port, () => console.log(`App now listening on port ${config.port}`));