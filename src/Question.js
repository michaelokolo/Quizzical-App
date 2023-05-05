import React from 'react';

function Question(props) {
  return (
    <div className="question-container">
      <h3 className="question">{props.question}</h3>
      <div className="options">
        <p>{props.answers[0]}</p>
        <p>{props.answers[1]}</p>
        <p>{props.answers[2]}</p>
        <p>{props.answers[3]}</p>
      </div>
    </div>
  );
}

export default Question;
