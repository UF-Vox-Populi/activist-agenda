import Axios from 'axios';

export function checkUser(username, password) {

    let reqs = {
        method: 'GET',
        url: "http://localhost:5000/userCheck/",
        params: {
            user: username,
            pass: password
        }
    }
    
    return Axios(reqs).then(res => {
        return res.data;
    })

}

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