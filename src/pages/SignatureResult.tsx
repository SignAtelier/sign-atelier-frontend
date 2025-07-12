import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveSign } from "../apis/signs";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";
import Loading from "../shared/components/Loading";

const centerClass = `
  flex flex-col items-center gap-4
`;

const SignatureResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const signUrl = params.get("signUrl");

  return (
    <div className="size-full">
      <Header />

      <div className="py-20">
        <p className="text-3xl p-2 font-black">싸인을 생성했습니다.</p>
      </div>
      <div className={centerClass}>
        <div className="w-1/3">
          <div className={centerClass}>
            <img src={signUrl!} alt="싸인" />
            <Button
              onClick={async () => {
                if (!signUrl) return;

                const status = await saveSign(signUrl);

                if (status === 201) {
                  navigate("/signature/list");
                }
              }}
            >
              저장하고 연습하기
            </Button>
            <Button
              onClick={() => {
                setIsLoading(true);
                setIsLoading(false);
              }}
              style="bg-[#white] text-black border"
            >
              다시 생성하기
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <Loading>싸인을 생성 중입니다</Loading>}
    </div>
  );
};

export default SignatureResult;
