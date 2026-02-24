const express = require('express');
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler
} = require('../handlers/books');

const router = express.Router();

router.post('/', addBookHandler);
router.get('/', getAllBooksHandler);
router.get('/:bookId', getBookByIdHandler);
router.put('/:bookId', updateBookByIdHandler);
router.delete('/:bookId', deleteBookByIdHandler);

module.exports = router;