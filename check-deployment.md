# How to Check if Your App is Working

## 🏠 Local Testing (Before Deployment)

### Quick Test Commands:
```bash
# 1. Build and start the app
npm run build
cd server && npm start

# 2. In another terminal, run the test script
node test-app.js
```

### Manual Testing:
1. **Open browser**: Go to http://localhost:5000
2. **Check UI**: You should see the AI Email Sender interface
3. **Test generation**: 
   - Enter a prompt like "Write a professional thank you email"
   - Click "Generate Email"
   - Check if AI-generated content appears
4. **Test sending**:
   - Add your email as recipient
   - Add a subject
   - Click "Send Email"
   - Check your inbox

## 🌐 Deployment Testing (After Render Deploy)

### Check Render Dashboard:
1. Go to your Render dashboard
2. Check if the service shows "Live" status
3. Click on the service URL
4. Test the same steps as local testing

### Test Production API:
Replace `YOUR_RENDER_URL` with your actual Render URL:

```bash
# Test generate endpoint
curl -X POST https://YOUR_RENDER_URL.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a hello email"}'

# Test send endpoint
curl -X POST https://YOUR_RENDER_URL.onrender.com/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": "your-email@gmail.com",
    "subject": "Test from Production",
    "body": "This email was sent from the deployed app!"
  }'
```

## 🔍 Common Issues & Solutions

### Local Issues:
- **Port 5000 busy**: Change PORT in server/.env
- **CORS errors**: Make sure server is running on correct port
- **API errors**: Check your .env file has correct keys

### Deployment Issues:
- **Build fails**: Check Render logs for specific errors
- **API not working**: Verify environment variables are set in Render
- **Frontend loads but API fails**: Check if API routes have /api prefix

## 📊 Health Check Endpoints

Add this to your server.js for easy health checking:

```javascript
// Add this route to server/server.js
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});
```

Then test with:
```bash
curl https://YOUR_RENDER_URL.onrender.com/health
```

## 🎯 Success Indicators

Your app is working if:
- ✅ Frontend loads without errors
- ✅ Generate button creates email content
- ✅ Send button successfully sends emails
- ✅ No console errors in browser
- ✅ API endpoints respond correctly
- ✅ Environment variables are loaded

## 📱 Mobile Testing

Don't forget to test on mobile:
- Open the deployed URL on your phone
- Check if the interface is responsive
- Test all functionality works on touch devices