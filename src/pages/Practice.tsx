import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPractices, getPresignedUrl } from "../apis/practice";
import { getSign, getSignOutline } from "../apis/signs";
import PracticeCanvas from "../features/practice/PracticeCanvas";
import PracticeRecords from "../features/practice/PracticeRecords";
import SignBox from "../features/practice/SignBox";
import type { Practice } from "../features/practice/types";
import Header from "../shared/components/Header";

const options = [
  { value: { width: 420, height: 280 }, label: "작게" },
  { value: { width: 480, height: 320 }, label: "보통" },
  { value: { width: 600, height: 400 }, label: "크게" },
  { value: { width: 750, height: 500 }, label: "매우 크게" },
];

interface Option {
  value: { width: number; height: number };
  label: string;
}

const Practice = () => {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [signUrl, setSignUrl] = useState<string>("");
  const [signOutlineUrl, setSignOutlineUrl] = useState<string>("");
  const [isOutlineVisible, setIsOutlineVisible] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<Option>(options[1]);
  const { sign_id } = useParams();
  const signId = sign_id;

  useEffect(() => {
    if (!signId) return;

    (async () => {
      const practicesList = await getPractices(signId);

      if (practicesList.length === 0) return;

      const keys = practicesList.map((practice: Practice) => practice.fileName);
      const urls = await getPresignedUrl(keys);
      const updatedPractices = practicesList.map(
        (practice: Practice, i: number) => ({
          ...practice,
          url: urls[i],
        })
      );

      setPractices(updatedPractices);
    })();
  }, []);

  useEffect(() => {
    if (!signId) return;

    (async () => {
      const signUrl = await getSign(signId);

      if (!signUrl) return;

      setSignUrl(signUrl);
    })();
  }, []);

  useEffect(() => {
    if (!signId) return;

    (async () => {
      const signOutlineUrl = await getSignOutline(signId);

      if (!signOutlineUrl) return;

      setSignOutlineUrl(signOutlineUrl);
    })();
  }, []);

  return (
    <div className="size-full">
      <Header />

      <div className="px-10 pt-10 flex justify-center">
        <div className="flex border w-fit rounded-2xl shadow-xl border-gray-300 bg-white p-8 gap-12">
          <SignBox
            title="만든 싸인"
            imageSrc={signUrl}
            showOutline={isOutlineVisible}
            onToggleOutline={() => setIsOutlineVisible(!isOutlineVisible)}
            options={options}
            onSizeSelect={setSelectedSize}
            size={selectedSize.value}
          />
          <PracticeCanvas
            title="연습 캔버스"
            signOutlineUrl={signOutlineUrl}
            showOutline={isOutlineVisible}
            practices={practices}
            onUpdatePractices={setPractices}
            size={selectedSize.value}
          />
        </div>
      </div>
      <div className="px-10 pt-10 flex justify-center">
        <div className="flex border w-fit rounded-2xl shadow-xl border-gray-300 bg-white p-8 gap-12">
          <div className="max-w-[1000px] mx-auto">
            <PracticeRecords
              practices={practices}
              onUpdatePractices={setPractices}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
