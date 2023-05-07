import React from 'react';
import './style.css';
import Question from './Question';
import { nanoid } from 'nanoid';

export default function App() {
  // React.useEffect(() => {
  //   fetch('https://opentdb.com/api.php?amount=5&type=multiple')
  //     .then((res) => res.json())
  //     .then((data) => setAllQuestion(data.results));
  // }, []);
  React.useEffect(() => {
    async function getQuestion() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple'
      );
      const data = await res.json();
      let q = [];
      data.results.forEach((question) => {
        q.push({
          id: nanoid(),
          answers: shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          question: question.question,
          correct: question.correct_answer,
        });
      });
      setAllQuestion(q);
    }
    getQuestion();
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
  
  console.log(allQuestion);

  const questionElement = allQuestion.map((quest) => (
    <Question
      key={quest.id}
      question ={quest}
      id={question.id}
      // handleAllClick={handleClick}
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
