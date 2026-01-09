import Page from "../components/layout/Page";
import { useState } from "react";
import utils from "../utils/validators";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameMin = 6;
  const usernameMax = 20;

  const passwordMin = 8;
  const passwordMax = 16;

  const handleRegister = (e: React.FormEvent) => {

    e.preventDefault();

    if (utils.isBlank(username)) {
      alert("Username is required.");
      return;
    }

    if (
      utils.isTooShort(username, usernameMin) ||
      utils.isTooLong(username, usernameMax)
    ) {
      alert(`Your username must be ${usernameMin}-${usernameMax} characters.`);
      return;
    }

    if (
      utils.isTooShort(password, passwordMin) ||
      utils.isTooLong(password, passwordMax)
    ) {
      alert(`Your password must be ${passwordMin}-${passwordMax} characters.`);
      return;
    }

    console.log("User registered:", { username, password });
    alert("Validation passed! Ready for Supabase integration.");
  };

  return (
    <Page>
      <h1>Create an account and start your blogs now!</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </Page>
  );
};

export default Register;