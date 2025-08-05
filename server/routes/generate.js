const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /generate - Generate email content using Groq AI
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({
                error: 'Prompt is required and must be a non-empty string'
            });
        }

        // Check if GROQ_API_KEY is configured
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: 'GROQ_API_KEY environment variable is not configured'
            });
        }

        // Prepare Groq API request
        const groqRequest = {
            model: 'mixtral-8x7b-32768',
            messages: [
                {
                    role: 'user',
                    content: prompt.trim()
                }
            ]
        };

        // Make request to Groq API
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            groqRequest,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            }
        );

        // Extract generated email content from response
        const generatedEmail = response.data.choices[0]?.message?.content;

        if (!generatedEmail) {
            return res.status(500).json({
                error: 'Failed to generate email content from AI response'
            });
        }

        // Return generated email content
        res.json({ email: generatedEmail });

    } catch (error) {
        console.error('Error in /generate route:', error.message);

        // Handle different types of errors
        if (error.response) {
            // Groq API returned an error response
            const status = error.response.status;
            const message = error.response.data?.error?.message || 'API request failed';

            if (status === 401) {
                return res.status(401).json({
                    error: 'Invalid GROQ_API_KEY - authentication failed'
                });
            } else if (status === 429) {
                return res.status(429).json({
                    error: 'Rate limit exceeded - please try again later'
                });
            } else {
                return res.status(500).json({
                    error: `Groq API error: ${message}`
                });
            }
        } else if (error.code === 'ECONNABORTED') {
            // Request timeout
            return res.status(503).json({
                error: 'Request timeout - Groq API did not respond in time'
            });
        } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            // Network connectivity issues
            return res.status(503).json({
                error: 'Unable to connect to Groq API - please check network connection'
            });
        } else {
            // Generic server error
            return res.status(500).json({
                error: 'Internal server error occurred while generating email'
            });
        }
    }
});

module.exports = router;