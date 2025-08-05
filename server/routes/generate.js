const express = require('express');
const { Groq } = require('groq-sdk');
const router = express.Router();

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

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

        // Generate email using Groq SDK
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Generate a professional email based on this prompt: ${prompt.trim()}`
                }
            ],
            model: 'llama3-8b-8192', // Using a stable available model
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
        });

        // Extract generated email content
        const generatedEmail = chatCompletion.choices[0]?.message?.content;

        if (!generatedEmail) {
            return res.status(500).json({
                error: 'Failed to generate email content from AI response'
            });
        }

        // Return generated email content
        res.json({ email: generatedEmail });

    } catch (error) {
        console.error('Error in /generate route:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            code: error.code,
            response: error.response?.data
        });

        // Handle Groq SDK errors
        if (error.status === 401) {
            return res.status(401).json({
                error: 'Invalid GROQ_API_KEY - authentication failed'
            });
        } else if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded - please try again later'
            });
        } else if (error.status === 400) {
            return res.status(400).json({
                error: `Bad request: ${error.message}`
            });
        } else {
            return res.status(500).json({
                error: `Groq API error: ${error.message}`
            });
        }
    }
});

module.exports = router;