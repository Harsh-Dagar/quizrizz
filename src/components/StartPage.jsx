import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import logo from '../assets/logo.png';

const StartPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Clear any previously stored answers and time when starting a new quiz
            localStorage.removeItem('userAnswers');
            sessionStorage.removeItem('timeLeft');
            localStorage.setItem('email', email);
            navigate('/quiz');
        }
    };

    return (
        <div className="home-page">
            <div className="content">
                <img src={logo} alt="Quizrizz Logo" className="logo" />
                <h1 className="title">QuizRizz</h1>
                <p className="description">
                    Test your knowledge with our fun and engaging quizzes. Enter your email to begin!
                </p>

                {/* Form for email submission */}
                <form onSubmit={handleSubmit} className="email-form">
                    <input
                        type="email"
                        className="email-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="start-button">Start Quiz</button>
                </form>
            </div>
        </div>
    );
};

export default StartPage;
