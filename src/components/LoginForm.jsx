import { useState } from "react";
import { Eye, EyeSlash, Lock, Sms, Google } from "iconsax-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email format");
      return;
    }

    // شبیه‌سازی درخواست لاگین
    toast.success("Login submitted successfully!");
    console.log("Email:", email, "Password:", password);
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 my-8 px-4">
      <Toaster position="top-right" />

      {/* Form Section */}
      <div className="w-full max-w-md bg-base-300 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary text-start mb-2">
          Login
        </h2>
        <p className="text-gray-400 text-start mb-8">
          Enter your credentials to login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Sms
                  size="20"
                  className="absolute left-3 top-3.5 text-gray-400"
                  variant="Outline"
                />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size="20"
                  className="absolute left-3 top-3.5 text-gray-400"
                  variant="Outline"
                />
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none transition"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-gray-400 hover:text-secondary transition"
                >
                  {passwordVisible ? (
                    <Eye size="20" variant="Outline" />
                  ) : (
                    <EyeSlash size="20" variant="Outline" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-Password"
              className="text-sm text-secondary hover:text-secondary transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-secondary text-secondary-content font-normal rounded-lg transition"
          >
            Login
          </button>

          {/* Divider */}
          <span className="divider">or continue with</span>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => toast("Login with Google")}
              className="flex items-center justify-center w-full gap-3 py-3 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition"
            >
              <Google size="20" variant="Bulk" color="#EA4335" />
              <span className="text-gray-200">Google</span>
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Not registered yet?{" "}
            <Link
              to="/SignInForm"
              className="text-secondary hover:text-secondary font-medium transition"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <img
        src="/image/Login.svg"
        alt="Login"
        className="w-full sm:w-2/3 md:w-1/2 lg:w-[420px] xl:w-[480px] max-w-full rounded-2xl mb-6 lg:mb-0"
      />
    </section>
  );
}
