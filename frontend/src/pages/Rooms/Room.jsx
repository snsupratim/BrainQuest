import React, { useState } from "react";
import "./rrom.css"; // Importing the CSS

const Room = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris",
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "Java", "JavaScript", "C#"],
      answer: "JavaScript",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Galileo", "Tesla"],
      answer: "Einstein",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerOptionClick = (selectedOption) => {
    const nextQuestion = currentQuestion + 1;
    setUserAnswers([...userAnswers, selectedOption]);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <div>
            You scored {score} out of {questions.length}
          </div>
          <div className="answers-section">
            <h3>Correct Answers:</h3>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  {question.question} -{" "}
                  <span className="correct-answer">{question.answer}</span>
                  {userAnswers[index] !== question.answer && (
                    <span className="user-answer">
                      {" "}
                      (Your answer: {userAnswers[index]})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className="answer-button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
