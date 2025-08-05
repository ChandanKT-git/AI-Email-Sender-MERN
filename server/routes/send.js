const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST route for sending emails
router.post('/', async (req, res) => {
    try {
        // Extract data from request body
        const { recipients, subject, body } = req.body;

        // Validate required fields
        if (!recipients || !subject || !body) {
            return res.status(400).json({
                error: 'Missing required fields: recipients, subject, and body are required'
            });
        }

        // Parse comma-separated recipients string into array
        const recipientArray = recipients
            .split(',')
            .map(email => email.trim())
            .filter(email => email.length > 0);

        // Validate that we have at least one recipient
        if (recipientArray.length === 0) {
            return res.status(400).json({
                error: 'At least one valid recipient email address is required'
            });
        }

        // Validate email format for each recipient
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        for (const email of recipientArray) {
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    error: `Invalid email format: ${email}`
                });
            }
        }

        // Configure Nodemailer with Gmail SMTP
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify transporter configuration
        await transporter.verify();

        // Configure email options
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: recipientArray,
            subject: subject,
            text: body,
            html: body.replace(/\n/g, '<br>') // Convert line breaks to HTML
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Return success response
        res.json({ success: true });

    } catch (error) {
        console.error('Email sending error:', error);

        // Handle specific error types
        if (error.code === 'EAUTH') {
            return res.status(401).json({
                error: 'Email authentication failed. Please check your EMAIL_ID and EMAIL_PASS credentials.'
            });
        }

        if (error.code === 'ENOTFOUND' || error.code === 'ECONNECTION') {
            return res.status(503).json({
                error: 'Unable to connect to email service. Please check your internet connection.'
            });
        }

        if (error.responseCode === 550) {
            return res.status(400).json({
                error: 'Email delivery failed. One or more recipient addresses may be invalid.'
            });
        }

        // Generic error response
        res.status(500).json({
            error: 'Failed to send email. Please try again later.'
        });
    }
});

module.exports = router;