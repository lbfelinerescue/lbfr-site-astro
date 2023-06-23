module.exports = function Image ({ data, width, height }) {
    return { 
        image: data,
        width: width || 6 * 72
    };
}
