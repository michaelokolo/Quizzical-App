import React from 'react';
import './style.css';
import Question from './Question';

export default function App() {
  const [questionAnswer, setQuestionAnswer] = React.useState({});

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setQuestionAnswer(data));
  }, []);

  return (
    <div className="container">
      <div>
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </div>
      <button>Check answers</button>
    </div>
  );
}
