import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/completion.css';

const Completion = () => {
  const [quizResults, setQuizResults] = useState({
    difficulty: '',
    results: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await fetch('/api/get-quiz-results');
        if (response.ok) {
          const data = await response.json();
          setQuizResults(data);
        } else {
          console.error('Failed to fetch quiz results');
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, []);

  if (loading) {
    return <div className="completion-container">Loading results...</div>;
  }

  return (
    <div className="completion-container">
      <div className="results-title">Results</div>
      <table className="results-table">
        <thead>
          <tr>
            <th><span className="highlight-header">Pattern</span></th>
            <th><span className="highlight-header">Sequence</span></th>
            <th><span className="highlight-header">Slapped?</span></th>
          </tr>
        </thead>
        <tbody>
          {quizResults.results.map((result, index) => (
            <tr key={index}>
              <td>{result.pattern}</td>
              <td>{result.sequence}</td>
              <td>{result.correct ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="return-button">Return Home</Link>
    </div>
  );
};

export default Completion;