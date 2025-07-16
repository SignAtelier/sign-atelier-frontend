import googleLoginBtn from "../../assets/google_login_btn.png";
import Modal from "../../shared/components/Modal";
import type { LoginModalProps } from "./types";

const LoginModal = ({ onClose }: LoginModalProps) => {
  const handleLogin = () => {
    window.location.href = "https://e18b69c76523.ngrok-free.app/api/auth/login";
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-lg font-bold">로그인</div>
      <img
        src={googleLoginBtn}
        className="cursor-pointer"
        onClick={() => handleLogin()}
      />
    </Modal>
  );
};

export default LoginModal;
