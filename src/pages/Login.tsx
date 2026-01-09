import Page from "../components/layout/Page";
import { useState } from "react";
import Utils from "../utils/validators";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (Utils.isBlank(username)) {
      alert("Username is required.");
      return;
    }

    if (!Utils.isPasswordValid(password)) {
      alert("Password must be 8-16 characters long.");
      return;
    }

    console.log("User logged in:", { username, password });
    alert("Login validation passed!");
  };

  return (
    <Page>
      <h1>Welcome back</h1>
      <p>Log in to continue writing your stories.</p>

      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </Page>
  );
};

export default Login;