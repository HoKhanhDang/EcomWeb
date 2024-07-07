const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const SendMail =  asyncHandler(async (email,html, title) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });
    let infor = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: title,
        html: html
    });     

    return infor;
});

module.exports = {
    SendMail
};