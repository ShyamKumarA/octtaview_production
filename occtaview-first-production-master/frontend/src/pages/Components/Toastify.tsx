import { toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ShowToastProps {
  message: string;
  type: boolean;
}

export const Show_Toast: React.FC<ShowToastProps> = ({ message, type }) => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  if (type) {
    toast.success(message, toastOptions);
  } else {
    toast.error(message, toastOptions);
  }

  return null; // Since it's not rendering any JSX, return null
};
