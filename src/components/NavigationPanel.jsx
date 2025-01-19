import React from 'react';
import '../styles/NavigationPanel.css';

const NavigationPanel = ({ questions, answeredQuestions, visitedQuestions, currentQuestionIndex, handleQuestionVisit }) => {
  const getQuestionStatusColor = (index) => {
    if (answeredQuestions.has(index)) return '#4caf50'; // Green for answered
    if (visitedQuestions.has(index)) return '#ffc107'; // Orange for visited
    return '#9e9e9e'; // Gray for unvisited
  };

  return (
    <div className="navigation-panel">
      <h4 className="navigation-heading">Quiz Tracker</h4> {/* Updated heading */}
      <ul className="navigation-list">
        {questions.map((_, index) => (
          <li
            key={index}
            className={`navigation-item ${currentQuestionIndex === index ? 'active' : ''}`}
            onClick={() => handleQuestionVisit(index)}
            style={{
              backgroundColor: getQuestionStatusColor(index),
            }}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationPanel;
