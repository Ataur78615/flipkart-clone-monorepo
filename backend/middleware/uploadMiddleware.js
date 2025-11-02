// backend/middleware/uploadMiddleware.js
const path = require('path');
const multer = require('multer');

// Define storage settings for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Save images to the 'public/images' folder
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    // Create a unique filename: fieldname-timestamp.ext
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type to ensure it's an image
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png)'), false);
  }
}

// Initialize upload middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;