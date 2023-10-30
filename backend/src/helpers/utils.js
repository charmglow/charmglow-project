const fs = require('fs');
const path = require('path');
function fileFilter(req, file, cb) {
  // Check if the file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'), false);
  }
}
function deleteImageFile(filePath) {
  // Use the fs.unlink method to delete the file

  const parsedUrl = new URL(filePath);
  const filename = path.basename(parsedUrl.pathname);
  const imagePath = path.join('uploads', filename);
  fs.unlinkSync(imagePath, (err) => {
    if (err) {
      console.error('Error deleting image:', err);
    } else {
      console.log('Image deleted successfully:', filePath);
    }
  });
}

module.exports = { fileFilter, deleteImageFile };
