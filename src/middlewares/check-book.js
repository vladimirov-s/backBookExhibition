const { body } = require('express-validator');

module.exports = [
  body('title')
    .matches(/[a-zA-Zа-яА-Я-.]{3,20}/)
    .withMessage('Fill normal characters, lenght between 6-20'),
  body('author')
    .matches(/[a-zA-Zа-яА-Я-.]{3,20}/)
    .withMessage('Fill normal characters, lenght between 6-20'),
  body('description')
    .matches(/[a-zA-Zа-яА-Я-.]{6,20}/)
    .withMessage('Fill normal characters, lenght between 6-20'),
  body('year')
    .matches(/[0-9]{3,20}/)
    .withMessage('Fill normal characters, lenght between 6-20')
];
