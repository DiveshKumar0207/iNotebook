import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast Handler
const showToast = (message, type = "info", options = {}) => {
  const defaultOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options, // Allow customization for individual toast
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "warn":
      toast.warn(message, defaultOptions);
      break;
    case "info":
      toast.info(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }
};

// Export ToastContainer and showToast together
export { ToastContainer, showToast };
