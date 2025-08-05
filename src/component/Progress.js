function Progress({ index, questionNum, score, maxScore, answer }) {
  return (
    <header className="progress">
      <progress
        max={questionNum}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question {index + 1} / {questionNum}{" "}
      </p>
      <p>
        {score}/{maxScore}
      </p>
    </header>
  );
}

export default Progress;
