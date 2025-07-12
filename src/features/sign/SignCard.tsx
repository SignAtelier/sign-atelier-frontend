import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteSign, editSignName } from "../../apis/signs";
import Button from "../../shared/components/Button";
import { formatDate } from "../../shared/utils/foramtDate";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import type { SignProps } from "./types";

const SignCard = ({ sign, onUpdate, onDelete }: SignProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const navigate = useNavigate();

  const openEditModal = () => {
    setName(sign.name);
    setIsEditing(true);
  };

  const openDeleteModal = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleEdit = async (signId: string, newName: string) => {
    const editSign = await editSignName(signId, newName);

    onUpdate?.(editSign);
    setIsEditing(false);
  };

  const handleDelete = async (signId: string) => {
    const sign = await deleteSign(signId);

    onDelete(sign.id);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center border rounded-md border-gray-200 p-4 group">
      <div onClick={openDeleteModal} className="self-end cursor-pointer">
        <IoClose className="opacity-0 group-hover:opacity-100" />
      </div>

      <div className="w-30 pb-6 flex items-center justify-center overflow-clip">
        <img src={sign.url} alt={`sign_${sign.name}`} key={sign.id} />
      </div>

      <div className="flex flex-col items-start w-full">
        <div className="flex items-center justify-between w-full truncate">
          <span className="font-semibold truncate">{sign.name}</span>
          {!sign.isDeleted && (
            <button onClick={openEditModal} className="cursor-pointer">
              <MdModeEdit className="w-4 h-4 text-gray-500 shrink-0 hidden group-hover:block" />
            </button>
          )}
        </div>

        <span className="text-sm pb-4">생성: {formatDate(sign.createdAt)}</span>

        {sign.isDeleted ? (
          <>
            <Button
              padding="py-1"
              style="bg-green-50 text-green-600"
              onClick={() => {}}
            >
              복구하기
            </Button>
          </>
        ) : (
          <>
            <Button
              padding="py-1"
              onClick={() => {
                navigate(`/signature/practice/${sign.id}`);
              }}
            >
              연습하기
            </Button>
          </>
        )}
      </div>

      {isEditing && (
        <EditModal
          name={name}
          signId={sign.id}
          onClose={handleCloseModal}
          onSetName={setName}
          onEdit={handleEdit}
        />
      )}

      {isDeleteConfirmOpen && (
        <DeleteModal
          name={sign.name}
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => handleDelete(sign.id)}
        />
      )}
    </div>
  );
};
export default SignCard;
