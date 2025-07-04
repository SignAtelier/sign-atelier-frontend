import signLogo from "../assets/signLogo.png";
import DownloadModal from "../features/practice/DownloadModal";
import PracticeCanvas from "../features/practice/PracticeCanvas";
import PracticeSignList from "../features/practice/PracticeSignList";
import SignBox from "../features/practice/SignBox";
import Header from "../shared/components/Header";

const signList = [
  { id: 1, img: signLogo },
  { id: 2, img: signLogo },
  { id: 3, img: signLogo },
  { id: 4, img: signLogo },
  { id: 5, img: signLogo },
  { id: 6, img: signLogo },
  { id: 7, img: signLogo },
  { id: 8, img: signLogo },
  { id: 9, img: signLogo },
  { id: 10, img: signLogo },
  { id: 11, img: signLogo },
  { id: 12, img: signLogo },
  { id: 13, img: signLogo },
  { id: 14, img: signLogo },
  { id: 15, img: signLogo },
  { id: 16, img: signLogo },
  { id: 17, img: signLogo },
  { id: 18, img: signLogo },
  { id: 19, img: signLogo },
  { id: 20, img: signLogo },
  { id: 21, img: signLogo },
  { id: 22, img: signLogo },
  { id: 23, img: signLogo },
  { id: 24, img: signLogo },
  { id: 25, img: signLogo },
];

const isModal = false;

const Practice = () => {
  return (
    <div className="size-full">
      <Header />

      <div className="px-10 pt-10 flex justify-center">
        <div className="flex border w-fit rounded-2xl shadow-xl border-gray-300 bg-white p-8 gap-12">
          <SignBox
            title="AI 생성 사인"
            imageSrc={signLogo}
            showImage={true}
            showOutline={false}
            onToggleImage={() => {}}
            onToggleOutline={() => {}}
          />
          <PracticeCanvas
            canvasWidth={256}
            canvasHeight={128}
            onReset={() => {}}
            onSave={() => {}}
          />
        </div>
      </div>
      <PracticeSignList signList={signList} />
      {isModal && <DownloadModal onClose={() => {}} imgSrc="sign" />}
    </div>
  );
};

export default Practice;
