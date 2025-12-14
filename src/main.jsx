import { createRoot } from "react-dom/client";
import "./Style/App.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/UserContext";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>
);
