import signLogo from "../assets/signLogo.png";
import SignCard from "../features/sign/SignCard";
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
          {signList.map((sign) => (
            <SignCard sign={sign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignatureList;
