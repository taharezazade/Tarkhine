// toastUtils.js
import toast, { Toaster } from "react-hot-toast";

// Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      borderRadius: "12px",
      background: "#333",
      color: "#fff",
      padding: "16px",
    },
    position: "top-center",
    duration: 3000,
  });
};

// Error Toast
export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      borderRadius: "12px",
      background: "#333",
      color: "#fff",
      padding: "16px",
    },
    position: "top-center",
    duration: 3000,
  });
};

// Info Toast
export const showInfoToast = (message) => {
  toast(message, {
    style: {
      borderRadius: "12px",
      background: "#333",
      color: "#fff",
      padding: "16px",
    },
    position: "top-center",
    duration: 3000,
  });
};

// Toaster Component
export default function ToastProvider() {
  return <Toaster />;
}
