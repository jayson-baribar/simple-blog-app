import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";

const Navbar = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 bg-gray-200 text-gray-800 text-2xl px-3 py-2 rounded-md shadow md:hidden"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar / Desktop Navbar */}
      <nav
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-gray-100 text-gray-800 z-50
        flex flex-col gap-4 p-6 transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
        
        md:translate-x-0 md:static md:h-auto md:w-full md:max-w-none
        md:flex-row md:justify-end md:items-center md:gap-6 md:p-4
        md:bg-gray-100 md:shadow`}
      >
        <Link
          to="/blogs"
          className="bg-gray-200 p-3 rounded-md text-center hover:bg-gray-300 md:bg-transparent md:hover:underline"
          onClick={() => setOpen(false)}
        >
          Blogs
        </Link>

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="bg-gray-200 p-3 rounded-md text-center hover:bg-gray-300 md:bg-transparent md:hover:underline"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gray-200 p-3 rounded-md text-center hover:bg-gray-300 md:bg-transparent md:hover:underline"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link
              to="/profile"
              className="bg-gray-200 p-3 rounded-md text-center hover:bg-gray-300 md:bg-transparent md:hover:underline"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>

            <Link
              to="/logout"
              className="bg-gray-200 p-3 rounded-md text-center hover:bg-gray-300 md:bg-transparent md:hover:underline"
              onClick={() => setOpen(false)}
            >
              Logout
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
