import { useState } from "react";
import api from "./api";
import Register from "./Register";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  if (isRegistering) {
    return <Register setIsRegistering={setIsRegistering} />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          background: "#f1f5f9",
          borderRadius: "8px",
        }}
      >
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
        />

        <button onClick={handleLogin} style={{ width: "100%" }}>
          Login
        </button>

        <p
          style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
          onClick={() => setIsRegistering(true)}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;
