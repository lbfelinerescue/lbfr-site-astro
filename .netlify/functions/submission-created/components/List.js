module.exports = function List ({ items }) {
    let listData;
    if ( typeof items === 'string') {
      listData = [ items ];
    } else {
      listData = items;
    }
    let listElem = {
        ul: listData.map(e => ({
            text: e, indent: 30
        }))
    };

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
