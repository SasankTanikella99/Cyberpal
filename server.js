const express = require('express');
const path = require('path');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
// Since frontend and backend are served from the same origin, you might not need CORS
// But if you decide to keep it for future-proofing:
app.use(cors());

// Connect to database
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);

// Frontend Routes
app.use('/', frontendRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'Frontend')));

// For SPA routing, send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));