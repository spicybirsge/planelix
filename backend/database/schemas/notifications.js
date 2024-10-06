const mongoose = require("mongoose")

const notifications = new mongoose.Schema({
    _id: String,
    user_id: String,
    content: String,
    icon_url: String,
    link: String,
    is_read: Boolean
})

module.exports = mongoose.model('Notifications', notifications)