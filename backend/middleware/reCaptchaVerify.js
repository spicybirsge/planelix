const fetch = require("node-fetch")

const reCaptchVerify = async (req, res, next) => {
    let CAPTCHA_DISABLED = true; //set to true when api is being tested since we cannot solve captcha when testing.

    try {
        if (CAPTCHA_DISABLED) {
            console.log("Skipping reCaptcha verification since CAPTCHA_DISABLED was set to true")
            return next()
        }
        const { r_key } = req.query;

        if (!r_key) {
            return res.status(400).json({ success: false, message: "Could not verify you as human", code: 400 })
        }

        const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${r_key}`

        const request = await fetch(URL, { method: 'GET' })

        const response = await request.json()

        if (!response.success) {
            return res.status(400).json({ success: false, message: "Could not confirm that you are a human", code: 400 })
        } else {
            return next()
        }
    } catch (e) {
        console.error(e)
        return res.status(500).json({ success: false, message: "Internal server error", code: 500 })
    }
}

module.exports = reCaptchVerify;