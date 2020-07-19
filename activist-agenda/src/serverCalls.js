import Axios from 'axios';

/*
This is essentially where all calls to the Express server can be made.
It's best used for accessing the database, but can also run all sorts of code where needed.

NOTE: Need to adjust urls to an input from the config file.
*/

//Checks if a user exists based on their email and password.
export function checkUser(email, password) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:/userCheck/",
        params: {
            mail: email,
            pass: password
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Gets a user's info from their username and password
export function getUser(username, password) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/userGet/",
        params: {
            user: username,
            pass: password
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Checks if a username is available
export function checkUsername(username) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/usernameCheck/",
        params: {
            user: username
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//checks if an email is already being used.
export function checkEmail(email) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/emailCheck/",
        params: {
            address: email
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//adds a user entry to the database.
export function addUser(username, password, email, firstName, lastName) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/addUser/",
        params: {
            user: username,
            pass: password,
            address: email,
            first: firstName,
            last: lastName
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Get's a user's id from inputting their email.
export function getUserIDbyEmail(email) {
    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/userIDGet/",
        params: {
            email: email
        }
    }
    return Axios(reqs).then(res => {
        return res.data;
    })
}