import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";

const Logout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      dispatch(clearUser());
      window.location.href = "/login";
    });
  }, []);

  
  return <p>Logging out...</p>;
};

export default Logout;
