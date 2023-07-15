const { Readable } = require('stream');
const { google } = require('googleapis');

function bufferToReadableStream(buffer) {
  const readable = new Readable()
  readable._read = () => { } // _read is required but you can noop it
  readable.push(buffer)
  readable.push(null)
  return readable;
}

async function getDriveClient() {
  const client = await google.auth.getClient({
    credentials: JSON.parse(process.env.GDRIVE_CREDENTIALS),
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });

  return google.drive({
    version: 'v3',
    auth: client,
  });
}

async function writeFileToDrive(drive, options) {
    return drive.files.create(options);
}

function getDestinationFolderID(formName) {
  const folderMap = JSON.parse(process.env.GDRIVE_FOLDER_IDS);
  const folderId = folderMap[formName];
  
  if (!folderMap[formName]) {
    return folderMap['default'];
  }

  return folderId;
}

module.exports = {
    bufferToReadableStream,
    getDriveClient,
    writeFileToDrive,
    getDestinationFolderID
}