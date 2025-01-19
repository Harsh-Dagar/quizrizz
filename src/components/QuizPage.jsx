import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import NavigationPanel from './NavigationPanel';
import axios from 'axios';
import '../styles/QuizPage.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(() => {
    // Load answers from localStorage if they exist
    const savedAnswers = localStorage.getItem('userAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(() => {
    // Load time from sessionStorage, or set to 30 minutes if not available
    const savedTime = sessionStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime) : 30 * 60;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=15');
      const data = response.data.results.map((question) => ({
        ...question,
        options: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      }));
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        // Store time in sessionStorage
        sessionStorage.setItem('timeLeft', newTime);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [questionIndex]: answer,
      };
      // Save updated answers in localStorage
      localStorage.setItem('userAnswers', JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
    setAnsweredQuestions((prev) => new Set(prev).add(questionIndex));
  };

  const handleQuestionVisit = (index) => {
    setVisitedQuestions((prev) => new Set(prev).add(index));
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = () => {
    const confirmSubmit = window.confirm("Do you want to submit the quiz?");
    if (confirmSubmit) {
      // Clear sessionStorage time
      sessionStorage.removeItem('timeLeft');
      navigate('/report', { state: { questions, answers: userAnswers } });
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    handleQuestionVisit(nextIndex);
  };

  return (
    <div className="quiz-page-container">
      <Timer timeLeft={timeLeft} totalTime={30 * 60} />
      {questions.length > 0 && (
        <div className="quiz-content">
          <QuestionCard
            question={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            handleAnswerChange={handleAnswerChange}
            selectedAnswer={userAnswers[currentQuestionIndex]}
          />
          <div className="navigation-buttons">
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="next-btn"
            >
              Next Question
            </button>
            <button onClick={handleSubmitQuiz} className="submit-btn">
              Submit Quiz
            </button>
          </div>
          <NavigationPanel
            questions={questions}
            answeredQuestions={answeredQuestions}
            visitedQuestions={visitedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            handleQuestionVisit={handleQuestionVisit}
          />
        </div>
      )}
    </div>
  );
};

export default QuizPage;
