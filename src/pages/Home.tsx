import ImageUploader from "../features/ImageUpload/ImageUploader";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";
import Input from "../shared/components/Input";

const titleClass = `
  text-3xl p-2 font-black
`;

const Home = () => {
  return (
    <div className="size-full">
      <Header buttonText="로그인" onButtonClick={() => {}} />
      <div className="py-20">
        <p className={titleClass}>나만의 사인을 만들고</p>
        <p className={titleClass}> 따라 쓰며 연습하는 싸인공방</p>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="w-1/2">
          <ImageUploader file={null} onFileChange={() => {}} />
        </div>

        <div className="flex gap-4 w-1/2">
          <Input onChange={() => {}} placeholder="이름을 입력하세요" value="" />
          <div className="w-24">
            <Button onClick={() => {}}>생성</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
