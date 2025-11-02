import { useState } from "react";
import { Eye, EyeSlash, Lock, Sms, Google } from "iconsax-react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted");
  };

  return (
    <section className="flex items-center justify-center my-4">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-emerald-400 text-start mb-2">
          Login
        </h2>
        <p className="text-gray-400 text-start mb-8">
          Enter your credentials to login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-gray-400 hover:text-emerald-400 transition">
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
            <a
              href="#"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-emerald-950 font-normal rounded-lg transition">
            Login
          </button>

          {/* Divider */}
          <span className="divider text-gray-400 block text-center my-4">
            or continue with
          </span>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => console.log("Login with Google")}
              className="flex items-center justify-center w-full gap-3 py-3 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition">
              <Google size="20" variant="Bold" color="#EA4335" />
              <span className="text-gray-200">Google</span>
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Not registered yet?{" "}
            <Link
              to="/SignInForm"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
