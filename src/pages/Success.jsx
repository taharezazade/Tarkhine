import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TickSquare } from "iconsax-reactjs";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0)); // هیچ وقت کمتر از صفر نشه
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/menu");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center py-20 justify-center text-green-500 px-6 min-h-screen">
      <div className="flex flex-col items-center animate-pulse">
        <TickSquare
          size={120}
          variant="Bulk"
          color="#00d084"
          className="mb-4"
        />
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 animate-pulse">
          Payment Successful
        </h1>
        <p className="text-white/80 text-lg font-light sm:text-xl text-center max-w-xl mb-6">
          Your order has been successfully placed. Thank you for choosing us!
        </p>

        <Link to="/menu" className="btn btn-success mt-2 rounded-full mb-4">
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
