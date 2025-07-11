import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { editSignName } from "../../apis/signs";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Modal from "../../shared/components/Modal";
import { formatDate } from "../../shared/utils/foramtDate";
import type { SignProps } from "./types";

const SignCard = ({ sign, onUpdate }: SignProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const openEditModal = () => {
    setName(sign.name);
    setEditing(true);
  };

  const handleCloseModal = () => {
    setEditing(false);
  };

  const handleEdit = async (signId: string, newName: string) => {
    const editSign = await editSignName(signId, newName);

    onUpdate(editSign);
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center border rounded-md border-gray-200 p-4">
      <div className="w-30 pb-6 flex items-center justify-center overflow-clip">
        <img src={sign.url} alt={`sign_${sign.name}`} key={sign.id} />
      </div>

      <div className="flex flex-col items-start w-full">
        <div className="flex items-center justify-between w-full truncate">
          <span className="font-semibold truncate">{sign.name}</span>
          <button onClick={openEditModal} className="cursor-pointer">
            <MdModeEdit className="w-4 h-4 text-gray-500 shrink-0" />
          </button>
        </div>

        <span className="text-sm pb-4">생성: {formatDate(sign.createdAt)}</span>

        <Button padding="py-1" onClick={() => {
          navigate(`/signature/practice/${sign.id}`)
        }}>
          연습하기
        </Button>
      </div>

      {editing && (
        <Modal onClose={handleCloseModal}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <div className="flex gap-2 justify-end">
            <Button onClick={handleCloseModal} style="#white">
              취소
            </Button>
            <Button onClick={() => handleEdit(sign.id, name)}>수정</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default SignCard;
