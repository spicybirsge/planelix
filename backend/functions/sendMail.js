const nodemailer = require('nodemailer')

const sendMail = async (message, subject, reciever) => {

    if (!message) {
        throw `message is required.`
    }
    if (!subject) {
        throw `subject is required.`
    }
    if (!reciever) {
        throw `reciever is required.`
    }

    if (typeof message !== "string") {
        throw `message must be a string.`

    }

    if (typeof subject !== "string") {
        throw `subject must be a string.`
    }
    if (typeof reciever !== "string") {
        throw `reciever must be a string.`
    }


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: reciever,
        subject: subject,
        text: message
    };
    return transporter.sendMail(mailOptions)
}

module.exports = sendMail;