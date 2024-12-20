const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // CORS middleware

admin.initializeApp();

exports.getFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const fileName = req.query.fileName; // Get the file name from query params
    const bucket = admin.storage().bucket(); // Access Firebase Storage

    const file = bucket.file(fileName);
    file
      .getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Set expiration date for the URL
      })
      .then((signedUrls) => {
        res.status(200).json({ url: signedUrls[0] }); // Send the signed URL as a response
      })
      .catch((error) => {
        console.error('Error getting signed URL', error);
        res.status(500).send('Error getting signed URL');
      });
  });
});
