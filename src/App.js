import React from 'react';
import './style.css';
import Question from './Question';
import { nanoid } from 'nanoid';

export default function App() {
  const [allQuestion, setAllQuestion] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [startQuiz, setStartQuiz] = React.useState(true);
  const [playAgain, setPlayAgain] = React.useState(false);
  const [answerCheck, setAnswerCheck] = React.useState(false);

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
          checked: false,
        });
      });
      setAllQuestion(q);
    }
    getQuestion();
  }, [playAgain]);

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
    setAllQuestion((prevQuestion) =>
      prevQuestion.map((quest) => {
        return quest.id === id ? { ...quest, checked: true } : quest;
      })
    );
    let count = 0;
    allQuestion.map((question) => {
      count =
        question.selected_answer === question.correct ? (count += 1) : count;
    });
    setScore(count);
  }

  function checkAnswers() {
    const checked = allQuestion.every((question) => question.checked === true);
    setAnswerCheck(checked);
  }

  //console.log(answerCheck)

  const questionElement = allQuestion.map((quest) => (
    <Question
      key={quest.id}
      question={quest}
      correct={quest.correct}
      id={quest.id}
      selected={selected}
      selected_answer={quest.selected_answer}
      answerCheck={answerCheck}
    />
  ));

  const startPage = () => {
    return (
      <div className="start-page">
        <h1>Quizzical</h1>
        <p>An amazing quiz game for everybody...</p>
        <button onClick={startGame}>Start quiz</button>
      </div>
    );
  };

  function startGame() {
    setStartQuiz((prevState) => !prevState);
  }

  function playGameAgain() {
    setPlayAgain((prevState) => !prevState);
    setAnswerCheck((prevState) => !prevState);
  }
  console.log(allQuestion);

  return (
    <div className="container">
      {!startQuiz && <div>{questionElement}</div>}
      {!startQuiz && (
        <div className="result">
          {answerCheck && <h3>You scored {score}/5 correct answers</h3>}
          <button onClick={!answerCheck ? checkAnswers : playGameAgain}>
            {!answerCheck ? 'Check answers' : 'Play again'}
          </button>
        </div>
      )}
      {startQuiz && startPage()}
    </div>
  );
}
