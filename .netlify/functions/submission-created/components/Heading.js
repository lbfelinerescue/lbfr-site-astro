module.exports = function Heading ({ kind, text }) {
    let fontSize = ({
        h1: 24,
        h2: 18,
        h3: 14,
        h4: 12,
        h5: 10,
    })[kind] || 12;

    return { 
        text, 
        fontSize,
        bold: true
    };
}