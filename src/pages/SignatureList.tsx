import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
import { getSignsByStatus } from "../apis/signs";
import SignCard from "../features/sign/SignCard";
import Header from "../shared/components/Header";
import Loading from "../shared/components/Loading";

interface Sign {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

const SignatureList = () => {
  const [activeSigns, setActiveSigns] = useState<Sign[]>([]);
  const [deletedSigns, setDeletedSigns] = useState<Sign[]>([]);
  const [showDeleted, setShowDeleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateSignName = ({ id, name, updatedAt }: Sign) => {
    setActiveSigns((prevSigns) =>
      prevSigns.map((sign) =>
        sign.id === id ? { ...sign, name, updatedAt } : sign
      )
    );
  };

  const softDeleteSign = ({ id, isDeleted, deletedAt }: Sign) => {
    const targetSign = activeSigns.find((sign) => sign.id === id);

    if (!targetSign) return;

    const deletedSign: Sign = {
      ...targetSign,
      isDeleted,
      deletedAt,
    };

    setDeletedSigns((prev) => [deletedSign, ...prev]);
    setActiveSigns((prev) => prev.filter((sign) => sign.id !== id));
  };

  const restoreSign = ({ id, isDeleted, deletedAt }: Sign) => {
    const targetSign = deletedSigns.find((sign) => sign.id === id);

    if (!targetSign) return;

    const activeSign: Sign = {
      ...targetSign,
      isDeleted,
      deletedAt,
    };

    setActiveSigns((prev) =>
      [...prev, activeSign].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
    setDeletedSigns((prev) => prev.filter((sign) => sign.id !== id));
  };

  const hardDeleteSign = (deletedId: string) => {
    setDeletedSigns((prev) => prev.filter((sign) => sign.id !== deletedId));
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const activeList = await getSignsByStatus(false);

      setActiveSigns(activeList);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const deletedList = await getSignsByStatus(true);

      setDeletedSigns(deletedList);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="size-full">
      <Header />
      <div className="px-10">
        <div className="pt-10 pb-10 flex justify-start">
          <p className="text-2xl p-2 font-black">싸인 목록</p>
        </div>

        {isLoading ? (
          <Loading>싸인을 가져오고 있어요</Loading>
        ) : activeSigns.length === 0 && deletedSigns.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center text-gray-400 text-xl">
            아직 생성한 싸인이 없어요.
          </div>
        ) : (
          <>
            {activeSigns.length > 0 && (
              <div className="grid grid-cols-5 gap-5 mb-12">
                {activeSigns.map((sign) => (
                  <SignCard
                    key={sign.id}
                    sign={sign}
                    onUpdateName={updateSignName}
                    onSoftDelete={softDeleteSign}
                  />
                ))}
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-lg font-semibold text-gray-600">
                  {deletedSigns.length > 0 && (
                    <button
                      onClick={() => setShowDeleted((prev) => !prev)}
                      className="text-gray-600 hover:text-gray-800 transition"
                    >
                      {showDeleted ? (
                        <FaCaretDown className="w-5 h-5 cursor-pointer" />
                      ) : (
                        <FaCaretRight className="w-5 h-5 cursor-pointer" />
                      )}
                    </button>
                  )}
                  <span>삭제 예정 싸인 (30일 내 복구 가능)</span>
                </div>
              </div>

              {showDeleted && deletedSigns.length > 0 && (
                <div className="mt-10 grid grid-cols-5 gap-5">
                  {deletedSigns.map((sign) => (
                    <SignCard
                      key={sign.id}
                      sign={sign}
                      onSoftDelete={softDeleteSign}
                      onRestore={restoreSign}
                      onHardDelete={hardDeleteSign}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignatureList;
