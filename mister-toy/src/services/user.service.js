import { storageService } from './async-storage.service.js'
// import axios from 'axios'
// import { httpService } from './http.service.js'


const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateBalance,
    getEmptyUser,
    save,
    addUserActivity
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname,  }) {
    const user = { username, password, fullname, score: 10000, prefs: { color: '#000000', bgColor: '#ffffff' }, activities:[] }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function updateBalance(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.balance + diff < 0) return Promise.reject('No credit')
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.balance
                })
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { 
        _id: user._id, 
        fullname: user.fullname, 
        // score: user.score,
        // prefs: {
        //     bgColor: user.prefs.bgColor,
        //     color: user.prefs.color
        // },
        // activities: user.activities
     }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyUser() {
    return { 
        username: 'adi', 
        password: '12345', 
        fullname: 'Adi Ja', 
        // balance: 0,
        // prefs: {
        //     bgColor: user.prefs.bgColor,
        //     color: user.prefs.color
        // }, 
        activities: [{txt: 'Added a Todo', at: Date.now()}]
    }
}

function save(user) {
    if (user._id) {
        return storageService.put(STORAGE_KEY, user)
            .then((user) => {
                _setLoggedinUser(user)
                return user
            })
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, user)
    }
}

function addUserActivity(activity) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            console.log('user:', user)
            if (!user._id) return Promise.reject('Not logged in')
            console.log('activity:', activity)
            console.log('user.activities:', user.activities)
            user.activities.push(activity)
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.activities
                })
        })
}