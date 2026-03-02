const multer = require('multer');
const path = require('path');

// Configure where and how to save uploaded files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Saves files to the uploads folder
  },
  filename(req, file, cb) {
    // Creates a unique filename (e.g., image-167890.jpg)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

module.exports = upload;