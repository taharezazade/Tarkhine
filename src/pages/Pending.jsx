import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Pending() {
  useEffect(() => {
    toast.loading("Your order is being processed...", {
      position: "top-center",
      duration: 2000,
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-white px-6">
      <Toaster />
      <h1 className="text-4xl font-bold text-blue-400 mb-4">Processing...</h1>
      <p className="text-white/70 text-lg">Your order is being processed.</p>
    </div>
  );
}
