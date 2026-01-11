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
        className="fixed top-4 right-4 z-50 bg-black text-white text-2xl px-3 py-2 rounded-md"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-black text-white z-50
        flex flex-col gap-4 p-6 transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <Link to="/blogs" className="bg-neutral-800 p-3 rounded-md text-center" onClick={() => setOpen(false)}>
          Blogs
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className="bg-neutral-800 p-3 rounded-md text-center" onClick={() => setOpen(false)}>
              Login
            </Link>

            <Link to="/register" className="bg-neutral-800 p-3 rounded-md text-center" onClick={() => setOpen(false)}>
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="bg-neutral-800 p-3 rounded-md text-center" onClick={() => setOpen(false)}>
              Profile
            </Link>

            <Link to="/logout" className="bg-neutral-800 p-3 rounded-md text-center" onClick={() => setOpen(false)}>
              Logout
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
