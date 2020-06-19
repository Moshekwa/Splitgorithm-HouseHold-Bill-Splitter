'use strict'

const nodemailer = require('nodemailer')

module.exports = {
    welcomeMail: function (Email, Username) {
        // Welcome users with an email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: 'mysplitgorithm@gmail.com',
            to: Email,
            subject: 'Welcome to Splitgorithm',
            text: 'We are within',
            html: `<center><h1>Greetings, ${Username}, </h1><br/><br/><p>
            Welcome to Splitgorithm app. <br/>
            Your sign-up comes with services<br/>
            offered by Splitgorithm,<br/><br/><br/></center> 
            Splitgorithm Team<br/>
            Splitgorithm PTY LTD</p>`
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error has occured: ', err)
            } else {
                console.log('Email sent successefully')
            }
        })
    }
}