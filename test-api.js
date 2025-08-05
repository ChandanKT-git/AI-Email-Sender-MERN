const axios = require('axios');

async function testAPI() {
    console.log('🧪 Testing API endpoints...\n');

    try {
        // Test generate endpoint
        console.log('Testing /api/generate...');
        const response = await axios.post('http://localhost:5000/api/generate', {
            prompt: 'Write a simple hello email'
        });

        console.log('✅ Generate endpoint working!');
        console.log('Response:', response.data.email.substring(0, 100) + '...\n');

    } catch (error) {
        console.log('❌ Generate endpoint failed:');
        console.log('Error:', error.response?.data || error.message);
        console.log('Status:', error.response?.status);

        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Make sure your server is running: cd server && npm start');
        }
    }
}

testAPI();