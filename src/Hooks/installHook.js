import { useEffect } from "react";
import ReactDOM from "react-dom/client";

function HookRunner({ callback }) {
  useEffect(() => {
    let cleanupFn;

    if (callback && typeof callback === "function") {
      cleanupFn = callback();
    }

    return () => {
      if (typeof cleanupFn === "function") cleanupFn();
    };
  }, [callback]);

  return null;
}

/**
 *
 * @param {Function} callback
 * @returns {Function}
 */

export function installHook(callback) {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<HookRunner callback={callback} />);

  return () => {
    root.unmount();
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };
}
