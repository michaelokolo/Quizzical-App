import React from 'react';

function Question(props) {
  return (
    <div className="question-container">
      <h3 className="question">{props.question}</h3>
      <div className="options">
        <p>{props.correct_answer}</p>
        <p>{props.incorrect_answer1}</p>
        <p>{props.incorrect_answer2}</p>
        <p>{props.incorrect_answer3}</p>
      </div>
    </div>
  );
}

export default Question;
