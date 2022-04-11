const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const fs = require('fs/promises')
const handlebars = require('handlebars')

const client_ID = '263169478503-dajgk2tbveuoij028f1d7gv8uvmmnr1q.apps.googleusercontent.com'
const client_secret = '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'
const redirect_URI = 'https://developers.google.com/oauthplayground/'
const refresh_token = '1//04YXwduuzFRZECgYIARAAGAQSNwF-L9IraAVG7ZwOmuK6Sw2y-7qmwMoQrOxR5tbGJp5dB9EQbFvRoECOJdmA3tOXp7bIS3lnKNA'

const o_auth2_client = new google.auth.OAuth2(client_ID, client_secret, redirect_URI);
o_auth2_client.setCredentials({refresh_token: refresh_token});

function generateCode(){
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var x = 0; x < 6; x++){
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const code = generateCode();

function returnCode(code){
    return code;
}

// method to send the email
async function sendEmail(reciever){
    try {
        const access_token = await o_auth2_client.getAccessToken();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'instantutor.webservices@gmail.com',
                clientId: client_ID,
                clientSecret: client_secret,
                refreshToken: refresh_token,
                accessToken: access_token,
                expires: 1484314697598
            }
        });

        const mail_options = {
            from: 'Instantutor Admin <instantutor.webservices@gmail.com>', 
            to: reciever, 
            subject: "Error", 
            html: "This is an error message"
        };

        const data = await fs.readFile("content.html", {encoding: 'utf-8'});

        var template = handlebars.compile(data);
        var replacements = {
            webcode: code
        };

        mail_options.subject = 'Email verification';
        mail_options.html = template(replacements);

        console.log(mail_options);

        const email = await transporter.sendMail(mail_options);
        return [email, replacements];

    } catch(error) {
        console.log(error);
        return error;
    }
}

//sendEmail('fuentd@rpi.edu').then(result => console.log('Email:', result)).catch(error => console.log(error.message));

module.exports ={
    returnCode, generateCode, sendEmail
}