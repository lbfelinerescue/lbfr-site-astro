module.exports = function DataTable ({ data }) {
    return { 
        layout: 'noBorders',
        table: {
            headerRows: 1,
            widths: [100, '*' ],
            border: 0,
    
            body: data.map( ({key, value}) => [
                { text: key, bold: true }, value
            ])
          }
    };
}