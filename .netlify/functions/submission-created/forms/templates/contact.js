const { Heading, Paragraph, LineBreak } = require('../../components');

function ContactTemplate(data) {
    return {
        content: [
            Heading({ kind: 'h1', text: `Contact Form Submission` }),
            Heading({ kind: 'h2', text: `From: ${data['contact-name']}` }),
            LineBreak(),
            Heading({ kind: 'h2', text: `Email: ${data['contact-email']}` }),
            LineBreak(),
            Paragraph({ text: data['contact-message'] }),
        ],

        defaultStyle: {
            font: 'Helvetica'
        }
    }
}

module.exports = ContactTemplate;