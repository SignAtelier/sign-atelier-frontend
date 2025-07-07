import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../apis/auth";
import { generateSign } from "../apis/generateSign";
import ImageUploader from "../features/ImageUpload/ImageUploader";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";
import Input from "../shared/components/Input";
import { useUserStore } from "../store/userStore";

const titleClass = `
  text-3xl p-2 font-black
`;

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  const { setUserInfo } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

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

                const signUrl = await generateSign(file, name);

                if (!signUrl) return;

                const query = new URLSearchParams({ signUrl }).toString();

                navigate(`/signature/result?${query}`);
              }}
              padding="py-3"
            >
              생성
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
