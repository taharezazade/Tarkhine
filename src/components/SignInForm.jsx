import { useEffect, useState, useRef } from "react";
import { Eye, EyeSlash, Sms, Lock, Google } from "iconsax-react";
import { Link } from "react-router";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const GOOGLE_SCOPES = "openid email profile";

export default function SignInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const tokenClientRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("local_user") || "null");
    if (saved) {
      setEmail(saved.email || "");
      setPassword(saved.password || "");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptId = "google-identity-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);

      script.onload = () => {
        initTokenClient();
      };
    } else {
      initTokenClient();
    }

    function initTokenClient() {
      if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.oauth2
      ) {
        console.warn("Google Identity Services not ready yet.");
        return;
      }

      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
        callback: async (tokenResponse) => {
          if (!tokenResponse || tokenResponse.error) {
            setMessage("Google sign-in failed or was cancelled.");
            return;
          }

          try {
            const res = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              }
            );
            const profile = await res.json();

            // Create or update local account based on Google profile
            createOrUpdateLocalAccountFromGoogle(
              profile,
              tokenResponse.access_token
            );
          } catch (err) {
            console.error(err);
            setMessage("Failed to fetch Google profile.");
          }
        },
      });
    }
  }, []);

  const togglePassword = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    const localUser = { email, password };
    localStorage.setItem("local_user", JSON.stringify(localUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === email && !u.provider);
    if (!exists) {
      users.push({
        email,
        password,
        provider: "local",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("users", JSON.stringify(users));
    }

    setMessage(
      "Saved locally. (This demo stores credentials in localStorage.)"
    );
    console.log("Sign In Submitted", localUser);
  };

  const handleGoogleClick = () => {
    setMessage("");
    if (!tokenClientRef.current) {
      setMessage("Google client not initialized yet. Try again in a second.");
      return;
    }

    tokenClientRef.current.requestAccessToken({ prompt: "select_account" });
  };

  function createOrUpdateLocalAccountFromGoogle(profile, accessToken) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const googleUser = {
      id: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: "google",
      accessToken,
      createdAt: new Date().toISOString(),
    };

    const idx = users.findIndex(
      (u) => u.provider === "google" && u.id === profile.sub
    );
    if (idx === -1) users.push(googleUser);
    else users[idx] = { ...users[idx], ...googleUser };

    localStorage.setItem("users", JSON.stringify(users));
    setMessage(`Signed in as ${profile.email} — saved to local users.`);
    console.log("Google profile saved to local users:", googleUser);
  }

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 my-8 px-4">
      {/* Form Section */}
      <div className="w-full max-w-md bg-base-300 rounded-2xl p-6 shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-secondary text-start mb-2">
          Sign In
        </h2>
        <p className="text-gray-400 text-start mb-2">
          Enter your email and password to access your account
        </p>

        {message && (
          <div className="bg-neutral-800 p-3 rounded-md text-sm mb-3">
            {message}
          </div>
        )}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-secondary hover:text-secondary transition">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-secondary text-secondary-content font-normal rounded-lg transition">
            Sign In
          </button>

          {/* Divider */}
          <span className="divider">or continue with</span>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleGoogleClick}
              className="flex items-center cursor-pointer justify-center w-full gap-3 py-3 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition">
              <Google size="20" variant="Bold" color="#EA4335" />
              <span className="text-gray-200">Google</span>
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm mt-6">
            You Registered?{" "}
            <Link
              to="/LoginForm"
              className="text-secondary hover:text-secondary font-medium transition">
              Login to account
            </Link>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <img
        src="/image/SignIn.svg"
        alt="Login"
        className="w-full sm:w-2/3 md:w-1/2 lg:w-[420px] xl:w-[480px] max-w-full rounded-2xl mb-6 lg:mb-0"
      />
    </section>
  );
}
