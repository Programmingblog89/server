const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Adjust file size limit as needed
}).single('images'); // Assuming 'profileImage' is the name of the field in your form

module.exports.upload = uploadImage;
