import type { ProfileProps } from "./types";

const Profile = ({ profilePicture, onToggleMenu }: ProfileProps) => {
  return (
    <button onClick={onToggleMenu} className="flex items-center gap-2">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
    </button>
  );
};

export default Profile;
