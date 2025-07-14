import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const HeaderNav = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  return (
    <nav className="flex gap-10 font-semibold text-gray-600">
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer hover:text-black transition"
      >
        싸인 생성
      </button>
      <button
        onClick={() => {
          if (!userInfo) {
            alert("로그인이 필요합니다.");

            return;
          }

          navigate("/signature/list");
        }}
        className="cursor-pointer hover:text-black transition"
      >
        싸인 목록
      </button>
    </nav>
  );
};

export default HeaderNav;
