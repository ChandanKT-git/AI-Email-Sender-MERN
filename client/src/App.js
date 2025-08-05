import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
    const [recipients, setRecipients] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const generateEmail = async () => {
        if (!prompt.trim()) {
            showMessage('Please enter a prompt for the email', 'error');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/generate`, {
                prompt: prompt
            });
            setGeneratedEmail(response.data.email);
            showMessage('Email generated successfully!', 'success');
        } catch (error) {
            console.error('Error generating email:', error);
            showMessage('Failed to generate email. Please try again.', 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const sendEmail = async () => {
        if (!recipients.trim()) {
            showMessage('Please enter recipient email addresses', 'error');
            return;
        }
        if (!subject.trim()) {
            showMessage('Please enter an email subject', 'error');
            return;
        }
        if (!generatedEmail.trim()) {
            showMessage('Please generate or enter email content', 'error');
            return;
        }

        setIsSending(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/send`, {
                recipients: recipients,
                subject: subject,
                body: generatedEmail
            });

            if (response.data.success) {
                showMessage('Email sent successfully!', 'success');
                // Reset form
                setRecipients('');
                setPrompt('');
                setGeneratedEmail('');
                setSubject('');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showMessage('Failed to send email. Please check your configuration.', 'error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1>AI Email Sender</h1>
                    <p>Generate professional emails with AI and send them instantly</p>
                </header>

                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                <div className="form-section">
                    <div className="input-group">
                        <label htmlFor="recipients">Recipients</label>
                        <input
                            id="recipients"
                            type="text"
                            placeholder="Enter email addresses (comma-separated)"
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            id="subject"
                            type="text"
                            placeholder="Enter email subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="prompt">Email Prompt</label>
                        <textarea
                            id="prompt"
                            placeholder="Describe the email you want to generate (e.g., 'Write a professional follow-up email for a job interview')"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="textarea-field"
                            rows="3"
                        />
                    </div>

                    <button
                        onClick={generateEmail}
                        disabled={isGenerating}
                        className="generate-btn"
                    >
                        {isGenerating ? (
                            <>
                                <span className="spinner"></span>
                                Generating...
                            </>
                        ) : (
                            'Generate Email'
                        )}
                    </button>
                </div>

                {generatedEmail && (
                    <div className="email-section">
                        <div className="input-group">
                            <label htmlFor="generated-email">Generated Email (Editable)</label>
                            <textarea
                                id="generated-email"
                                value={generatedEmail}
                                onChange={(e) => setGeneratedEmail(e.target.value)}
                                className="textarea-field email-content"
                                rows="12"
                                placeholder="Your generated email will appear here..."
                            />
                        </div>

                        <button
                            onClick={sendEmail}
                            disabled={isSending}
                            className="send-btn"
                        >
                            {isSending ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                'Send Email'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;