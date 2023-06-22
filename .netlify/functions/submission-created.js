const PDFPrinter = require('pdfmake');
const { google } = require('googleapis');


exports.handler = async function (event, context) {
  console.log(JSON.parse(event.body));

  const client = await google.auth.getClient({
    credentials: JSON.parse(process.env.GDRIVE_CREDENTIALS),
    scopes: 'https://www.googleapis.com/auth/drive.file',
  })

  const drive = google.drive({
    version: 'v3',
    auth: client,
  })

  const result = await drive.files.create({
    requestBody: {
      name: `form-submission-${(new Date()).toString()}.json`,
      mimeType: 'text/json',
      parents: [
        // Folder ID of the Google Drive Share
        // https://drive.google.com/drive/folders/{FOLDER_ID}
        process.env.GDRIVE_FOLDER_ID
      ],
    },
    media: {
      mimeType: 'text/json',
      body: JSON.stringify(event),
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {
      "content-type": "text/json"
    }
  };
};

