import { useState } from "react";
import { Call } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      toast.error("Please enter phone number", { position: "top-center" });
      return;
    }

    setLoading(true);

    // ⏳ شبیه‌سازی ارسال OTP
    setTimeout(() => {
      setLoading(false);
      toast.success("OTP sent successfully!", { position: "top-center" });
      navigate("/verify-code", {
        state: { phoneNumber },
      });
    }, 1200);
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 my-8 px-4">
      <Toaster />
      {/* Form Section */}
      <div className="w-full max-w-md bg-base-300 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary mb-2">
          Forgot password
        </h2>
        <p className="text-gray-400 mb-8">
          Please enter your Phone Number to reset the password
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <Call
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
                variant="Outline"
              />
              <input
                id="phoneNumber"
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="•••••••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none transition"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn btn-secondary font-normal rounded-lg transition disabled:opacity-60 flex justify-center items-center"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>

      {/* Image Section */}
      <img
        src="/image/Forgot password-pana.svg"
        alt="Forgot Password"
        className="w-full sm:w-2/3 md:w-1/2 lg:w-[420px] xl:w-[480px] max-w-full rounded-2xl mb-6 lg:mb-0"
      />
    </section>
  );
}
