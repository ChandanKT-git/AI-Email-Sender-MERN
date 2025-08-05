const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Configure dotenv to load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Configure middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Import route handlers
const generateRoute = require('./routes/generate');
const sendRoute = require('./routes/send');

// Mount route handlers
app.use('/generate', generateRoute);
app.use('/send', sendRoute);

// Basic health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'AI Email Sender API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});