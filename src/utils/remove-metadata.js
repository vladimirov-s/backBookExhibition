const fs = require('fs');
const sharp = require('sharp');

const removeMetadata = async (files) => {
  for (const file of files) {
    const path = file.path;
    await sharp(path).toFile(`src/public/pictures/${file.filename}`);
    fs.unlink(path, (err) => {
      if (err) console.error(`Error deleting file ${path}: ${err}`);
    });
  }
};

module.exports = { removeMetadata };
