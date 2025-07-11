import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPractices, getPresignedUrl } from "../apis/practice";
import type { Practice } from "../apis/types";
import signLogo from "../assets/signLogo.png";
import DownloadModal from "../features/practice/DownloadModal";
import PracticeCanvas from "../features/practice/PracticeCanvas";
import PracticeRecords from "../features/practice/PracticeRecords";
import SignBox from "../features/practice/SignBox";
import Header from "../shared/components/Header";

const isModal = false;

const Practice = () => {
  const [practices, setPractices] = useState<Practice[]>([]);
  const { sign_id } = useParams();
  const signId = sign_id;

  useEffect(() => {
    if (!signId) return;

    (async () => {
      const practicesList = await getPractices(signId);

      if (practicesList.length === 0) return;

      const finalPractices = await getPresignedUrl(practicesList);

      setPractices(finalPractices);
    })();
  }, []);

  return (
    <div className="size-full">
      <Header />

      <div className="px-10 pt-10 flex justify-center">
        <div className="flex border w-fit rounded-2xl shadow-xl border-gray-300 bg-white p-8 gap-12">
          <SignBox
            title="만든 싸인"
            imageSrc={signLogo}
            showImage={true}
            showOutline={false}
            onToggleImage={() => {}}
            onToggleOutline={() => {}}
          />
          <PracticeCanvas title="연습 캔버스" />
        </div>
      </div>
      <PracticeRecords practices={practices} />
      {isModal && <DownloadModal onClose={() => {}} imgSrc="sign" />}
    </div>
  );
};

export default Practice;
