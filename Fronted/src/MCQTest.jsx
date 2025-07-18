import React, { useState, useEffect } from 'react';
import './App.css';

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

  useEffect(() => {
    // Anti-cheating: disable right-click and shortcuts
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
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.documentElement.requestFullscreen();
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      if (document.fullscreenElement) document.exitFullscreen();
    };
  }, []);

  const handleOptionChange = (qIdx, oIdx) => {
    const newResponses = [...responses];
    newResponses[qIdx] = oIdx;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sc = 0;
    responses.forEach((resp, idx) => {
      if (resp === questions[idx].answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);
  };

  return (
    <div className="mcq-container">
      <h2>MCQ Test</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={idx} className="question-block">
            <p>{q.question}</p>
            {q.options.map((opt, oIdx) => (
              <label key={oIdx}>
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
        ))}
        {!submitted && <button type="submit">Submit</button>}
      </form>
      {submitted && <p>Your score: {score} / {questions.length}</p>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default MCQTest;
