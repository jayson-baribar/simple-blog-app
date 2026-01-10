import Page from "../components/layout/Page";
import { useState } from "react";
import utils from "../utils/validators";
import { supabase } from "../lib/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const usernameMin = 6;
  const usernameMax = 64;

  const passwordMin = 8;
  const passwordMax = 16;


  const handleLogin = async (e: React.FormEvent) => {
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

    const { error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
    })

    if ( error ){
        alert(error.message)
    }

    const { data } = await supabase.auth.getUser();
    dispatch(setUser(data.user));
    
    alert("Login Successful")
    window.location.href = "/profile";
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