import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/signLogo.png";
import LoginModal from "../../features/auth/LoginModal";
import Profile from "../../features/auth/Profile";
import { useUserStore } from "../../store/userStore";
import Button from "./Button";
import UserMenu from "./UserMenu";

const headerClass = `
  flex justify-between items-center
  px-6 py-4 bg-white shadow-md
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  return (
    <header className={headerClass}>
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      <img
        src={logo}
        alt="싸인공방"
        className="w-32 h-auto cursor-pointer"
        onClick={() => navigate("/")}
      />
      {userInfo ? (
        <div className="relative">
          <Profile
            profilePicture={userInfo.profilePicture}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && <UserMenu onCloseMenu={() => setIsMenuOpen(false)} />}
        </div>
      ) : (
        <div className="w-24">
          <Button onClick={() => setIsModalOpen(true)}>로그인</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
