import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", email); // Save email as username for now
        navigate("/"); // Redirect to the home page
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
