import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const HeaderNav = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  return (
    <nav className="flex gap-8 text-base font-semibold text-stone-600">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="cursor-pointer transition hover:text-stone-950"
      >
        싸인 만들기
      </button>
      <button
        type="button"
        onClick={() => {
          if (!userInfo) {
            alert("로그인이 필요합니다.");

            return;
          }

          navigate("/signature/list");
        }}
        className="cursor-pointer transition hover:text-stone-950"
      >
        보관함
      </button>
    </nav>
  );
};

export default HeaderNav;
