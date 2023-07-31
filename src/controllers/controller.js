const bookModel = require('../models/book-model');
const { removeMetadata } = require('../utils/remove-metadata');

module.exports.createBook = async (req, res) => {
  try {
    const { title, author, description, year } = req.body;
    const { files } = req;
    await removeMetadata(req.files);
    const pictures = files.map((file) => file.filename);
    const result = await bookModel.create({ title, author, description, year, pictures });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

module.exports.getOneBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bookModel.findById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.deletOneBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await bookModel.findByIdAndDelete(id, {
      returnDocument: 'after'
    });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
