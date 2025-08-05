# Deployment Guide for AI Email Sender

## Quick Deploy Options

### Option 1: Render (Easiest - One Platform)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Connect your GitHub repo
   - Render will automatically detect the `render.yaml` file
   - Set environment variables:
     - `GROQ_API_KEY`: Your Groq API key
     - `EMAIL_ID`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password

3. **Your app will be live at**: `https://your-app-name.onrender.com`

### Option 2: Vercel + Railway (Frontend + Backend)

#### Deploy Backend (Railway):
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Select the server folder
4. Set environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `EMAIL_ID`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password
   - `PORT`: 8080 (Railway default)

#### Deploy Frontend (Vercel):
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repo
3. Set build settings:
   - Framework: Create React App
   - Root Directory: `client`
4. Set environment variable:
   - `REACT_APP_API_URL`: Your Railway backend URL

### Option 3: Netlify + Heroku

#### Deploy Backend (Heroku):
```bash
# Install Heroku CLI first
cd server
heroku create your-app-name-api
heroku config:set GROQ_API_KEY=your_key
heroku config:set EMAIL_ID=your_email
heroku config:set EMAIL_PASS=your_password
git subtree push --prefix server heroku main
```

#### Deploy Frontend (Netlify):
1. Build the client:
   ```bash
   cd client
   REACT_APP_API_URL=https://your-app-name-api.herokuapp.com npm run build
   ```
2. Drag the `build` folder to [netlify.com](https://netlify.com)

## Environment Variables Needed

Make sure you have these ready:

- **GROQ_API_KEY**: Get from [console.groq.com](https://console.groq.com)
- **EMAIL_ID**: Your Gmail address
- **EMAIL_PASS**: Gmail app password (not regular password)
  - Enable 2FA on Gmail
  - Generate app password: Google Account → Security → App passwords

## Quick Test Commands

Before deploying, test locally:

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend  
cd client
npm start
```

## Post-Deployment

1. Test the live app
2. Update CORS settings if needed
3. Monitor logs for any issues
4. Set up custom domain (optional)

Choose the option that works best for you! Render is the simplest for getting started quickly.