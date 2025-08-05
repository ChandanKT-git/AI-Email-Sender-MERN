// Quick test to verify the app setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking AI Email Sender App Setup...\n');

// Check 1: Server files
const serverFiles = ['server/server.js', 'server/package.json', 'server/.env'];
serverFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
    }
});

// Check 2: Client build
if (fs.existsSync('client/build')) {
    console.log('✅ Client build folder exists');
} else {
    console.log('❌ Client build folder missing - run: cd client && npm run build');
}

// Check 3: Environment variables
if (fs.existsSync('server/.env')) {
    const envContent = fs.readFileSync('server/.env', 'utf8');
    const hasGroq = envContent.includes('GROQ_API_KEY=');
    const hasEmail = envContent.includes('EMAIL_ID=');
    const hasPass = envContent.includes('EMAIL_PASS=');

    console.log(`✅ Environment file exists`);
    console.log(`${hasGroq ? '✅' : '❌'} GROQ_API_KEY configured`);
    console.log(`${hasEmail ? '✅' : '❌'} EMAIL_ID configured`);
    console.log(`${hasPass ? '✅' : '❌'} EMAIL_PASS configured`);
}

// Check 4: Route files
const routeFiles = ['server/routes/generate.js', 'server/routes/send.js'];
routeFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
    }
});

console.log('\n🎯 Next Steps:');
console.log('1. Start server: cd server && npm start');
console.log('2. Open browser: http://localhost:5000');
console.log('3. Test email generation and sending');
console.log('4. If working locally, deploy to Render');

console.log('\n📝 Manual Test Checklist:');
console.log('□ Server starts without errors');
console.log('□ Frontend loads at localhost:5000');
console.log('□ Can generate email from prompt');
console.log('□ Can send email to recipient');
console.log('□ No console errors in browser');