import React from 'react';
import { nanoid } from 'nanoid';

function Question(props) {
  const answers = props.question.answers;
  const answerElement = answers.map((answer) => {
    return (
      <p
        className={
          props.answerCheck && props.selected_answer === answer
            ? 'correct'
            : props.answerCheck && !props.selected_answer === answer
            ? 'wrong'
            : props.selected_answer === answer
            ? 'answer'
            : ''
        }
        onClick={() => props.selected(answer, props.id)}
        key={nanoid()}
      >
        {answer}
      </p>
    );
  });

  console.log(props.answerCheck);

  return (
    <div className="question-container">
      <h3 className="question">{props.question.question}</h3>
      <div className="options">{answerElement}</div>
    </div>
  );
}

export default Question;
