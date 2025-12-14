import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    className: "rounded-2xl",
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
};

// Error Toast
export const showErrorToast = (message) => {
  toast.error(message, {
    className: "rounded-2xl",
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
};

// Info Toast
export const showInfoToast = (message) => {
  toast.info(message, {
    className: "rounded-2xl",
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
};

export default function ToastProvider() {
  return <ToastContainer />;
}
