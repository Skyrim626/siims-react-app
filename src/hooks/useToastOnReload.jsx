import { useEffect } from "react";
import { toast } from "react-toastify";

const useToastOnReload = () => {
  useEffect(() => {
    // Check if there's a toast message in sessionStorage
    const toastMessage = sessionStorage.getItem("toastMessage");

    if (toastMessage) {
      toast.success(toastMessage);

      // Remove the message from sessionStorage after displaying
      sessionStorage.removeItem("toastMessage");
    }
  }, []);
};

export default useToastOnReload;
