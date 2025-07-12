import { useState } from "react";
import type { Practice } from "../../apis/types";
import DownloadModal from "./DownloadModal";
import type { PracticeRecordsProps } from "./types";

const PracticeRecords = ({ practices }: PracticeRecordsProps) => {
  const hasRecords = practices.length > 0;

  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(
    null
  );

  return (
    <div className="px-10 pt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-800">내 연습 기록</h2>

      {hasRecords ? (
        <div className="grid grid-cols-5 gap-6">
          {practices.map((practice) => (
            <div
              key={practice.id}
              onClick={() => setSelectedPractice(practice)}
              className="border rounded-lg shadow hover:shadow-md transition cursor-pointer bg-white p-4 flex flex-col items-center"
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
        <div className="pt-5">
          <p className="text-gray-500">연습 기록이 없습니다.</p>
        </div>
      )}
      {selectedPractice && (
        <DownloadModal
          url={selectedPractice.url}
          onClose={() => setSelectedPractice(null)}
        />
      )}
    </div>
  );
};

export default PracticeRecords;
