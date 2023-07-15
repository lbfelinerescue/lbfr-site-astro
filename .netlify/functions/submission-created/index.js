const { getForm } = require('./forms/index.js');
const { bufferToReadableStream, getDriveClient, writeFileToDrive, getDestinationFolderID } = require('./lib.js');

exports.handler = async function (event, context) {
  const formBody = JSON.parse(event.body);
  const payload = formBody.payload;

  const formData = payload.data;
  const formName = payload.form_name;
  const formFileName = `form-submission-${formName}-${(new Date()).toString()}`;

  console.log(formName);
  console.log(formFileName);
  console.log(formBody);

  const drive = await getDriveClient();

  const jsonResult = await writeFileToDrive(drive, {
    requestBody: {
      name: `${formFileName}.json`,
      mimeType: 'text/json',
      parents: [
        getDestinationFolderID(formName)
      ],
    },
    media: {
      mimeType: 'text/json',
      body: event.body,
    },
  });

  const pdfResult = await writeFileToDrive(drive, {
    requestBody: {
      name: `${formFileName}.pdf`,
      mimeType: 'application/pdf',
      parents: [
        getDestinationFolderID(formName)
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