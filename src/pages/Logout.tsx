import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      dispatch(clearUser());

      setToast({ message: "Logged out successfully", type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    };

    logout();
  }, []);

  return (
    <>
      <p className="text-center mt-10">Logging out...</p>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Logout;
