import { useState } from "react";
import Login from "./Login.jsx";
import Board from "./Board.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [currentView, setCurrentView] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return currentView === "dashboard" ? (
    <Dashboard setIsLoggedIn={setIsLoggedIn} setCurrentView={setCurrentView} />
  ) : (
    <Board setIsLoggedIn={setIsLoggedIn} setCurrentView={setCurrentView} />
  );
}

export default App;