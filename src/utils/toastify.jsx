import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Show Success Alert
export const showSuccessAlert = (message) => {
  const notify = () =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  notify();
};

// Show Warning Alert
export const showFailedAlert = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};
