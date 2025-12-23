import { useEffect, useState, useRef } from "react";
import { Eye, EyeSlash, Lock, Google, User } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { Call } from "iconsax-reactjs";
import { toast } from "react-hot-toast";

export default function SignInForm() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    phoneNumber: "",
    password: "",
  });

  const tokenClientRef = useRef(null);

  /* ---------------- Load saved user ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("local_user") || "null");
    if (saved) {
      setForm({
        userName: saved.userName || "",
        phoneNumber: saved.phoneNumber || "",
        password: saved.password || "",
      });
    }
  }, []);

  /* ---------------- Helpers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, phoneNumber, password } = form;

    if (!userName.trim()) {
      toast.error("Please enter a username.");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    let user =
      users.find(
        (u) => u.phoneNumber === phoneNumber && u.provider === "local"
      ) || null;

    if (!user) {
      user = {
        id: crypto.randomUUID(),
        phoneNumber,
        name: userName,
        provider: "local",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      user.name = userName;
    }

    localStorage.setItem(
      "local_user",
      JSON.stringify({ userName, phoneNumber, password })
    );

    setUser(user);
    toast.success(`Welcome ${userName}!`);
    navigate("/");
  };

  /* ---------------- Google (placeholder) ---------------- */
  const handleGoogleClick = () => {
    toast.error("Google login is not implemented yet.");
  };

  /* ---------------- Render ---------------- */
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 my-8 px-4">
      {/* Form */}
      <div className="w-full max-w-md bg-base-300 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary mb-2">Sign In</h2>
        <p className="text-gray-400 mb-4">
          Enter your username, phone number and password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Your username"
                className="w-full pl-10 py-3 rounded-lg bg-neutral-700 border border-neutral-600 focus:border-secondary outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Call
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="09xxxxxxxxx"
                className="w-full pl-10 py-3 rounded-lg bg-neutral-700 border border-neutral-600 focus:border-secondary outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-neutral-700 border border-neutral-600 focus:border-secondary outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-400"
              >
                {passwordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot password (NO #) */}
          <div className="text-right">
            <Link
              to="/forgot-Password"
              type="button"
              className="text-sm text-secondary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-secondary w-full">
            Sign In
          </button>

          <span className="divider">or</span>

          <button
            type="button"
            onClick={handleGoogleClick}
            className="flex items-center justify-center gap-3 w-full py-3 border border-neutral-600 rounded-lg"
          >
            <Google size={20} variant="Bulk" color="#EA4335" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already registered?{" "}
            <Link to="/LoginForm" className="text-secondary">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Image */}
      <img
        src="/image/SignIn.svg"
        alt="Sign in"
        className="w-full sm:w-2/3 lg:w-[420px]"
      />
    </section>
  );
}
