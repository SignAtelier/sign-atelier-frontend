import type { ToastProps } from "./types";

const Toast = ({ text }: ToastProps) => (
  <div className="absolute -top-6 left-0 z-10 bg-black text-white text-xs px-2 py-1 rounded shadow">
    {text}
  </div>
);

export default Toast;
