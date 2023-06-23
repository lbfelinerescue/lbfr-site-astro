const {
    Heading,
    Paragraph,
    LineBreak,
    DataTable,
    List,
    Image,
} = require('../../components');

function VolunteerTemplate(data) {
    return {
        content: [
            Heading({ kind: 'h2', text: 'About You' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Name', value: 'Fake Name' },
                    { key: 'Occupation', value: 'Fake Baker' },
                    { key: 'Email', value: 'fake-name@gmail.com' },
                    { key: 'Phone Number', value: '407-474-5339' },
                ]
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What is the best time to call you?' }),
            LineBreak(),
            Heading({ kind: 'h2', text: 'Residence Info' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Street Address', value: 'Fake Address' },
                    { key: 'City', value: 'Fakes' },
                    { key: 'State', value: 'NM' },
                    { key: 'Zip Code', value: '90755' },
                ]
            }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'How long have you lived at this address?' }),
            LineBreak(),
            Heading({ kind: 'h2', text: 'Areas of Interest' }),
            LineBreak(),
            List({
                items: ['Fundraising', 'Socializing', 'Transporting']
            }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'Additional areas of interest' }),
            LineBreak(),
            Heading({ kind: 'h2', text: 'Additional Info' }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'How many hours per month are you available?' }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'Please list any skills or experience that may be useful.' }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'Please list any limitations you may have.' }),
            LineBreak(),
            Heading({ kind: 'h2', text: 'Signature' }),
            LineBreak(),
            Paragraph({
                text: `I have read the above information carefully and have filled out this application honestly. 
            I release Long Beach Felines from any liability and/or responsibility from any damage a cat may cause me
             during my volunteering duties.\n\nThis application becomes part of our contract.`}),
            LineBreak(),
            Paragraph({ text: '2023-06-13' }),
            LineBreak(),
            Image({
                data: data.signature
            }),
        ],

        defaultStyle: {
            font: 'Helvetica'
        }
    }
}

module.exports = VolunteerTemplate;
