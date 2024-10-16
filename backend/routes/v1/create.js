const express = require('express');
const router = express.Router();
const verifyUserToken = require("../../middleware/verifyUserToken");
const posts = require("../../database/schemas/posts")
const notifications = require("../../database/schemas/notifications")
const uuid = require("uuid");


router.post("/post", verifyUserToken, async (req, res) => {
    try {
        let { caption, aircraft_model, category, attachments  } = req.body;
       
        if (!caption) {
            caption = null;
        }

        if (!aircraft_model) {
            aircraft_model = null;
        }

        if (!category) {
            category = "other"
        }

        if (category !== "take-off" && category !== "landing" && category !== 'in-sky' && category !== "other") {
            return res.status(400).json({ success: false, message: 'invalid category', code: 400 })
        }

        if (caption && caption.length > 280) {
            return res.status(400).json({ success: false, message: 'caption is too long (max: 280)', code: 400 })
        }

        if (!Array.isArray(attachments)) {
            return res.status(400).json({ success: false, message: 'attachments must be an array', code: 400 })
        }

        for (const al of attachments) {
            if (!al.startsWith("https://shaheercdn.onrender.com/")) {
                attachments = false;
                break;


            }
        }

        if(!attachments) {
           return res.status(400).json({ success: false, message: 'invalid attachment url', code: 400 })
        }

        const postId = uuid.v4()
        const currentTimeStamp = Date.now()
        const post_object = {
            _id: postId,
            user_id: req.account._id,
            caption: caption,
            attachments: attachments,
            likes: [],
            edited: false,
            createdAt: currentTimeStamp,
            category: category,
            aircraft_model: aircraft_model,
            approved: false
        }



        await posts.create(post_object);
        const followers = req.account.followers;
        followers.forEach(async (flwer) => {
            const notificationId = uuid.v4()
            await notifications.create({

                _id: notificationId,
                user_id: flwer,
                content: `${req.account.name} (@${req.account.username}) created a new post`,
                icon_url: req.account.avatar || null,
                link:`/posts/${postId}`,
                is_read: false
            })
        })
        return res.status(200).json({ success: true, message: 'post created', data: post_object, code: 200 })



    } catch (e) {
        console.error(e)
        return res.status(500).json({ success: false, message: "Internal server error", code: 500 })
    }
})

module.exports = router;