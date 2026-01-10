import Page from "../components/layout/Page";
import { useState } from "react";
import utils from "../utils/validators";
import { supabase } from "../lib/supabase";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameMin = 6;
  const usernameMax = 64;

  const passwordMin = 8;
  const passwordMax = 16;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (utils.isBlank(username) || utils.isBlank(password)) {
      alert("Username and password are required.");
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

    const { error } = await supabase.auth.signUp({
      email: username,
      password: password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful! You can now log in.");
      window.location.href = "login";
    }
  };

  return (
    <Page>
      <h1>Create an account and start your blogs now!</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" email"
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

        <button type="submit">Register</button>
      </form>
    </Page>
  );
};

export default Register;