const { getForm } = require('./forms/index.js');
const { bufferToReadableStream, getDriveClient, writeFileToDrive, getDestinationFolderID, sendMail } = require('./lib');

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

  const pdfFile = await getForm(formName, formData);
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
      body: bufferToReadableStream(pdfFile),
    },
  });

  const sendMailResult = await sendMail({
    to: formData['contact-email'],
    from: process.env.SENT_FROM_EMAIL,
    subject: `Submission for ${formName} from ${formData['contact-name']} `,
    text: `
    Hello ${formData['contact-name']},
    
    We have received your submission. We will follow up with you in 5 business days.`,
    attachments: [
      {
        content: pdfFile.toString('base64'),
        filename: 'submission.pdf',
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ],
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      event,
      sendMailResult,
    }),
    headers: {
      "content-type": "text/json"
    }
  };
};