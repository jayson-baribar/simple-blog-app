import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
// import CreateBlog from "./pages/CreateBlog";
// import EditBlog from "./pages/EditBlog";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/protectedRoutes";

const App = () => {
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
        <Route path="/profile" element={<Profile />} />


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
