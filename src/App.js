import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import "./App.css";
import { useEffect, useReducer } from "react";
import Question from "./component/Question";
import NextButton from "./component/NextButton";
import Progress from "./component/Progress";
import FinishedScreen from "./component/FinishedScreen";
import Timer from "./component/Timer";

const secPerQues = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  remainingTime: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingTime: state.questions.length * secPerQues,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "quizEnd":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [{ questions, status, index, answer, score, remainingTime }, dispatch] =
    useReducer(reducer, initialState);

  const maxScore = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionNum={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionNum={questions.length}
              score={score}
              maxScore={maxScore}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} remainingTime={remainingTime} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              questionNum={questions.length}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            score={score}
            maxScore={maxScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
