const axios = require('axios');

// Test that our updated dependencies work correctly
async function testDependencies() {
    console.log('🧪 Testing updated dependencies...');

    try {
        // Test Groq SDK import
        const Groq = require('groq-sdk');
        console.log('✅ Groq SDK imported successfully');

        // Test nodemailer import
        const nodemailer = require('nodemailer');
        console.log('✅ Nodemailer imported successfully');

        // Test axios import
        console.log('✅ Axios imported successfully');

        // Test dotenv
        require('dotenv').config();
        console.log('✅ Dotenv loaded successfully');

        // Test express (from server directory)
        const express = require('./server/node_modules/express');
        console.log('✅ Express imported successfully');

        console.log('\n🎉 All dependencies are working correctly!');
        console.log('📦 Updated versions:');
        console.log(`   - Groq SDK: ${require('./server/node_modules/groq-sdk/package.json').version}`);
        console.log(`   - Nodemailer: ${require('./server/node_modules/nodemailer/package.json').version}`);
        console.log(`   - Express: ${require('./server/node_modules/express/package.json').version}`);
        console.log(`   - Axios: ${require('./server/node_modules/axios/package.json').version}`);

    } catch (error) {
        console.error('❌ Dependency test failed:', error.message);
        process.exit(1);
    }
}

testDependencies();