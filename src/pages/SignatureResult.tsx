import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateSign } from "../apis/generateSign";
import { saveSign } from "../apis/signs";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";
import Loading from "../shared/components/Loading";
import { base64ToFile } from "../shared/utils/base64";
import { useSignStore } from "../store/signStore";

const centerClass = `
  flex flex-col items-center gap-4
`;

const SignatureResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("싸인 생성 중...");

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

                setLoadingMessage("싸인을 저장할게요");
                setIsLoading(true);

                const status = await saveSign(signUrl);

                if (status === 201) {
                  navigate("/signature/list");
                }

                setLoadingMessage("싸인 생성 중...");
                setIsLoading(false);
              }}
            >
              저장하기
            </Button>
            <Button
              onClick={async () => {
                const { name, fileBase64 } = useSignStore.getState();

                if (!name || !fileBase64) return;

                const file = base64ToFile(fileBase64, name);
                setIsLoading(true);

                const signUrl = await generateSign(file, name);

                if (!signUrl) {
                  setIsLoading(false);

                  return;
                }
                const query = new URLSearchParams({ signUrl }).toString();

                setIsLoading(false);
                navigate(`/signature/result?${query}`);
              }}
              style="bg-[#white] text-black border"
            >
              다시 생성하기
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <Loading>{loadingMessage}</Loading>}
    </div>
  );
};

export default SignatureResult;
