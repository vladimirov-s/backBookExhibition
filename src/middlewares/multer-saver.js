const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg)$/i)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImage = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter
}).array('pictures', 5);

const deleteImage = async (file) => {
  const filePath = file.path;
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting file ${filePath}: ${err}`);
    });
  }
};

const deleteUploadedImage = (req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 400 && req.files.length > 0) {
      req.files.forEach((item) => {
        deleteImage(item);
      });
    }
  });
  next();
};

module.exports = { uploadImage, deleteUploadedImage };
