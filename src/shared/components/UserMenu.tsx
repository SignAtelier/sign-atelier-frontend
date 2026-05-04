import { useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import type { UserMenuProps } from "./types";

const UserMenu = ({ onCloseMenu }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-md bg-white shadow-lg shadow-stone-900/10">
      <button
        className="w-full cursor-pointer px-4 py-2.5 text-left text-sm font-semibold text-stone-800 hover:bg-stone-100"
        onClick={() => {
          onCloseMenu();
          navigate("/signature/list");
        }}
      >
        보관함
      </button>
      <button
        className="w-full cursor-pointer px-4 py-2.5 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
        onClick={async () => handleLogout()}
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserMenu;
