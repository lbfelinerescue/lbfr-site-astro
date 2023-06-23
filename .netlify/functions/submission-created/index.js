const { getForm } = require('./forms/index.js');
const { google } = require('googleapis');
const { Readable } = require('stream');

function bufferToReadableStream(buffer) {
  const readable = new Readable()
  readable._read = () => { } // _read is required but you can noop it
  readable.push(buffer)
  readable.push(null)
  return readable;
}

exports.handler = async function (event, context) {
  const formBody = JSON.parse(event.body);
  const payload = formBody.payload;

  const formData = payload.data;
  const formName = payload.form_name;
  const formFileName = `form-submission-${formName}-${(new Date()).toString()}`;

  const client = await google.auth.getClient({
    credentials: JSON.parse(process.env.GDRIVE_CREDENTIALS),
    scopes: 'https://www.googleapis.com/auth/drive.file',
  })

  const drive = google.drive({
    version: 'v3',
    auth: client,
  })

  console.log(formName);
  console.log(formFileName);
  console.log(formBody);


  const jsonResult = await drive.files.create({
    requestBody: {
      name: `${formFileName}.json`,
      mimeType: 'text/json',
      parents: [
        // Folder ID of the Google Drive Share
        // https://drive.google.com/drive/folders/{FOLDER_ID}
        process.env.GDRIVE_FOLDER_ID
      ],
    },
    media: {
      mimeType: 'text/json',
      body: event.body,
    },
  });

  const pdfResult = await drive.files.create({
    requestBody: {
      name: `${formFileName}.pdf`,
      mimeType: 'application/pdf',
      parents: [
        // Folder ID of the Google Drive Share
        // https://drive.google.com/drive/folders/{FOLDER_ID}
        process.env.GDRIVE_FOLDER_ID
      ],
    },
    media: {
      mimeType: 'application/pdf',
      body: bufferToReadableStream(await getForm(formName, formData)),
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {
      "content-type": "text/json"
    }
  };
};