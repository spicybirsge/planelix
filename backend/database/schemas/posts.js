const mongoose = require("mongoose")

const posts = new mongoose.Schema({
    _id: String,
    caption: String,
    attachments: Array,
    likes: Array,
    edited: Boolean,
    createdAt: Number,
    category: String, //take-off, landing, flying
    vehicle_type: String, //helicopter, fighter jet, passenger airplane, cargo airplane, plane

}) 

module.exports = mongoose.model('Posts', posts)

