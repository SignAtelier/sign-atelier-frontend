import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
import { getSigns } from "../apis/signs";
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
}

interface newSign {
  id: string;
  name: string;
  udpatedAt: string;
}

const SignatureList = () => {
  const [signs, setSigns] = useState<Sign[] | null>(null);
  const [showDeleted, setShowDeleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUpdate = (newSign: newSign) => {
    setSigns(
      (prev) =>
        prev?.map((sign) =>
          sign.id === newSign.id ? { ...sign, name: newSign.name } : sign
        ) ?? null
    );
  };

  const updateSignDeleteState = (updatedId: string, isDeleted: boolean) => {
    setSigns(
      (prev) =>
        prev?.map((sign) =>
          sign.id === updatedId ? { ...sign, isDeleted } : sign
        ) ?? null
    );
  };

  const removeSign = (deletedId: string) => {
    setSigns((prev) => prev?.filter((sign) => sign.id !== deletedId) ?? null);
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const result = await getSigns();

      setSigns(result);
      setIsLoading(false);
    })();
  }, []);

  const deletedSigns = signs?.filter((sign) => sign.isDeleted) ?? [];
  const activeSigns = signs?.filter((sign) => !sign.isDeleted) ?? [];

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
                    onUpdate={handleSignUpdate}
                    onSoftDelete={updateSignDeleteState}
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
                      onHardDelete={removeSign}
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
