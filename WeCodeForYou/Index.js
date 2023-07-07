// index.js
const express = require('express');
const admin = require('firebase-admin');
const Multer = require('multer');

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'YOUR_DATABASE_URL'
});

// Initialize Cloud Firestore and Cloud Storage
const db = admin.firestore();
const bucket = admin.storage().bucket();

// Set up Multer for file uploads
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Example route to upload a file
app.post('/upload', multer.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Create a unique filename for the uploaded file
  const filename = `${Date.now()}_${file.originalname}`;

  // Upload the file to Cloud Storage
  const blob = bucket.file(filename);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (error) => {
    console.error(error);
    res.status(500).send('An error occurred while uploading the file.');
  });

  blobStream.on('finish', () => {
    // File uploaded successfully
    // Get the public URL of the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send(publicUrl);
  });

  blobStream.end(file.buffer);
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});