const { Heading, Paragraph, LineBreak } = require('../../components');

function ContactTemplate(userData) {
    return {
        content: [
            Heading({ kind: 'h2', text: `From: ${userData['contact-name']}` }),
            LineBreak(),
            Heading({ kind: 'h2', text: `Email: ${userData['contact-email']}` }),
            LineBreak(),
            Paragraph({ text: `${userData['contact-message']}` }),
        ],

        defaultStyle: {
            font: 'Helvetica'
        }
    }
}

module.exports = ContactTemplate;
