import { downloadPractice } from "../../apis/practice";
import { getApiErrorMessage } from "../../apis/error";
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import { useToast } from "../../shared/components/ToastProvider";
import type { DownloadModalProps } from "./types";

const DownloadModal = ({ url, fileName, onClose }: DownloadModalProps) => {
  const { showToast } = useToast();

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
            onClick={async () => {
              try {
                await downloadPractice(fileName);
                showToast({ type: "success", message: "연습 기록을 다운로드했습니다." });
                onClose();
              } catch (error: unknown) {
                showToast({ type: "error", message: getApiErrorMessage(error) });
              }
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
