import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
// import CreateBlog from "./pages/CreateBlog";
// import EditBlog from "./pages/EditBlog";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearUser, setUser } from "./store/authSlice";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const restoreSession = async () => {
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          dispatch(setUser(data.user));
        } else {
          dispatch(clearUser());
        }
      };

      restoreSession();
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/edit/:id" element={<EditBlog />} /> */}
        <Route path="/logout" element={<Logout/>} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );

};

export default App;
