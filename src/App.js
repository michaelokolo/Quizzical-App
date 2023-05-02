import React from 'react';
import './style.css';
import Question from './Question';

export default function App() {
  const [questionAnswer, setQuestionAnswer] = React.useState([]);

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setQuestionAnswer(data.results));
  }, []);


  // function shuffle() {
  //   const newArray = [...array];
  //   const length = newArray.length;

  //   for (let start = 0; start < length; start++) {
  //     const randomPosition = Math.floor(
  //       (newArray.length - start) * Math.random()
  //     );
  //     const randomItem = newArray.splice(randomPosition, 1);

  //     newArray.push(...randomItem);
  //   }

  //   return newArray;
  // }

  // const shuffled = shuffle(array);
  // console.log(shuffled);

  const questionElement = questionAnswer.map((quest) => (
    <Question
      question={quest.question}
      correct_answer={quest.correct_answer}
      incorrect_answer1={quest.incorrect_answers[0]}
      incorrect_answer2={quest.incorrect_answers[1]}
      incorrect_answer3={quest.incorrect_answers[2]}
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
      <button>Check answers</button>
    </div>
  );
}
