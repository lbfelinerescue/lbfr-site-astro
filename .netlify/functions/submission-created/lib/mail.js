const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(msg) {
    return sgMail.send(msg)
}

module.exports = {
    sendMail
};