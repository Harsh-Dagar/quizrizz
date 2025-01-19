import React from 'react';
import '../Styles/QuestionCard.css'; // Import the styles for QuestionCard

const decodeHtml = (html) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
};

const QuestionCard = ({ question, questionIndex, handleAnswerChange, selectedAnswer }) => {
  const handleOptionClick = (answer) => {
    handleAnswerChange(questionIndex, answer);
  };

  const decodedQuestion = decodeHtml(question.question); // Decoding the question text
  const decodedOptions = question.options.map(decodeHtml); // Decoding each option text

  return (
    <div className="question-card">
      <div className="question-header">
        <h3 className="question-title">
          Question {questionIndex + 1}
        </h3>
        <p className="question-text">{decodedQuestion}</p> {/* Render decoded question */}
      </div>
      <div className="options-container">
        {decodedOptions.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
