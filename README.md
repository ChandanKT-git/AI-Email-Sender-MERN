# AI Email Sender App

A MERN stack application that generates AI-powered emails using Groq API and sends them via Gmail SMTP.

## Project Structure

```
ai-email-sender/
├── client/              # React frontend
│   ├── package.json
│   └── src/
├── server/              # Express.js backend
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── routes/
│       ├── generate.js
│       └── send.js
└── README.md
```

## Features

- AI-powered email content generation using Groq's Mixtral model
- Email sending via Gmail SMTP with Nodemailer
- Support for multiple recipients
- RESTful API endpoints
- CORS enabled for frontend integration

## Setup Instructions

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   - Add your Groq API key
   - Add your Gmail credentials (use app-specific password)

4. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:5000

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### POST /generate
Generate email content using AI
- Body: `{ prompt: string }`
- Response: `{ email: string }`

### POST /send
Send email to recipients
- Body: `{ recipients: string, subject: string, body: string }`
- Response: `{ success: true }` or `{ error: string }`