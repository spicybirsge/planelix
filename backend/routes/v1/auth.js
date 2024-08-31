const express = require('express');
const router = express.Router();
const accounts = require("../../database/schemas/accounts")
const reCaptchaVerify = require("../../middleware/reCaptchaVerify")
const validator = require("validator")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const sendMail = require("../../functions/sendMail")

router.post("/register", reCaptchaVerify, async (req, res) => {
  try {
    const { email, name } = req.body;

    const usernameUP = req.body.username;
    if (!email || !name || !usernameUP) {
      return res.status(400).json({ success: false, message: "username, name, email is required", code: 400 })
    }
    if (!usernameUP) {
      return res.status(400).json({ success: false, message: "username is required", code: 400 })
    }

    const username = usernameUP.toLowerCase()

    const userNameTaken = await accounts.findOne({ username: username })

    if (userNameTaken) {
      return res.status(400).json({ success: false, message: "username is taken", code: 400 })
    }

    const isEmailValid = validator.isEmail(email)

    if (!isEmailValid) {
      return res.status(400).json({ success: false, message: "invalid email", code: 400 })
    }

    const isEmailTaken = await accounts.findOne({ email: email })

    if (isEmailTaken) {
      return res.status(400).json({ success: false, message: "email is in use", code: 400 })
    }

    const userId = uuid.v4();
    const pid = uuid.v4()
    let now = Date.now()
    const user_object = {
      _id: userId,
      pid: pid,
      email: email,
      username: username,
      name: name,
      activated: false,
      followers: [],
      following: [],
      liked: [],
      avatar: null,
      createdAt: now,


    }

    await accounts.create(user_object)

    let token_data = {
      _id: userId,
      pid: pid,
      type: 'USER_ACCOUNT_LOGIN_TOKEN'
    }

    const token = jwt.sign(token_data, JWT_SECRET, { expiresIn: '2h' })

    let url = `${process.env.FRONTEND_URL}/verify?token=${token}`

    let EMAIL_CONTENT = `Hi ${name}\n\nYou just registered a new account on our planelix, to login please click on this link ${url}. If this wasn't you please ignore this message. This link will expire in 2 hours.\n\nThanks - Shaheer`


    await sendMail(EMAIL_CONTENT, `${name}, verify your planelix account`, email)


    return res.status(200).json({ success: true, message: "account created, check your email for a login link.", code: 200 })


  } catch (e) {
    console.error(e)
    return res.status(500).json({ success: false, message: "Internal server error", code: 500 })
  }
})

module.exports = router;