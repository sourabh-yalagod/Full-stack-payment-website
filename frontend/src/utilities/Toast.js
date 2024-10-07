import { toast } from "sonner";
const ToastSuccess = (message = "Successfully Done.") => {
  return toast(message);
};
const ToastWarning = (message = "Failed try Again.") => {
  return toast.warning(message);
};

export { ToastSuccess, ToastWarning };
