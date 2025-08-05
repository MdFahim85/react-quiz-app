function NextButton({ dispatch, answer, index, questionNum }) {
  if (answer === null) return null;

  if (index < questionNum - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === questionNum - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quizEnd" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
