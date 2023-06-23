module.exports = function LineBreak (props) {
    let { lines } = props || {};

    return { 
        text: '\n'.repeat(lines || 1), 
        fontSize: 12,
    };
}