import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import type { DownloadModalProps } from "./types";

const DownloadModal = ({ imgSrc, onClose }: DownloadModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className="w-100">
        <h3 className="text-lg font-semibold mb-4">사인 다운로드</h3>
        <img
          src={imgSrc}
          alt="download-preview"
          className="w-full h-40 object-contain mb-4"
        />
        <div className="flex gap-4">
          <Button style="bg-white text-black" onClick={onClose}>
            취소
          </Button>

          <Button onClick={onClose}>다운로드</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
