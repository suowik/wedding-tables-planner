import SHA256 from 'crypto-js/sha256'
import globals from '../common/globals.js'
import request from 'request'

let API_URL = globals['API_URL'];


class LoggedUser {
    constructor(userId, roles, token, weddingId) {
        this.userId = userId;
        this.roles = roles;
        this.token = token;
        this.weddingId = weddingId;
    }
}

export default {
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.loggedUser) {
            if (cb) cb(true);
            this.onChange(true);
            return
        }
        login(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.loggedUser = JSON.stringify(new LoggedUser(res.userId, res.roles, res.token, res.weddingId));
                if (cb) cb(true);
                this.onChange(true)
            } else {
                if (cb) cb(false);
                this.onChange(false)
            }
        })
    },


    logout(cb) {
        delete localStorage.loggedUser;
        if (cb) cb();
        this.onChange(false)
    },

    loggedUser(){
        return JSON.parse(localStorage.loggedUser)
    },

    loggedIn() {
        return !!localStorage.loggedUser
    },

    onChange() {
    }
};

function login(login, password, cb) {
    let requestData = {
        method: 'post',
        json: true,
        body: {
            login: login,
            password: SHA256(password).toString()
        },
        url: API_URL + '/login'
    };
    request(requestData, (err, res, body) => {
        if (err) cb({authenticated: false});
        if (res.statusCode === 200 && body.success === true) {
            cb({
                authenticated: true,
                roles: body.roles,
                userId: body.userId,
                weddingId: body.weddingId,
                token: body.token
            })
        } else {
            cb({authenticated: false});
        }
    });
}