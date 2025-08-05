# Local Testing Guide

## Step 1: Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

## Step 2: Set Up Environment Variables
Make sure your `server/.env` file has:
```
GROQ_API_KEY=your_groq_api_key_here
EMAIL_ID=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
```

## Step 3: Build the Client
```bash
cd client
npm run build
cd ..
```

## Step 4: Start the Server
```bash
cd server
npm start
```

You should see: "Server running on port 5000"

## Step 5: Test in Browser
1. Open http://localhost:5000
2. You should see the AI Email Sender interface
3. Try generating an email with a simple prompt
4. Try sending a test email to yourself

## Step 6: Test API Endpoints Directly

### Test Generate Endpoint:
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a simple hello email"}'
```

### Test Send Endpoint:
```bash
curl -X POST http://localhost:5000/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": "your-email@gmail.com",
    "subject": "Test Email",
    "body": "This is a test email from the AI Email Sender app."
  }'
```

## Troubleshooting
- If port 5000 is busy, change PORT in .env
- Check server logs for any errors
- Make sure your Gmail app password is correct
- Verify your Groq API key is valid