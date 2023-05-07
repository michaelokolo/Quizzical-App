import React from 'react';

function Question(props) {
  const answers = props.question.answers;
  const answerElement = answers.map((answer) => {
    return <p>{answer}</p>;
  });
  return (
    <div className="question-container">
      <h3 className="question">{props.question.question}</h3>
      <div className="options">{answerElement}</div>
    </div>
  );
}

export default Question;
