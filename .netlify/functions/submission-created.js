const PDFPrinter = require('pdfmake');


exports.handler = async function (event, context) {
  console.log(JSON.parse(event.body));
  return {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {
      "content-type": "text/json"
    }
  };
};

