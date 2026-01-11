import Page from "../components/layout/Page";
import { useState } from "react";
import utils from "../utils/validators";
import { supabase } from "../lib/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = await supabase.auth.getUser();
    dispatch(setUser(data.user));
    alert("Login Successful");
    navigate("/profile");
  };

  return (
    <Page>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </Page>
  );
};

export default Login;