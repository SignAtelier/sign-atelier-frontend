import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Modal from "../../shared/components/Modal";
import type { EditModalProps } from "./types";

const EditModal = ({
  name,
  signId,
  onClose,
  onSetName,
  onEdit,
}: EditModalProps) => {
  return (
    <>
      <Modal onClose={onClose}>
        <Input value={name} onChange={(e) => onSetName(e.target.value)} />

        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} style="#white border">
            취소
          </Button>
          <Button onClick={() => onEdit(signId, name)}>수정</Button>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
