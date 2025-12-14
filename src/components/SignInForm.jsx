import { useEffect, useState, useRef } from "react";
import { Eye, EyeSlash, Lock, Google, User } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { showSuccessToast, showErrorToast } from "../Utils/ToastProvider";
import { Call } from "iconsax-reactjs";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const GOOGLE_SCOPES = "openid email profile";

export default function SignInForm() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const tokenClientRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("local_user") || "null");
    if (saved) {
      setPhoneNumber(saved.phoneNumber || "");
      setPassword(saved.password || "");
      setUserName(saved.userName || "");
    }
  }, []);

  const togglePassword = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName) {
      showErrorToast("Please enter a username.");
      return;
    }

    if (!phoneNumber) {
      showErrorToast("Please enter your phone number.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find(
      (u) => u.phoneNumber === phoneNumber && u.provider === "local"
    );

    let localUser;
    if (exists) {
      localUser = { ...exists, name: userName };
    } else {
      localUser = {
        phoneNumber,
        password,
        name: userName,
        provider: "local",
        createdAt: new Date().toISOString(),
      };
      users.push(localUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem(
      "local_user",
      JSON.stringify({ phoneNumber, password, userName })
    );
    setUser(localUser);
    showSuccessToast(`Welcome ${userName}!`);
    navigate("/");
  };

  const handleGoogleClick = () => {
    if (!tokenClientRef.current) {
      showErrorToast(
        "Google client not initialized yet. Try again in a second."
      );
      return;
    }
    tokenClientRef.current.requestAccessToken({ prompt: "select_account" });
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 my-8 px-4">
      <div className="w-full max-w-md bg-base-300 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary text-start mb-2">
          Sign In
        </h2>
        <p className="text-gray-400 text-start mb-2">
          Enter your phone number, username and password
        </p>

        {message && (
          <div className="bg-neutral-800 p-3 rounded-md text-sm mb-3">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div className="w-full">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <User
                size="20"
                className="absolute left-3 top-3.5 text-gray-400"
                variant="Outline"
              />
              <input
                id="userName"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your username"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none transition"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Call
                size="20"
                className="absolute left-3 top-3.5 text-gray-400"
                variant="Outline"
              />
              <input
                id="phoneNumber"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="09xxxxxxxxx"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none transition"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-500 border border-neutral-600 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none transition"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-400 hover:text-secondary transition">
                {passwordVisible ? (
                  <Eye size="20" variant="Outline" />
                ) : (
                  <EyeSlash size="20" variant="Outline" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-secondary hover:text-secondary transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full btn btn-secondary cursor-pointer py-3 bg-secondary text-secondary-content font-normal rounded-lg transition">
            Sign In
          </button>

          <span className="divider">or continue with</span>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleGoogleClick}
              className="flex items-center cursor-pointer justify-center w-full gap-3 py-3 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition">
              <Google size="20" variant="Bold" color="#EA4335" />
              <span className="text-gray-200">Google</span>
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already registered?{" "}
            <Link
              to="/LoginForm"
              className="text-secondary hover:text-secondary font-medium transition">
              Login to account
            </Link>
          </p>
        </form>
      </div>

      <img
        src="/image/SignIn.svg"
        alt="Login"
        className="w-full sm:w-2/3 md:w-1/2 lg:w-[420px] xl:w-[480px] max-w-full rounded-2xl mb-6 lg:mb-0"
      />
    </section>
  );
}
