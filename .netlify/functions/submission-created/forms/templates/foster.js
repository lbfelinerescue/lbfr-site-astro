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
            
            Heading({ kind: 'h3', text: 'What are you interested in fostering? Please check all that apply.' }),
            LineBreak(),
            List({ items: userData['foster-interests'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please list previous foster/rescue experience.' }),
            LineBreak(),
            Paragraph({ text: userData['previous-foster-experience'] }),
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

            Heading({ kind: 'h3', text: 'People living with you' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Adults', value: userData['other-residents-adults'] },
                    { key: 'Children', value: userData['other-residents-children'] },
                ]
            }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Current Pets' }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Are animals allowed in your residence?' }),
            LineBreak(),
            Paragraph({ text: userData['pet-permission'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Number of animals currently living with you:' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Cats', value: userData['current-pets-cats'] },
                    { key: 'Dogs', value: userData['current-pets-dogs'] },
                    { key: 'Other', value: userData['current-pets-other'] },
                ]
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Are your current pets vaccinations up to date?' }),
            LineBreak(),
            Paragraph({ text: userData['current-pet-vaccinations'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Are your current pets:' }),
            LineBreak(),
            Paragraph({ text: userData['current-pets-indoor-or-outdoor'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Additional Information' }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Are you able to provide food and supplies for the cat(s)?' }),
            LineBreak(),
            Paragraph({ text: userData['provide-food-and-supplies'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Have you discussed fostering with the other members of your household?' }),
            LineBreak(),
            Paragraph({ text: userData['discussed-with-household'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you have transportation?' }),
            LineBreak(),
            Paragraph({ text: userData['do-you-have-transportation'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you see any significant changes in your life in the next 6 months?' }),
            LineBreak(),
            Paragraph({ text: userData['significant-changes'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you have a room to isolate fosters initially (10 to 14 days)?' }),
            LineBreak(),
            Paragraph({ text: userData['room-for-foster-isolation'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'List limitations; if any:' }),
            LineBreak(),
            Paragraph({ text: userData['foster-limitations'] }),
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
