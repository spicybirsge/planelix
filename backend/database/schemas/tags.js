const mongoose = require("mongoose")

const tags = new mongoose.Schema({
    _id: String,
    name: String,
    posts: Array,
    last_posted: Number

}) 

module.exports = mongoose.model('Tags', tags)

