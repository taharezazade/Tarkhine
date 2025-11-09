// src/Hooks/useCurrentPath.js
import { useLocation } from "react-router-dom";

export default function useCurrentPath() {
  const { pathname } = useLocation();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Tarkhine Restaurant 🍽️";
      case "/menu":
        return "Menu | Tarkhine";
      case "/representation":
        return "Representation | Tarkhine";
      case "/about":
        return "About Us | Tarkhine";
      case "/contact":
        return "Contact Us | Tarkhine";
      case "/profile":
        return "Profile | Tarkhine";
      case "/cart":
        return "Your Cart | Tarkhine";
      case "/search":
        return "Search | Tarkhine";
      case "/SignInForm":
        return "Sign In | Tarkhine";
      case "/LoginForm":
        return "Login | Tarkhine";
      default:
        return "Tarkhine";
    }
  };

  return {
    pathname,
    title: getPageTitle(),
  };
}
