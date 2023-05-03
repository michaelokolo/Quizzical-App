import React from 'react';
import './style.css';
import Question from './Question';
import { nanoid } from 'nanoid';

export default function App() {
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setAllQuestion(data.results));
  }, []);

  const [allQuestion, setAllQuestion] = React.useState([]);
  const [question, setQuestion] = React.useState([]);

  function shuffle(array) {
    const newArray = [...array];
    const length = newArray.length;

    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor(
        (newArray.length - start) * Math.random()
      );
      const randomItem = newArray.splice(randomPosition, 1);

      newArray.push(...randomItem);
    }

    return newArray;
  }
  function handleClick(event) {
    console.log(event);
  }

  const questionElement = allQuestion.map((quest) => (
    <Question
      key={nanoid()}
      question={quest.question}
      answers={shuffle(quest.incorrect_answers.concat(quest.correct_answer))}
      correct_answer={quest.correct_answer}
      handleAllClick={handleClick}
    />
  ));

  return (
    <div className="container">
      <div>
        {/* <Question />
        <Question />
        <Question />
        <Question />
        <Question /> */}
        {questionElement}
      </div>
      <p></p>
      <button>Check answers</button>
    </div>
  );
}
