import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import socketModule from "../socket.jsx";

function Page1() {
  useEffect(() => {
    // Listen for "message" when this component is mounted
    socketModule.on("message", handleMyEvent);

    return () => {
      // Unregister the "message" listener when this component is unmounted
      socketModule.off("message", handleMyEvent);
    };
  }, []);

  const handleMyEvent = (data) => {
    console.log(`Received data: ${data.message}`);
  };

  const handleClick = () => {
    // Send a "message" event when the button is clicked
    socketModule.emit("message", { message: "Hello!" });
  };

  return (
    <>
      <h1>Page1</h1>
      <button onClick={handleClick}>Send Event</button>
      <Link to="/">gotohome</Link>
      <Link to="/page2">gotopage2</Link>
    </>
  );
}

export default Page1;
