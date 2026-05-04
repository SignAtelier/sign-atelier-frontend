import { useState } from "react";
import { LuPenTool } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../features/auth/LoginModal";
import Profile from "../../features/auth/Profile";
import { useUserStore } from "../../store/userStore";
import Button from "./Button";
import HeaderNav from "./HeaderNav";
import UserMenu from "./UserMenu";

const headerClass = `
  sticky top-0 z-30 flex justify-between items-center
  px-6 py-4 bg-[#f8f3ea]/95 border-b border-stone-200 backdrop-blur
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  return (
    <header className={headerClass}>
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}

      <div className="flex items-center gap-10">
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer text-stone-950"
          onClick={() => navigate("/")}
          aria-label="싸인공방 홈"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-stone-950 text-[#f8f3ea]">
            <LuPenTool size={22} />
          </span>
          <span className="text-2xl font-black tracking-tight">싸인공방</span>
        </button>
        <HeaderNav />
      </div>

      {userInfo ? (
        <div className="relative">
          <Profile
            profilePicture={userInfo.profilePicture}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && <UserMenu onCloseMenu={() => setIsMenuOpen(false)} />}
        </div>
      ) : (
        <div className="w-20">
          <Button
            onClick={() => setIsModalOpen(true)}
            padding="py-2"
            style="border border-stone-300 bg-white text-sm text-stone-900 hover:border-stone-950"
          >
            로그인
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
