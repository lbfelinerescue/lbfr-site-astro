const {
    Heading,
    Paragraph,
    LineBreak,
    DataTable,
    List,
    Image,
    HorizontalRule,
} = require('../../components');

function VolunteerTemplate(userData) {
    return {
        content: [
            Heading({ kind: 'h2', text: 'About You' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Name', value: userData['applicant-name'] },
                    { key: 'Occupation', value: userData['applicant-occupation'] },
                    { key: 'Email', value: userData['applicant-email'] },
                    { key: 'Phone Number', value: userData['applicant-phone'] },
                ]
            }),
            LineBreak(),
            
            Heading({ kind: 'h3', text: 'What is the best time to call you?' }),
            LineBreak(),
            Paragraph({ text: userData['best-time-to-call'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Residence Info' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Street Address', value: userData['applicant-address'] },
                    { key: 'City', value: userData['applicant-city'] },
                    { key: 'State', value: userData['applicant-state'] },
                    { key: 'Zip Code', value: userData['applicant-zip-code'] },
                ]
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'How long have you lived at this address?' }),
            LineBreak(),
            Paragraph({ text: userData['how-long-at-address'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Areas of Interest' }),
            LineBreak(),
            List({
                items: userData['areas-of-interest-volunteer']
            }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'Additional areas of interest' }),
            LineBreak(),
            Paragraph({ text: userData['volunteer-additional-interests'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Additional Info' }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'How many hours per month are you available?' }),
            LineBreak(),
            Paragraph({ text: userData['volunteer-hours-available'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please list any skills or experience that may be useful.' }),
            LineBreak(),
            Paragraph({ text: userData['volunteer-special-skills'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please list any limitations you may have.' }),
            LineBreak(),
            Paragraph({ text: userData['volunteer-limitations'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Signature' }),
            LineBreak(),
            Paragraph({ text: `I have read the above information carefully and have filled out this application honestly. I release Long Beach Felines from any liability and/or responsibility from any damage a cat may cause me during my volunteering duties.\n\nThis application becomes part of our contract.`}),
            LineBreak(),
            Paragraph({ text: userData['signature-date'] }),
            LineBreak(),
            Image({
                data: userData['signature']
            }), 
        ],

        defaultStyle: {
            font: 'Helvetica'
        }
    }
}

module.exports = VolunteerTemplate;
