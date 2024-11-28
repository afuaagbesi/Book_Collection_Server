const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const booksRoutes = require('./routes/books');
const genresRoutes = require('./routes/genres');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/books', booksRoutes);
app.use('/genres', genresRoutes);

// // Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


module.exports = app;