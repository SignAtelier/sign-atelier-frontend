import { useState } from "react";
import { deletePractices } from "../../apis/practice";
import type { Practice } from "../../apis/types";
import Button from "../../shared/components/Button";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DownloadModal from "./DownloadModal";
import type { PracticeRecordsProps } from "./types";

const PracticeRecords = ({
  practices,
  onUpdatePractices,
}: PracticeRecordsProps) => {
  const hasRecords = practices.length > 0;

  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(
    null
  );
  const [deleteList, setDeleteList] = useState<Practice[]>([]);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handlePracticeClick = (practice: Practice) => {
    setSelectedPractice(practice);
  };

  const isInDeleteList = (practice: Practice) =>
    deleteList.some((p) => p.id === practice.id);

  const handleDeletePractices = async () => {
    const fileNames = deleteList.map((practice) => practice.fileName);
    const responseCode = await deletePractices(fileNames);

    if (responseCode === "DELETE_SUCCESS") {
      const updated = practices.filter(
        (practice) => !deleteList.includes(practice)
      );

      onUpdatePractices(updated);
      setDeleteList([]);
      setIsSelectMode(false);
      setIsDeleteConfirmOpen(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        내 연습 기록
      </h2>

      <div className="flex justify-end mb-6">
        {isSelectMode ? (
          <div className="flex gap-3 w-70">
            <Button
              onClick={() => {
                setIsSelectMode(false);
                setDeleteList([]);
              }}
              padding="py-1"
              style="bg-white"
            >
              취소
            </Button>
            <Button
              onClick={() => {
                if (deleteList.length === practices.length) {
                  setDeleteList([]);
                } else {
                  setDeleteList(practices);
                }
              }}
              padding="py-1"
              style="bg-white"
            >
              {deleteList.length === practices.length
                ? "선택 해제"
                : "전체 선택"}
            </Button>
            <Button
              onClick={() => {
                deleteList.length > 0 && setIsDeleteConfirmOpen(true);
              }}
              padding="py-1"
              style="bg-red-400 text-white"
            >
              삭제
            </Button>
          </div>
        ) : (
          <div className="w-16">
            <Button
              onClick={() => {
                setIsSelectMode(true);
              }}
              padding="py-1"
              style="bg-white shadow-sm border border-gray-400 text-gray-600"
            >
              선택
            </Button>
          </div>
        )}
      </div>

      {hasRecords ? (
        <div className="grid grid-cols-6 gap-6">
          {practices.map((practice) => (
            <div
              key={practice.id}
              onClick={() => {
                if (isSelectMode) {
                  setDeleteList((prev) =>
                    isInDeleteList(practice)
                      ? prev.filter((p) => p.id !== practice.id)
                      : [...prev, practice]
                  );
                } else {
                  handlePracticeClick(practice);
                }
              }}
              className={`
              border rounded-lg shadow transition cursor-pointer p-4 flex flex-col items-center
              ${
                isSelectMode && isInDeleteList(practice)
                  ? "bg-sky-50 border-sky-400 ring-2 ring-sky-300"
                  : "bg-white border-gray-200 hover:shadow-md hover:border-sky-400"
              }
            `}
            >
              <img
                src={practice.url}
                alt={`sign_${practice.id}`}
                className="w-full h-auto object-contain mb-2"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-[1000px] text-center pt-5">
            <p className="text-gray-500">연습 기록이 없습니다.</p>
          </div>
        </div>
      )}

      {selectedPractice && (
        <DownloadModal
          url={selectedPractice.url}
          onClose={() => setSelectedPractice(null)}
        />
      )}
      {isDeleteConfirmOpen && (
        <DeleteConfirmModal
          count={deleteList.length}
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={handleDeletePractices}
        />
      )}
    </>
  );
};

export default PracticeRecords;
