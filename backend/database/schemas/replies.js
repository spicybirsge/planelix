const mongoose = require("mongoose")

const replies = new mongoose.Schema({
    _id: String,
   user_id: String,
   content: String,
   createdAt: Number,
   replied_to: String //post Id reply Id

}) 

module.exports = mongoose.model('Replies', replies)

