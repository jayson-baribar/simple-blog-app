import Page from "../components/layout/Page";
import { useState } from "react";
import utils from "../utils/validators";
import { supabase } from "../lib/supabase";
import Toast  from "../components/Toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ toast, setToast ] = useState<{message: string; type?: 
  "success"| "error" } | null> (null);

  const usernameMin = 6;
  const usernameMax = 64;
  const passwordMin = 8;
  const passwordMax = 16;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (utils.isBlank(username) || utils.isBlank(password)) {
      // alert("Username and password are required.");
      setToast({message: `Username and password are required.`, type: "error"});
      return;
    }

    if (
      utils.isTooShort(username, usernameMin) ||
      utils.isTooLong(username, usernameMax)
    ) {
      // alert(`Your username must be ${usernameMin}-${usernameMax} characters.`);
      setToast({message: `Your username must be ${usernameMin}-${usernameMax} characters.`, type: "error"})
      return;
    }

    if (
      utils.isTooShort(password, passwordMin) ||
      utils.isTooLong(password, passwordMax)
    ) {
      // alert(`Your password must be ${passwordMin}-${passwordMax} characters.`);
      setToast({message: `Your password must be ${passwordMin}-${passwordMax} characters.`, type: "error"})
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: username,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      // alert("Registration successful! You can now log in.");
      setToast({message: `Registration successful! You can now log in.`})
      setUsername("");
      setPassword("");

    }
  };

  return (
    <Page>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
        >
          <h1 className="text-xl font-bold text-center">
            Create an account
          </h1>

          <p className="text-sm text-gray-600 text-center">
            Start sharing your blogs today
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@example.com"
              className="border rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Register
          </button>
        </form>
      </div>

            {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Page>
  );
};

export default Register;
