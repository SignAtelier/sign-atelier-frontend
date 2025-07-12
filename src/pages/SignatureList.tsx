import { useEffect, useState } from "react";
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

  const handleSignUpdate = (newSign: newSign) => {
    setSigns((prev) => {
      if (!prev) return null;

      return prev.map((sign) =>
        sign.id === newSign.id ? { ...sign, name: newSign.name } : sign
      );
    });
  };

  useEffect(() => {
    (async () => {
      const result = await getSigns();
      setSigns(result);
    })();
  }, []);

  return (
    <div className="size-full">
      <Header />

      <div className="px-10">
        <div className="pt-10 pb-10 flex justify-start">
          <p className="text-2xl p-2 font-black">싸인 목록</p>
        </div>

        {signs === null ? (
          <Loading>싸인을 가져오고 있어요</Loading>
        ) : signs.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center text-gray-400 text-xl">
            아직 생성한 싸인이 없어요.
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-5">
            {signs.map((sign) => (
              <SignCard key={sign.id} sign={sign} onUpdate={handleSignUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureList;
