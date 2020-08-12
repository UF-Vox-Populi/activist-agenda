import Axios from 'axios';

/*
This is essentially where all calls to the Express server can be made.
It's best used for accessing the database, but can also run all sorts of code where needed.

NOTE: Need to adjust urls to an input from the config file.
*/

//Checks if a user exists based on their email and password.

const baseUrl = process.env.BASE_URL; // || "http://localhost:5000";

export function checkUser(email, password) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/userCheck/",
        params: {
            mail: email,
            pass: password
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Gets a user's info from their id number
export function getUser(_id) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/userGet/",
        params: {
            id: _id
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
        url: baseUrl+"/api/usernameCheck/",
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
        url: baseUrl+"/api/emailCheck/",
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
        url: baseUrl+"/api/addUser/",
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
        url: baseUrl+"/api/userIDGet/",
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
        url: baseUrl+"/api/getEvents/",
        // params could be filtering data
    }
    return Axios(reqs).then(res => {
        return res.data;
    })
}
//Changes an entry's username
export function changeUsername(_id, username) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/usernameChange/",
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
        url: baseUrl+"/api/passwordChange/",
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
        url: baseUrl+"/api/emailChange/",
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
        url: baseUrl+"/api/firstChange/",
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
        url: baseUrl+"/api/lastChange/",
        params: {
            last: lastName,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes an entry's bio
export function changeBio(_id, bio) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/bioChange/",
        params: {
            biography: bio,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes an entry's location
export function changeLocation(_id, location) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/locationChange/",
        params: {
            loc: location,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Changes a user's auth level
export function changeAuth(_id, newAuth) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/authChange/",
        params: {
            auth: newAuth,
            id: _id
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Adds a post to the database
export function addPost(isEvent, poster, posterID, icon, title, address, time, description, donationLink, organizationLink, coordinates) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/addPost/",
        params: {
            event: isEvent,
            poste: poster,
            posteID: posterID,
            ico: icon,
            titl: title,
            location: address,
            tim: time,
            desc: description,
            donation: donationLink,
            organization: organizationLink,
            coords: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            }
        }
    }

    console.log(reqs.params.coords.latitude);
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Retrieves Organizers
export function getAllOrgs() {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/getAllOrgs/",
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

//Retrieves all posts from the database
export function getAllPosts() {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/getAllPosts/",
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })
}

export function createToken(ID_, emailToken_) {
    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/createToken/",
        params: {
            ID: ID_,
            emailToken: emailToken_,
        }
    }

    return Axios(reqs).then(res => {
        return res.data;
    })
}

export function updatePasswordToken(ID_, passwordToken_) {
    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/updatePasswordToken/",
        params: {
            ID: ID_,
            passwordToken: passwordToken_,
        }
    }

    return Axios(reqs).then(res => {
        return res.data;
    })
}

export function verifyEmail(ID_, emailToken_) {
    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/verifyEmail/",
        params: {
            ID: ID_,
            emailToken: emailToken_,
        }
    }

    return Axios(reqs).then(res => {
        return res.data;
    })
}

export function verifyPassToken(ID_, passwordToken_) {
    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/verifyPassToken/",
        params: {
            ID: ID_,
            passwordToken: passwordToken_,
        }
    }

    return Axios(reqs).then(res => {
        return res.data;
    })
}

//Retrieves all posts from the database
export function getEventPosts() {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/getEventPosts/",
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

export function getOtherPosts() {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/getOtherPosts/",
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

export function addSupport(ID, currUser) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/addSupport/",
        params: {
            id: ID,
            user: currUser
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

export function removeSupport(ID, currUser) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/removeSupport/",
        params: {
            id: ID,
            user: currUser
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

export function addFlag(ID) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/addFlag/",
        params: {
            id: ID
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

export function removeFlag(ID) {

    let reqs = {
        method: 'GET',
        url: baseUrl+"/api/removeFlag/",
        params: {
            id: ID
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}