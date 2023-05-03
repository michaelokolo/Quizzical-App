import React from 'react';
import { nanoid } from 'nanoid';
function Question(props) {
  console.log(props.correct_answer);
  return (
    <div className="question-container">
      <h3 className="question">{props.question}</h3>
      <div className="options">
        <p onClick={props.handleAllClick} id={nanoid()}>
          {props.answers[0]}
        </p>
        <p onClick={props.handleAllClick} id={nanoid()}>
          {props.answers[1]}
        </p>
        <p onClick={props.handleAllClick} id={nanoid()}>
          {props.answers[2]}
        </p>
        <p onClick={props.handleAllClick} id={nanoid()}>
          {props.answers[3]}
        </p>
      </div>
    </div>
  );
}

export default Question;
