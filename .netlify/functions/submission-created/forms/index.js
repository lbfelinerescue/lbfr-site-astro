const PDFPrinter = require("pdfmake");

const fonts = {
    Courier: {
      normal: 'Courier',
      bold: 'Courier-Bold',
      italics: 'Courier-Oblique',
      bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
      normal: 'Symbol'
    },
    ZapfDingbats: {
      normal: 'ZapfDingbats'
    }
};

const FORM_TEMPLATES = {
  'contact': require('./templates/contact.js'),
  'volunteer': require('./templates/volunteer.js'),
  'adoption': require('./templates/adoption.js'),
  'foster': require('./templates/foster.js'),
  'default': require('./templates/default.js'),
};

async function getPDF(Template, data) {
    const printer = new PDFPrinter(fonts);
  
    const pdfFile = printer.createPdfKitDocument(
        Template(data)
    );
    return new Promise((accept, reject) => {
      let chunks = [];
      pdfFile.end();
  
      pdfFile.on("data", chunk => {
        chunks.push(chunk);
      });
  
      pdfFile.on("end", () => {
        const result = Buffer.concat(chunks);
        accept(result)
      });
    });
}

async function getForm(formName, data) {
    const Template = FORM_TEMPLATES[formName] || FORM_TEMPLATES['default'];
    return getPDF(Template, data);
}

module.exports = {
    getForm
};
