import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Danger } from "iconsax-reactjs";
import toast, { Toaster } from "react-hot-toast";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // نمایش toast
    toast.error("Payment Failed! Please try again.", {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
      duration: 4000,
    });

    // شمارش معکوس
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    // ریدایرکت بعد از 5 ثانیه
    const redirectTimer = setTimeout(() => {
      navigate("/menu");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center py-20 justify-center text-red-500 px-6 min-h-screen">
      <Toaster />
      <div className="flex flex-col items-center animate-pulse">
        <Danger size={120} variant="Bulk" color="#fb2c36" className="mb-4" />
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 animate-shake">
          Payment Failed
        </h1>
        <p className="text-white/80 text-lg font-light sm:text-xl text-center max-w-xl mb-6">
          Something went wrong with your order. Please try again or contact
          support if the problem persists.
        </p>

        <Link to="/menu" className="btn btn-error mt-2 rounded-full mb-4">
          Back to Menu
        </Link>

        <p className="text-white/60 text-sm sm:text-base">
          Redirecting to menu in {countdown} second{countdown !== 1 ? "s" : ""}
          ...
        </p>
      </div>
    </div>
  );
}
