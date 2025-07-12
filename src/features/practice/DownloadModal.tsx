import { downloadPractice } from "../../apis/practice";
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import type { DownloadModalProps } from "./types";

const DownloadModal = ({ url, onClose }: DownloadModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className="w-70">
        <img
          src={url}
          alt="download-preview"
          className="w-full h-40 object-contain mb-4"
        />
        <div className="flex gap-4">
          <Button style="bg-white border text-black" onClick={onClose}>
            취소
          </Button>

          <Button
            onClick={() => {
              downloadPractice(url);
              onClose();
            }}
          >
            다운로드
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
