import signLogo from "../assets/signLogo.png";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";

const signList = [
  { id: 1, img: signLogo, name: "홍길동", createdAt: "2025-01-01" },
  { id: 2, img: signLogo, name: "홍길동", createdAt: "2025-01-02" },
  { id: 3, img: signLogo, name: "홍길동", createdAt: "2025-01-03" },
  { id: 4, img: signLogo, name: "홍길동", createdAt: "2025-01-04" },
  { id: 5, img: signLogo, name: "홍길동", createdAt: "2025-01-05" },
  { id: 6, img: signLogo, name: "홍길동", createdAt: "2025-01-06" },
  { id: 7, img: signLogo, name: "홍길동", createdAt: "2025-01-07" },
  { id: 8, img: signLogo, name: "홍길동", createdAt: "2025-01-08" },
  { id: 9, img: signLogo, name: "홍길동", createdAt: "2025-01-09" },
  { id: 10, img: signLogo, name: "홍길동", createdAt: "2025-01-10" },
];

const SignatureList = () => {
  return (
    <div className="size-full">
      <Header />

      <div className="px-10">
        <div className="pt-10 pb-10 flex justify-start">
          <p className="text-2xl p-2 font-black">내 사인 목록</p>
        </div>

        <div className="grid grid-cols-5 grid-rows-3 gap-5">
          {signList.map((sign, idx) => (
            <div className="flex flex-col items-center justify-center border rounded-md border-gray-200 py-4">
              <div className="w-30 pb-6 flex items-center justify-center overflow-clip">
                <img src={sign.img} alt={`sign_${idx}`} key={sign.id} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">{sign.name}</span>
                <span className="text-sm pb-4">생성: {sign.createdAt}</span>
                <Button padding="py-1" onClick={() => {}}>
                  연습하기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignatureList;
