import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const phoneNumber = location.state?.phoneNumber;

  const notify = () => toast.success("The code was resent.");

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/forgot-password");
    }
  }, [phoneNumber, navigate]);

  const handleVerify = (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    navigate("/reset-password", {
      state: { phoneNumber },
    });
  };

  return (
    <>
      {/* Toaster باید رندر بشه */}
      <Toaster position="top-center" reverseOrder={false} />

      <section className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-md bg-base-300 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-semibold text-secondary mb-2">
            Verify Code
          </h2>

          <p className="text-gray-400 mb-6 text-start">
            A 6-digit code has been sent to &nbsp;
            <span className="text-secondary font-medium">
              *******{phoneNumber?.slice(-4)}
            </span>
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="input-md w-full text-center focus:input-secondary bg-white/5 tracking-widest text-xl input-ghost input"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 btn btn-secondary rounded-lg"
            >
              Verify Code
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Didn’t receive the code?{" "}
            <button
              type="button"
              className="text-secondary hover:underline"
              onClick={notify}
            >
              Resend
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
