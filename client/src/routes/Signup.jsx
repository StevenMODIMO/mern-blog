import { useState } from "react";
import "./Form.css";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { GoAlert } from 'react-icons/go'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const formSubmission = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmail("")
      setPassword("")
    }

    if (response.ok) {
      setError(null);
      setEmail("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return (
    <div className="forms">
      <form onSubmit={formSubmission} className="signup-form form" onFocus={() => {
        setError(null)
      }}>
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="social">
        <div className="alert">
          <GoAlert className="alert-icon" />
          <div>Disabled due to Technical issues</div>
        </div>
        <div className="social-links">
          <FcGoogle className="social-icons" />
          <div>Continue with Google</div>
        </div>
        <div className="social-links">
          <BsFacebook className="social-icons" />
          <div>Continue with Facebook</div>
        </div>
        <div className="social-links">
          <BsTwitter className="social-icons" />
          <div>Continue with Twitter</div>
        </div>
        
      </div>
    </div>
  );
}
