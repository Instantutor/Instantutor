const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const client_ID = '263169478503-dajgk2tbveuoij028f1d7gv8uvmmnr1q.apps.googleusercontent.com'
const client_secret = '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'
const redirect_URI = 'https://developers.google.com/oauthplayground/'
const refresh_token = '1//04YXwduuzFRZECgYIARAAGAQSNwF-L9IraAVG7ZwOmuK6Sw2y-7qmwMoQrOxR5tbGJp5dB9EQbFvRoECOJdmA3tOXp7bIS3lnKNA'

const o_auth2_client = new google.auth.OAuth2(client_ID, client_secret, redirect_URI);
o_auth2_client.setCredentials({refresh_token: refresh_token});

const admin_email = 'instantutor.webservices@gmail.com';
const user_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const user_name = 'zhi';

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
                user: admin_email,
                clientId: client_ID,
                clientSecret: client_secret,
                refreshToken: refresh_token,
                accessToken: access_token,
                expires: 1484314697598
            }
        });

        const mail_options = {
            from: 'User Contact from '+user_name+'<'+admin_email+'>',
            to: reciever,
            subject: 'User Contact',
            html: '<body>This is a message from '+user_name+',<br>'+user_text
        };

        const email = await transporter.sendMail(mail_options);
        return email

    } catch(error) {
        return error;
    }
}

sendEmail(reciever = admin_email).then(result => console.log('Email:', result)).catch(error => console.log(error.message));
