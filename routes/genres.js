const express = require('express');
const pool = require('../db');
const router = express.Router();

// Fetch all genres
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM genres');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Fetch a genre by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM genres WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Genre not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a genre
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit a genre
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE genres SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Genre not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM genres WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Genre not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
