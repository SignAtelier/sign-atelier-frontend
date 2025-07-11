import type { PracticeRecordsProps } from "./types";

const PracticeRecords = ({ practices, onSelect }: PracticeRecordsProps) => {
  const hasRecords = practices.length > 0;

  return (
    <div className="px-10 pt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-800">내 연습 기록</h2>

      {hasRecords ? (
        <div className="grid grid-cols-5 gap-6">
          {practices.map((sign) => (
            <div
              key={sign.id}
              onClick={() => onSelect && onSelect(sign.id)}
              className="border rounded-lg shadow hover:shadow-md transition cursor-pointer bg-white p-4 flex flex-col items-center"
            >
              <img
                src={sign.url}
                alt={`sign_${sign.id}`}
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
    </div>
  );
};

export default PracticeRecords;
