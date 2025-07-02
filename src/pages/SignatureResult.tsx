import signLogo from "../assets/signLogo.png";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";

const centerClass = `
  flex flex-col items-center gap-4
`;

const SignatureResult = () => {
  return (
    <div className="size-full">
      <Header buttonText="로그인" onButtonClick={() => {}} />

      <div className="py-20">
        <p className="text-3xl p-2 font-black">싸인을 생성했습니다.</p>
      </div>
      <div className={centerClass}>
        <div className="w-1/3">
          <div className={centerClass}>
            <img src={signLogo} alt="싸인" />
            <Button onClick={() => {}}>저장하고 연습하기</Button>
            <Button onClick={() => {}} style="bg-[#white] text-black">
              다시 생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureResult;
