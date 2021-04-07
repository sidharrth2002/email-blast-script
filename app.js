/*
Sidharrth Nagappan
*/

require('dotenv').config()
const Papa = require('papaparse')
const fs = require('fs');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENTID,
    process.env.CLIENTSECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

//configure nodemailer and set up transporter
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport(
    {
        pool: true,
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SENDER_ADDRESS,
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
        debug: true,
        tls: {
            rejectUnauthorized: false
        }
    }
);


//custom send email function that takes in options
const sendEmail = (options, closeConnection) => {
    console.log('Sending...');
    transporter.sendMail(options, (err, info) => {
        if(err) {
            //logs the error
            console.log(err);
            console.log(options.to);
        }
        else {
            //if successful, prints out email
            console.log(options.to + ' ✅');
        }
        if (closeConnection) {
            transporter.close();
        }
    })
}

//parses the html
fs.readFile('./email.html', 'utf8', function (err, emailTemplate){
    if (err) {
        return console.log(err);
    }

    //read the mailing list
    const file = fs.createReadStream('mailinglist.csv');
    Papa.parse(file, {
	complete: function(results) {
        mailingList = results.data.map(row => row[0])
        mailConfig = mailingList.map((email) => {
            return {
                from: {
                    name: process.env.SENDER_NAME,
                    address: process.env.SENDER_ADDRESS
                },
                to: email,
                subject: "<Subject Goes Here>",
                html: emailTemplate,
                attachments: [
                    //attachments here    
                ]
            }
        });
        //sends the email to each person
        mailConfig.forEach(async (options) => {
            if(mailConfig.indexOf(options) == mailConfig.length - 1) {
                //close connection if this is the last email
                sendEmail(options, true)
            } else {
                sendEmail(options, false)
            }
        });
	}
});
});

//if idle for too long, close the transporter
transporter.on('idle', () => {
    transporter.close;
});