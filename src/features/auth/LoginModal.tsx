import googleLoginBtn from "../../assets/google_login_btn.png";
import Modal from "../../shared/components/Modal";

const LoginModal = () => {
  return (
    <Modal onClose={() => {}}>
      <div className="text-lg font-bold">로그인</div>
      <img src={googleLoginBtn} className="cursor-pointer" />
    </Modal>
  );
};

export default LoginModal;
