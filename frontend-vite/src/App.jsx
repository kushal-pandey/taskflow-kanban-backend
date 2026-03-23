import { useState } from "react";
import Login from "./Login.jsx";
import Board from "./Board.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return <Board setIsLoggedIn={setIsLoggedIn} />;
}

export default App;