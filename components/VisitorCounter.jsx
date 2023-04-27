import { useState, useEffect } from "react";
import ReactGA from "react-ga";

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    ReactGA.initialize("G-YK84T7HFKW");
    ReactGA.pageview("/");

    const intervalId = setInterval(() => {
      setVisitorCount((prevCount) => prevCount + 1);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>방문자 수: {visitorCount}</div>;
}

export default VisitorCounter;
