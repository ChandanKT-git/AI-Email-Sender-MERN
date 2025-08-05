const nodemailer = require('nodemailer');
require('dotenv').config({ path: './server/.env' });

async function testEmail() {
    console.log('🧪 Testing email configuration...\n');

    console.log('Environment variables:');
    console.log('EMAIL_ID:', process.env.EMAIL_ID);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***set***' : 'NOT SET');

    try {
        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('\n✅ Transporter created');

        // Verify connection
        console.log('🔍 Verifying connection...');
        await transporter.verify();
        console.log('✅ Connection verified');

        // Send test email
        console.log('📧 Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_ID,
            to: process.env.EMAIL_ID, // Send to yourself
            subject: 'Test Email from AI Email Sender',
            text: 'This is a test email to verify the configuration is working.'
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);

    } catch (error) {
        console.log('❌ Email test failed:');
        console.log('Error:', error.message);
        console.log('Code:', error.code);

        if (error.code === 'EAUTH') {
            console.log('\n💡 Gmail authentication failed. Please check:');
            console.log('1. 2-Factor Authentication is enabled on your Gmail account');
            console.log('2. You are using an App Password (not your regular password)');
            console.log('3. The App Password is correct (no spaces)');
        }
    }
}

testEmail();