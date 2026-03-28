import { useState } from "react";
import api from "./api";
import Register from "./Register";
import { Mail, Lock, LogIn } from "lucide-react";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
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
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (isRegistering) {
    return <Register setIsRegistering={setIsRegistering} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-slate-400 mt-2">Manage your tasks efficiently</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700 shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-slate-300 text-sm font-semibold mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-slate-300 text-sm font-semibold mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> {loading ? "Logging in...  " : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => setIsRegistering(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Register
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          © 2024 TaskFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;