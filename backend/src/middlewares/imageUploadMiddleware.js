const multer = require('multer');
const { fileFilter } = require('../helpers/utils');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the uploaded files
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // Define the filename of the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'productImage',
);
function imageUploadMiddleware(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(400).json({ error: err.message });
    } else {
      // Everything went fine.
      next();
    }
  });
}

module.exports = { imageUploadMiddleware };
