import React, { useState, useEffect, useCallback } from 'react';
import '../styles/MCQTest.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    answer: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 1,
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    answer: 1,
  },
];

const MCQTest = ({ onLogout }) => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    let sc = 0;
    responses.forEach((resp, idx) => {
      if (resp === questions[idx].answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);
  }, [responses]);

  useEffect(() => {
    
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        ["F12", "PrintScreen", "Escape"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.documentElement.requestFullscreen().catch(err => console.log(err));

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      if (document.fullscreenElement) document.exitFullscreen();
      clearInterval(timer);
    };
  }, [handleSubmit]);

  const handleOptionChange = (qIdx, oIdx) => {
    const newResponses = [...responses];
    newResponses[qIdx] = oIdx;
    setResponses(newResponses);
  };

  

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mcq-container">
      <div className="mcq-header">
        <h2>MCQ Test</h2>
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      </div>
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={idx} className="question-block">
            <p className="question-text">{`${idx + 1}. ${q.question}`}</p>
            <div className="options-grid">
              {q.options.map((opt, oIdx) => (
                <label key={oIdx} className="option-label">
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={oIdx}
                    checked={responses[idx] === oIdx}
                    onChange={() => handleOptionChange(idx, oIdx)}
                    disabled={submitted}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        {!submitted && <button type="submit" className="submit-btn">Submit Test</button>}
      </form>
      {submitted && (
        <div className="results">
          <h3>Test Complete!</h3>
          <p>Your score: {score} / {questions.length}</p>
          <button onClick={onLogout} className="logout-btn">Exit Test</button>
        </div>
      )}
    </div>
  );
};

export default MCQTest;
