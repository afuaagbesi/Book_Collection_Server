const express = require('express');
const pool = require('../db');
const router = express.Router();

// Fetch all books
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Fetch a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, price, genre_id, copies_left, image_url } = req.body;
    const result = await pool.query(
      'INSERT INTO books (title, author, price, genre_id, copies_left, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, price, genre_id, copies_left, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update book details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, genre_id, copies_left, image_url } = req.body;
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, price = $3, genre_id = $4, copies_left = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [title, author, price, genre_id, copies_left, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
