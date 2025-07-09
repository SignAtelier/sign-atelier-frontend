import { useEffect, useState } from "react";
import { getSigns } from "../apis/signs";
import SignCard from "../features/sign/SignCard";
import Header from "../shared/components/Header";

interface Sign {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

const SignatureList = () => {
  const [signs, setSigns] = useState<Sign[]>();

  useEffect(() => {
    (async () => {
      setSigns(await getSigns());
    })();
  }, []);

  return (
    <div className="size-full">
      <Header />

      <div className="px-10">
        <div className="pt-10 pb-10 flex justify-start">
          <p className="text-2xl p-2 font-black">내 사인 목록</p>
        </div>

        {signs ? (
          <>
            <div className="grid grid-cols-5 grid-rows-3 gap-5">
              {signs.map((sign) => (
                <SignCard key={sign.id} sign={sign} />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SignatureList;
