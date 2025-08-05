import { useEffect } from "react";

function Timer({ dispatch, remainingTime }) {
  const min = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(timer);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min} : {seconds < 10 ? "0" : ""} {seconds}
    </div>
  );
}

export default Timer;
