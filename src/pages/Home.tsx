import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserInfo } from "../apis/auth";
import { generateSign } from "../apis/generateSign";
import ImageUploader from "../features/ImageUpload/ImageUploader";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";
import Input from "../shared/components/Input";
import Loading from "../shared/components/Loading";
import { fileToBase64 } from "../shared/utils/base64";
import { useSignStore } from "../store/signStore";
import { useUserStore } from "../store/userStore";

const titleClass = `
  text-3xl p-2 font-black
`;

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const store = useUserStore.getState();

      if (!accessToken) {
        const token = await getAccessToken();

        if (!token) {
          store.clearAll();

          return;
        }

        store.setAccessToken(token);
      }

      const userInfo = await getUserInfo();

      if (userInfo) store.setUserInfo(userInfo);
    })();
  }, [accessToken]);

  return (
    <div className="size-full">
      <Header />

      <div className="py-20">
        <p className={titleClass}>나만의 사인을 만들고</p>
        <p className={titleClass}>따라 쓰며 연습하는 싸인공방</p>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="w-1/2">
          <ImageUploader file={file} setFile={setFile} />
        </div>

        <div className="flex gap-4 w-1/2">
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            value={name}
          />
          <div className="w-24">
            <Button
              onClick={async () => {
                if (!file || !name) return;

                setIsLoading(true);

                const signUrl = await generateSign(file, name);

                if (!signUrl) {
                  setIsLoading(false);

                  return;
                }

                const base64Data = await fileToBase64(file);
                const { setName, setFileBase64 } = useSignStore.getState();

                setName(name);

                if (typeof base64Data === "string") setFileBase64(base64Data);

                const query = new URLSearchParams({ signUrl }).toString();

                setIsLoading(false);
                navigate(`/signature/result?${query}`);
              }}
              padding="py-3"
            >
              생성
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <Loading>싸인 생성 중...</Loading>}
    </div>
  );
};

export default Home;
