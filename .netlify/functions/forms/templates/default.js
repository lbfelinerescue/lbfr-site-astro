const { Heading, Paragraph } = require('../../components');

function DefaultTemplate(data) {
    return {
        content: [
            Heading({ kind: 'h2', text: `Default Form` }),
            Paragraph({ text: 'This means the form was submitted without a valid template.' }),
            Paragraph({ text: `${data.form_name}` }),
            Paragraph({ text: JSON.stringify(data, null, 3) }),
        ],

        defaultStyle: {
            font: 'Helvetica'
        }
    }
}

module.exports = ContactTemplate;