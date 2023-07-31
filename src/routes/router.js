const { Router } = require('express');
const router = Router();
const { uploadImage, deleteUploadedImage } = require('../middlewares/multer-saver.js');
const {
  getBooks,
  createBook,
  deletOneBook,
  getOneBook
} = require('../controllers/controller');

router.get('/', getBooks);
router.post('/', [uploadImage, deleteUploadedImage], createBook);
router.get('/details/:id', getOneBook);
router.delete('/:id', deletOneBook);

module.exports = router;
