module.exports = function List ({ items }) {
    let listElem = {
        ul: items.map(e => ({
            text: e, indent: 30
        }))
    };
    console.log(listElem);

    return { 
        layout: 'noBorders',
        table: {
            headerRows: 1,
            widths: [10, '*' ],
            border: 0,
            body: [['', listElem]]
        }
    };
}
