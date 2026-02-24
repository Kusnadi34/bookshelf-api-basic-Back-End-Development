const { nanoid } = require('nanoid');

const books = [];


function addBookHandler(req, res) {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const id = nanoid();
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  books.push(newBook);

  return res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id }
  });
}


function getAllBooksHandler(req, res) {
  const responseBooks = books.map(book => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }));

  return res.status(200).json({
    status: 'success',
    data: { books: responseBooks }
  });
}


function getBookByIdHandler(req, res) {
  const { bookId } = req.params;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
  }

  return res.status(200).json({
    status: 'success',
    data: { book }
  });
}


function updateBookByIdHandler(req, res) {
  const { bookId } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
  }

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt
  };

  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  });
}


function deleteBookByIdHandler(req, res) {
  const { bookId } = req.params;
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
  }

  books.splice(index, 1);

  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus'
  });
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler
};