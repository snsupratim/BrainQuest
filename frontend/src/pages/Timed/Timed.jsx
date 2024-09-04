import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Timed = () => {
  const history = useHistory();
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      history.push("/end");
    }, 600000); // Redirect after 10 minutes (600000 milliseconds)

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [history]);

  return (
    <div>
      <h1>Timed Page</h1>
      <p>You will be redirected in {timeLeft} seconds...</p>
    </div>
  );
};

export default Timed;
