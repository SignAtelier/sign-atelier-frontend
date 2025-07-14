import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  deleteSign,
  deleteSignHard,
  editSignName,
  restoreSign,
} from "../../apis/signs";
import Button from "../../shared/components/Button";
import Toast from "../../shared/components/Toast";
import { formatDate } from "../../shared/utils/foramtDate";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import type { SignProps } from "./types";

const SignCard = ({
  sign,
  onUpdateName,
  onRestore,
  onSoftDelete,
  onHardDelete,
}: SignProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
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

    onUpdateName?.(editSign);
    setIsEditing(false);
  };

  const handleSoftDelete = async (signId: string) => {
    const sign = await deleteSign(signId);

    onSoftDelete?.(sign);
    setIsDeleteConfirmOpen(false);
  };

  const handleHardDelete = async (signId: string) => {
    await deleteSignHard(signId);

    onHardDelete?.(signId);
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
        <div className="flex items-center justify-between w-full">
          <div className="relative max-w-[160px]">
            {toastText === sign.name && <Toast text={sign.name} />}

            <span
              className="font-semibold truncate block w-full"
              onMouseEnter={() => setToastText(sign.name)}
              onMouseLeave={() => setToastText("")}
            >
              {sign.name}
            </span>
          </div>

          {!sign.isDeleted && (
            <button onClick={openEditModal} className="cursor-pointer">
              <MdModeEdit className="w-4 h-4 text-gray-500 shrink-0 hidden group-hover:block" />
            </button>
          )}
        </div>

        {sign.deletedAt ? (
          <span className="text-sm pb-4">
            삭제 예정: {formatDate(sign.deletedAt)}
          </span>
        ) : (
          <span className="text-sm pb-4">
            생성: {formatDate(sign.createdAt)}
          </span>
        )}

        {sign.isDeleted ? (
          <>
            <Button
              padding="py-1"
              style="bg-green-50 text-green-600"
              onClick={async () => {
                const restoredSign = await restoreSign(sign.id);

                if (restoredSign === "ALREADY_DELETED") {
                  onHardDelete?.(sign.id);

                  return;
                }

                onRestore?.(restoredSign);
              }}
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
          message={
            sign.isDeleted
              ? "완전히 삭제하시겠습니까?"
              : "정말 삭제하시겠습니까? (30일 임시 보관)"
          }
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => {
            sign.isDeleted
              ? handleHardDelete(sign.id)
              : handleSoftDelete(sign.id);
          }}
        />
      )}
    </div>
  );
};
export default SignCard;
