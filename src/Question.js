import React from 'react';
import { nanoid } from 'nanoid';

function Question(props) {
  const answers = props.question.answers;
  const answerElement = answers.map((answer) => {
    const beforeChecked = () => {
      // if (props.selected_answer === answer) {
      //   return 'answer';
      // } else {
      //   return '';
      // }
      return props.selected_answer === answer ? 'answer' : '';
    };
    const afterChecked = () => {
      if (
        props.selected_answer === answer &&
        props.selected_answer === props.correct
      ) {
        return 'correct';
      } else if (
        props.selected_answer === answer &&
        props.selected_answer !== props.correct
      ) {
        return 'wrong';
      } else if (props.selected_answer !== answer && props.correct === answer) {
        return 'correct';
      } else if (
        props.selected_answer !== answer &&
        props.selected_answer !== props.correct
      ) {
        return '';
      }
    };

    return (
      <p
        className={!props.answerCheck ? beforeChecked() : afterChecked()}
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
