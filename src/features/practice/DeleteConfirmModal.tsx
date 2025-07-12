import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";

interface DeleteConfirmModalProps {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({
  count,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  return (
    <Modal onClose={onCancel}>
      <div className="p-6">
        <p className="mb-6 text-gray-700">
          {count}개의 연습 기록이 삭제됩니다.
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} style="bg-white border text-gray-800">
            취소
          </Button>
          <Button onClick={onConfirm} style="bg-red-400 text-white">
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
