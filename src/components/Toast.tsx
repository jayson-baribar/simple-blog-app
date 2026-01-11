import { useEffect } from "react";

type ToastProps = {
    message: string,
    type?: "success" | "error",
    onClose: () => void;
}

const Toast = ({ message, type = "success", onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md text-white shadow-lg
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
};

export default Toast;