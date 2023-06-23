const { Heading, Paragraph, LineBreak } = require('../../components');

function ContactTemplate(data) {
    return {
        content: [
            Heading({ kind: 'h2', text: `From: ${data.name}` }),
            LineBreak(),
            Heading({ kind: 'h2', text: `Email: ${data.email}` }),
            LineBreak(),
            Paragraph({ text: data.message }),
        ],

        defaultStyle: {
            font: 'Helvetica'
        }
    }
}

module.exports = ContactTemplate;