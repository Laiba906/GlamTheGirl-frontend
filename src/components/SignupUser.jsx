import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, address, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");  // Navigate to the login page after successful signup
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
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
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
