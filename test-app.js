const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testApp() {
    console.log('🧪 Testing AI Email Sender App...\n');

    // Test 1: Check if server is running
    try {
        console.log('1. Testing server connection...');
        const response = await axios.get(`${API_BASE_URL}`);
        console.log('✅ Server is running and serving the frontend\n');
    } catch (error) {
        console.log('❌ Server is not running. Please start it with: cd server && npm start\n');
        return;
    }

    // Test 2: Test email generation
    try {
        console.log('2. Testing email generation...');
        const generateResponse = await axios.post(`${API_BASE_URL}/api/generate`, {
            prompt: 'Write a simple hello email'
        });

        if (generateResponse.data.email) {
            console.log('✅ Email generation working!');
            console.log('Generated email preview:', generateResponse.data.email.substring(0, 100) + '...\n');
        } else {
            console.log('❌ Email generation failed - no email content returned\n');
        }
    } catch (error) {
        console.log('❌ Email generation failed:', error.response?.data || error.message);
        console.log('Check your GROQ_API_KEY in server/.env\n');
    }

    // Test 3: Test email sending (with a dry run)
    try {
        console.log('3. Testing email sending endpoint...');
        const sendResponse = await axios.post(`${API_BASE_URL}/api/send`, {
            recipients: 'test@example.com',
            subject: 'Test Email',
            body: 'This is a test email.'
        });

        if (sendResponse.data.success) {
            console.log('✅ Email sending endpoint working!');
            console.log('Note: Test email was sent to test@example.com\n');
        } else {
            console.log('❌ Email sending failed\n');
        }
    } catch (error) {
        console.log('❌ Email sending failed:', error.response?.data || error.message);
        console.log('Check your EMAIL_ID and EMAIL_PASS in server/.env\n');
    }

    console.log('🎉 Testing complete! If all tests passed, your app is ready for deployment.');
}

// Run the tests
testApp().catch(console.error);