const nodemailer = require('nodemailer');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require("path");
const {REPORT_RECEIVER} = require("../constant/constant");
const env = process.env;
const {google} = require('googleapis');

const sendEmail = async (receiverEmail, emailSubject, html, res) => {
    const emailService = env.email_service;
    const senderEmail = env.sender_email;
    const clientId = env.client_id;
    const clientSecret = env.client_secret;
    const refreshToken = env.refresh_token;
    const OAuth2 = google.auth.OAuth2;

    try {
        //client_id and client_secret
        const myOAuth2Client = new OAuth2(
            clientId,
            clientSecret,
            "https://developers.google.com/oauthplayground"
        );

        myOAuth2Client.setCredentials({refresh_token: refreshToken});

        const myAccessToken = myOAuth2Client.getAccessToken()


        const transporter = nodemailer.createTransport({
            service: emailService,
            auth: {
                type: "OAuth2",
                user: senderEmail,
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: myAccessToken
            }
        });

        const mailOptions = {
            from: senderEmail,
            to: receiverEmail,
            subject: emailSubject,
            html: html,
        };

        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        let info = await transporter.sendMail(mailOptions);
        console.log(info);
        return info;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }

}

const buildVerificationEmail = (receiverFirstName, registrationLink) => {
    var subject = "[Mobilized QR Menu] Please verify your account";
    var text =
        `<p>Hi <b>${receiverFirstName}</b></p>,
    <p>Thanks for creating a Mobilized QR Menu account!</p> 
    <br>
    <p>Please click on the link below to complete the registration:</p>
    <a href="${registrationLink}">${registrationLink}</a> 
    <p style="color:red">*The URL is valid only for 48 hours from the time the email was sent.</p>
    <br>
    <p>Thank you,</p>
    <p><b>Mobilized QR Menu</b></p>
    `;
    return {subject: subject, text: text};
}

const buildResetPasswordEmail = (resetPasswordLink) => {
    var subject = "[Mobilized QR Menu] Password Recovery";
    var text = `
    <h2>Password Recovery</h2>
    <p>You recently requested password reset for account associated with this email.</p>
    <br>
    <p>Click on the <b><a href="http://${resetPasswordLink}">link</a></b> to reset your password</p>
    `;
    return {subject: subject, text: text};
}

/**
 * @param {string} data.username
 * @param {string} data.title
 * @param {string} data.reason
 * @param {string} data.acceptLink
 * @returns
 */
const sendReportEmail = (data) => {
    const html = fs.readFileSync(path.join(__dirname, '/email/report.html'));
    const template = Handlebars.compile(html.toString());
    const subject = "[Mobilized QR Menu] Report";
    const text = template(data);
    return sendEmail(REPORT_RECEIVER,subject, text);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {buildResetPasswordEmail, buildVerificationEmail, sendEmail, sendReportEmail, validateEmail};