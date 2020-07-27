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
        url: "http://localhost:5000/userCheck/",
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

export function getEvents() { //might want to filter from here
    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/getEvents/",
        // params could be filtering data
    }
    return Axios(reqs).then(res => {
        return res.data;
    })
//Changes an entry's username
export function changeUsername(_id, username) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/usernameChange/",
        params: {
            user: username,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes an entry's password
export function changePassword(_id, password) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/passwordChange/",
        params: {
            pass: password,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes an entry's email
export function changeEmail(_id, email) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/emailChange/",
        params: {
            mail: email,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes an entry's first name
export function changeFirstName(_id, firstName) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/firstChange/",
        params: {
            first: firstName,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes an entry's last name
export function changeLastName(_id, lastName) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/lastChange/",
        params: {
            last: lastName,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Adds a post to the database
export function addPost(poster, icon, title, description, time, location, donationLink, organizationLink) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/addPost/",
        params: {
            poste: poster,
            ico: icon,
            titl: title,
            desc: description,
            tim: time,
            loc: location,
            donation: donationLink,
            organization: organizationLink
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Retrieves all posts from the database
export function getAllPosts() {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/getAllPosts/",
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}


//Retrieves news in json format
export function getNews(tags) {

    let searchWords = 'q=';
    var x;

    for (x = 0; x < tags.length; x++) {
        searchWords +=  '+' + tags[x];
    }
    
    console.log(searchWords);

    var url = 'http://newsapi.org/v2/everything?' +
        searchWords + '&' +
        'sortBy=publishedAt&' +
        'language=en&' +
        'apiKey=8d3338893f324fa3934af0ce26e695ca';

    var req = new Request(url);

    return fetch(req).then(function(response) {
        return response.json();
    })

}