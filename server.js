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


app.use(cors(corsOptions));

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
const PORT = process.env.PORT || 10000;  // Changed default to 10000 as Render often uses this
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));