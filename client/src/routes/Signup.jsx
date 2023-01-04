import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const formSubmission = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json()

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="singup-form">
      <form onSubmit={formSubmission}>
        <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Sign Up</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
