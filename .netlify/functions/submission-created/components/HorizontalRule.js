module.exports = function HorizontalRule () {
    return {
      canvas: [{
        type: 'line',
        x1: 0,
        y1: 5,
        x2: 595-2*40,
        y2: 5,
        lineWidth: 1
      }]
    };
}
