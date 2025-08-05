function FinishedScreen({ score, maxScore, dispatch }) {
  const percentage = (score / maxScore) * 100;
  return (
    <>
      <p className="result">
        You scored {score} out of {maxScore} ({Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
