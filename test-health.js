const axios = require('axios');

async function testHealth() {
    try {
        const response = await axios.get('http://localhost:5000/api/health');
        console.log('✅ Health check passed:', response.data);

        // Now test generate
        console.log('\nTesting generate...');
        const generateResponse = await axios.post('http://localhost:5000/api/generate', {
            prompt: 'Write a simple hello email'
        });
        console.log('✅ Generate working:', generateResponse.data.email.substring(0, 100) + '...');

    } catch (error) {
        console.log('❌ Error:', error.response?.data || error.message);
        console.log('Status:', error.response?.status);
    }
}

testHealth();