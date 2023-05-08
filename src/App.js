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
          selected_answer: null,
        });
      });
      setAllQuestion(q);
    }
    getQuestion();
  }, []);

  const [allQuestion, setAllQuestion] = React.useState([]);
  const [score, setScore] = React.useState(0);

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

  function selected(answer, id) {
    setAllQuestion((prevQuestion) =>
      prevQuestion.map((quest) => {
        return quest.id === id ? { ...quest, selected_answer: answer } : quest;
      })
    );
    let count = 0;
    allQuestion.map((question) => {
      count = question.selected_answer === question.correct ? count + 1 : count;
    });
    setScore(count);
  }

  function checkAnswers() {
    console.log('I was clicked');
  }

  const questionElement = allQuestion.map((quest) => (
    <Question
      key={quest.id}
      question={quest}
      correct={quest.correct}
      id={quest.id}
      selected={selected}
      selected_answer={quest.selected_answer}
    />
  ));

  return (
    <div className="container">
      <div>{questionElement}</div>

      <button onClick={checkAnswers}>Check answers</button>
    </div>
  );
}
