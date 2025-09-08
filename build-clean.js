#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧹 Cleaning previous builds...');

// Clean function
function clean() {
    try {
        execSync('rm -rf node_modules server/node_modules client/node_modules', { stdio: 'ignore' });
        execSync('rm -f package-lock.json server/package-lock.json client/package-lock.json', { stdio: 'ignore' });
    } catch (error) {
        // Ignore errors for missing files
    }
}

// Install with suppressed warnings
function installDeps() {
    console.log('📦 Installing root dependencies...');
    execSync('npm install --silent --no-audit --no-fund', { stdio: 'inherit' });

    console.log('📦 Installing server dependencies...');
    execSync('cd server && npm install --silent --no-audit --no-fund', { stdio: 'inherit' });

    console.log('📦 Installing client dependencies...');
    execSync('cd client && npm install --silent --no-audit --no-fund', { stdio: 'inherit' });
}

// Build client
function buildClient() {
    console.log('🏗️ Building client...');
    execSync('cd client && npm run build', { stdio: 'inherit' });
}

// Main execution
try {
    if (process.argv.includes('--clean')) {
        clean();
    }

    installDeps();
    buildClient();

    console.log('✅ Build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}