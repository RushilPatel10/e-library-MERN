const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Get all books with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    // Add genre filter if specified
    if (genre && genre !== 'All') {
      query.genre = genre;
    }

    // Add search filter if specified
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create book (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrow book
router.post('/:id/borrow', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.available) return res.status(400).json({ message: 'Book is not available' });

    book.available = false;
    book.borrowedBy = req.user.id;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Return book
router.post('/:id/return', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.borrowedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    book.available = true;
    book.borrowedBy = null;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update book fields
    const { title, author, genre, publishDate, description, coverImage } = req.body;
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.publishDate = publishDate;
    book.description = description;
    book.coverImage = coverImage;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Optional: Check if user has permission to delete
    // if (book.user.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 