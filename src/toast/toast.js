import { toast } from "react-toastify";

const errorToast = (errorMsg) => toast.error(errorMsg, {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
  });

  export {errorToast}