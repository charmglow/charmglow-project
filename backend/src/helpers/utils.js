function fileFilter(req, file, cb) {
  // Check if the file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'), false);
  }
}

module.exports = { fileFilter };
