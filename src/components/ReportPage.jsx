import { useLocation } from "react-router-dom";
import "../styles/ReportPage.css"; // Add your custom styles here

const ReportPage = () => {
  const { state } = useLocation();

  // Destructure questions and answers with default values to avoid undefined errors
  const { questions = [], answers = [] } = state || {};

  // Handle case where data might be missing or empty
  if (questions.length === 0 || answers.length === 0) {
    return (
      <div className="report-container">
        <h1 className="report-title">Quiz Report</h1>
        <div className="underline"></div>
        <p>No data available for the quiz results.</p>
      </div>
    );
  }

  // Calculate final score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct_answer) {
        score += 1;
      }
    });
    return score;
  };

  const finalScore = calculateScore();
  const totalQuestions = questions.length;

  // Decode HTML using DOMParser
  const decodeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h1 className="report-title">Quiz Report</h1>
        <div className="underline"></div>
        <p className="final-score">
          <strong>Final Score:</strong> {finalScore} / {totalQuestions}
        </p>
      </div>
      <div className="question-list">
        {questions.map((q, index) => (
          <div key={index} className="question-card">
            <p className="question-text">
              <strong>Question:</strong> {decodeHtml(q.question)}
            </p>
            <p className={`answer-text ${answers[index] === q.correct_answer ? 'correct' : 'incorrect'}`}>
              <strong>Your Answer:</strong> {answers[index] ? decodeHtml(answers[index]) : "Not Attempted"}
            </p>
            <p className="correct-answer-text">
              <strong>Correct Answer:</strong> {decodeHtml(q.correct_answer)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
