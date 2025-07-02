import logo from "../../assets/signLogo.png";
import Button from "./Button";
import type { HeaderProps } from "./types";

const headerClass = `
  flex justify-between items-center
  px-6 py-4 bg-white shadow-md
`;

const Header = ({ buttonText, onButtonClick }: HeaderProps) => {
  return (
    <header className={headerClass}>
      <img src={logo} alt="싸인공방" className="w-32 h-auto" />
      <div className="w-24">
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </header>
  );
};

export default Header;
