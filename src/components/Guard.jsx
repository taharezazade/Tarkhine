import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function HashGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;

    if (url.endsWith("#") || url.includes("#")) {
      toast.error("Invalid URL detected. Redirecting to 404 page.", {
        position: "top-center",
      });
      navigate("/404", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
