import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import type { UserMenuProps } from "./types";

const UserMenu = ({ onCloseMenu }: UserMenuProps) => {
  const navigate = useNavigate();

  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  const handleLogout = async () => {
    clearUserInfo();
    navigate("/");
  };

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          onCloseMenu();
          navigate("/signature/list");
        }}
      >
        내 싸인 목록
      </button>
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
        onClick={async () => handleLogout()}
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserMenu;
