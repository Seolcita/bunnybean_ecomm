/** @format */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(3);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => --count);
    }, 1000);
    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="loadingToRedirect">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
}

export default LoadingToRedirect;
