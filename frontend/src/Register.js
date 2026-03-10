import { useState } from "react";
import api from "./api";

function Register({ setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Registration successful. Please login.");
      setIsRegistering(false);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

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
        <h2>Register</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
        />

        <button onClick={handleRegister} style={{ width: "100%" }}>
          Register
        </button>

        <p
          style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
          onClick={() => setIsRegistering(false)}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;
