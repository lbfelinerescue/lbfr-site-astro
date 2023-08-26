const { json } = require('express');
const {
    Heading,
    Paragraph,
    LineBreak,
    DataTable,
    List,
    Image,
    HorizontalRule,
} = require('../../components');


function CurrentlyOwnedCatsComponent(catData) {
    return DataTable({
        data: [
            { "key": "Cat Name", "value": catData['extra-cat-name'] },
            { "key": "Age", "value": catData['extra-cat-age'] },
            { "key": "Gender", "value": catData['extra-cat-gender'] },
            { "key": "Spayed/Neutered", "value": catData['extra-cat-spayed-neutered'] },
            { "key": "Declawed?", "value": catData['extra-cat-declawed-yesno'] },
            { "key": "If declawed, where?", "value": catData['extra-cat-declawed-where'] },
            { "key": "FELV/FIV Test?", "value": catData['extra-cat-felv-fiv-tested'] },
            { "key": "FELV/FIV Result", "value": catData['extra-cat-felv-fiv-result'] },
            { "key": "Allowed Outdoors?", "value": catData['extra-cat-allowed-outdoors'] },
            { "key": "Allowed Outdoors Other", "value": catData['extra-cat-allowed-outdoors-other-description'] },
            { "key": "extra-cat-dont-still-own", "value": catData['extra-cat-dont-still-own'] },
        ]
    })
}


function CurrentlyOwnedDogsComponent(dogData) {
    return DataTable({
        data: [
            { key: 'extra-dog-name', value: dogData['extra-dog-name'] },
            { key: 'extra-dog-age', value: dogData['extra-dog-age'] },
            { key: 'extra-dog-gender', value: dogData['extra-dog-gender'] },
            { key: 'extra-dog-spayed-neutered', value: dogData['extra-dog-spayed-neutered'] },
            { key: 'extra-dog-cat-exp', value: dogData['extra-dog-cat-exp'] },
            { key: 'extra-dog-dont-still-own', value: dogData['extra-dog-dont-still-own'] },
        ]
    })
}

function VolunteerTemplate(userData) {
    const currentlyOwnedCats = (JSON.parse(userData['extra-cats-secret'])
        .map(e => [
            CurrentlyOwnedCatsComponent(e),
            HorizontalRule()
        ])
    );

    const currentlyOwnedDogs = (JSON.parse(userData['extra-dogs-secret'])
        .map(e => [
            CurrentlyOwnedDogsComponent(e),
            HorizontalRule()
        ])
    );

    return {
        content: [
            Heading({ kind: 'h2', text: 'About You' }),
            LineBreak(),
            DataTable({
                data: [
                    { key: 'Applicant Name', value: userData['applicant-name'] },
                    { key: 'Applicant Occupation', value: userData['applicant-occupation'] },
                    { key: 'Applicant Email', value: userData['applicant-email'] },
                    { key: 'Applicant Phone Number', value: userData['applicant-phone'] },
                    { key: 'Co-Applicant Name', value: userData['co-applicant-name'] },
                    { key: 'Co-Applicant Occupation', value: userData['co-applicant-occupation'] },
                    { key: 'Co-Applicant Email', value: userData['co-applicant-email'] },
                    { key: '', value: HorizontalRule() }
                ]
            }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Are you applying for a specific cat? If so, what name(s)?' }),
            LineBreak(),
            Paragraph({ text: userData['specific-cats'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Is this your first pet?' }),
            LineBreak(),
            Paragraph({ text: userData['first-pet'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Why are you looking for a cat?' }),
            LineBreak(),
            List({
                items: userData['why-looking-for-cat']
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'If as a gift, who is it for?' }),
            LineBreak(),
            Paragraph({ text: userData['describe-gift-cat'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you object to a home visit?' }),
            LineBreak(),
            Paragraph({ text: userData['home-visit'] }),
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

            Heading({ kind: 'h3', text: 'What style home is your residence?' }),
            LineBreak(),
            Paragraph({ text: userData['type-of-home'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'If other, please describe.' }),
            LineBreak(),
            Paragraph({ text: userData['describe-other-residence'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you own or rent?' }),
            LineBreak(),
            Paragraph({ text: userData['own-or-rent'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'For renters:' }),
            LineBreak(),
            Heading({ kind: 'h3', text: 'What are the rules about keeping pets?' }),
            LineBreak(),
            Paragraph({ text: userData['multi-unit-pet-rules'] }),
            LineBreak(),

            DataTable({
                data: [
                    { key: 'Landlord Name', value: userData['landlord-name'] },
                    { key: 'Landlord Phone Number', value: userData['landlord-phone'] },
                ]
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you have your landlord\'s permission to have a pet?' }),
            LineBreak(),
            Paragraph({ text: userData['pet-permission'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Cat Care' }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Who will be responsible for the cat\' care?' }),
            LineBreak(),
            Paragraph({ text: userData['who-responsible-cat'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Where will you keep the litter box?' }),
            LineBreak(),
            Paragraph({ text: userData['where-litter-box'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'About how many hours of the day will your pet be left alone?' }),
            LineBreak(),
            Paragraph({ text: userData['cat-left-alone'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Where will they be left alone? Be specific.' }),
            LineBreak(),
            Paragraph({ text: userData['where-left-alone'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What areas of the house will be off limits to the cat?' }),
            LineBreak(),
            Paragraph({ text: userData['cat-off-limits'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Where will you cat sleep at night?' }),
            LineBreak(),
            List({
                items: userData['where-cat-sleep']
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please elaborate.' }),
            LineBreak(),
            Paragraph({ text: userData['catsleep-describe'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Will your pet be allowed on the furniture?' }),
            LineBreak(),
            Paragraph({ text: userData['allowed-furniture'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please elaborate.' }),
            LineBreak(),
            Paragraph({ text: userData['describe-furniture-allowed'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you have a pet door?' }),
            LineBreak(),
            Paragraph({ text: userData['pet-door-exists'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Will your cat have access to the pet door?' }),
            LineBreak(),
            Paragraph({ text: userData['pet-door-access'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Will your cat be indoor, outdoor, or some mix?' }),
            LineBreak(),
            List({
                items: userData['indoor-or-outdoor']
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please elaborate.' }),
            LineBreak(),
            Paragraph({ text: userData['inorout-describe'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you want to declaw your cat?' }),
            LineBreak(),
            Paragraph({ text: userData['desire-declaw'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please elaborate.' }),
            LineBreak(),
            Paragraph({ text: userData['describe-declaw'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What will you do if your cat claws the drapes, furniture, or carpet?' }),
            LineBreak(),
            List({
                items: userData['catclaw']
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Please elaborate.' }),
            LineBreak(),
            Paragraph({ text: userData['catclaw-describe'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Currently Owned Cats' }),
            ...currentlyOwnedCats,
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Currently Owned Dogs' }),
            ...currentlyOwnedDogs,
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Lifestyle' }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Do you currently have a veterinarian?' }),
            LineBreak(),
            Paragraph({ text: userData['have-vet'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'If so, what is the vet\'s name and address?' }),
            LineBreak(),
            Paragraph({ text: userData['has-vet-name-addr'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'How much would you consider spending on veterinary treatment for your sick cat?' }),
            LineBreak(),
            Paragraph({ text: userData['treatment-cost'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'If other, please describe.' }),
            LineBreak(),
            Paragraph({ text: userData['describe-treatment-cost'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'Under what circumstances would you not be able to keep your new cat? Please check all that apply.' }),
            LineBreak(),
            List({
                items: userData['circumstances-question']
            }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'If other, please describe.' }),
            LineBreak(),
            Paragraph({ text: userData['circumstances-describe'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h3', text: 'If you are unable to care for your cat, what will happen to them? List names, phone numbers, and relationship to you.' }),
            LineBreak(),
            Paragraph({ text: userData['what-if-unable-to-care-for-cat'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What will you do with your cat when you go out of town?' }),
            LineBreak(),
            Paragraph({ text: userData['what-if-go-out-of-town'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What will you do with your cat if you relocate to a new residence that does not allow pets?' }),
            LineBreak(),
            Paragraph({ text: userData['what-if-relocate-new-residence'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What will you do with your cat if a new partner is allergic to cats?' }),
            LineBreak(),
            Paragraph({ text: userData['what-if-new-partner'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What will you do with your cat if you get married/divorced?' }),
            LineBreak(),
            Paragraph({ text: userData['what-if-married-divorced'] }),
            LineBreak(),

            Heading({ kind: 'h3', text: 'What length of time do you feel is reasonable for your cat to adjust to your home?' }),
            LineBreak(),
            Paragraph({ text: userData['reasonable-adjustment-time'] }),
            LineBreak(),

            HorizontalRule(),
            LineBreak(),

            Heading({ kind: 'h2', text: 'Signature' }),
            LineBreak(),
            Paragraph({ text: `I have read the above information carefully and have filled out this application honestly. I release Long Beach Felines from any liability and/or responsibility from any damage a cat may cause me during my volunteering duties.\n\nThis application becomes part of our contract.` }),
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
