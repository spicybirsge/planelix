const mongoose = require("mongoose")

const accounts = new mongoose.Schema({
    _id: String,
    pid: String,
    email: String,
    username: String,
    activated: Boolean,
    last_loggedIn: {
        type: Number,
        default: null
    },
    name: String,
    followers: Array,
    following: Array,
    liked: Array,
    avatar: String,
    createdAt: Number
})

module.exports = mongoose.model('Accounts', accounts)