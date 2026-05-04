import { useEffect, useState } from 'react';
import { LuPenLine, LuSparkles } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getUserInfo } from '../apis/auth';
import { generateSign } from '../apis/generateSign';
import type { SignatureStyle } from '../apis/types';
import calligraphyPreview from '../assets/calligraphy.png';
import luxuryPreview from '../assets/luxury.png';
import sharpPreview from '../assets/sharp.png';
import simplePreview from '../assets/simple.png';
import Button from '../shared/components/Button';
import Header from '../shared/components/Header';
import Input from '../shared/components/Input';
import Loading from '../shared/components/Loading';
import { useSignStore } from '../store/signStore';
import { useUserStore } from '../store/userStore';

const styleOptions: Array<{
  value: SignatureStyle;
  label: string;
  image: string;
}> = [
  { value: 'luxury', label: '우아하게', image: luxuryPreview },
  { value: 'calligraphy', label: '화려하게', image: calligraphyPreview },
  { value: 'simple', label: '간결하게', image: simplePreview },
  { value: 'sharp', label: '날렵하게', image: sharpPreview },
];

const processSteps = [
  {
    title: '이름 입력 및 스타일 선택',
    description:
      '영문 이름을 입력하고 원하는 분위기의 스타일을 고르면 AI가 싸인을 만듭니다.',
  },
  {
    title: '저장 또는 재생성',
    description:
      '완성된 싸인이 마음에 들면 저장하고, 다른 결과가 필요하면 다시 생성할 수 있습니다.',
  },
  {
    title: '연습하기',
    description:
      '저장한 싸인을 따라 쓰며 획의 흐름을 익히고 내 필체로 연습해 보세요.',
  },
];

const Home = () => {
  const [name, setName] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<SignatureStyle>('luxury');
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = useUserStore();

  const navigate = useNavigate();

  const selectedStyleLabel =
    styleOptions.find((option) => option.value === selectedStyle)?.label ?? '';

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

  const handleGenerate = async () => {
    if (!name.trim()) {
      alert('영문 이름을 입력해 주세요.');

      return;
    }

    if (!selectedStyle) {
      alert('스타일을 선택해 주세요.');

      return;
    }

    setIsLoading(true);

    const signUrl = await generateSign(name, selectedStyle);

    if (!signUrl) {
      setIsLoading(false);

      return;
    }

    const { setName: setStoredName, setStyle } = useSignStore.getState();

    setStoredName(name);
    setStyle(selectedStyle);

    const query = new URLSearchParams({ signUrl }).toString();

    setIsLoading(false);
    navigate(`/signature/result?${query}`);
  };

  const canSubmit = Boolean(name.trim() && selectedStyle && !isLoading);

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-stone-950">
      <Header />

      <main className="mx-auto min-h-[calc(100vh-73px)] w-full max-w-7xl px-8 py-7 max-md:px-5">
        <section className="mb-4 grid grid-cols-[1fr_420px] items-end gap-8 text-left max-lg:grid-cols-1">
          <div>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-stone-300 bg-white/70 px-3 py-2 text-sm font-semibold text-stone-600">
              <LuSparkles size={16} />
              모든 싸인은 AI가 생성합니다
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight max-md:text-4xl">
              영어 이름으로 만드는 나만의 시그니처.
            </h1>
          </div>
        </section>

        <section className="mb-7">
          <p className="max-w-3xl text-base leading-7 text-stone-600">
            이름을 입력하고 AI가 만든 싸인을 만나보세요. 만든 싸인을 따라 쓰며
            나만의 필체로 익힐 수 있습니다.
          </p>
        </section>

        <section className="rounded-md border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5">
          <div className="text-left">
            <div className="mb-6 grid grid-cols-[minmax(280px,420px)_1fr] gap-8 border-b border-stone-200 pb-6 max-lg:grid-cols-1">
              <div>
                <p className="text-xl font-black">싸인 만들기</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  영문 이름을 먼저 입력한 다음, 아래에서 원하는 스타일을
                  선택해주세요.
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-bold text-stone-900">
                  영문 이름
                </label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: Daniel"
                  value={name}
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <p className="text-lg font-black">스타일 선택</p>
                <p className="mt-1 text-sm text-stone-500">
                  예시 이미지를 보고 원하는 스타일을 선택해주세요.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {styleOptions.map((option) => {
                  const isSelected = selectedStyle === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedStyle(option.value)}
                      className={`overflow-hidden rounded-md border bg-white text-left transition ${
                        isSelected
                          ? 'border-stone-950 ring-2 ring-stone-200'
                          : 'border-stone-200 hover:border-stone-500'
                      }`}
                    >
                      <div className="flex h-64 items-center justify-center bg-[#fffaf1] p-4 max-xl:h-52 max-sm:h-40">
                        <img
                          src={option.image}
                          alt={`${option.label} 스타일 예시`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div
                        className={`flex items-center justify-between px-4 py-3 text-sm font-bold ${
                          isSelected
                            ? 'bg-stone-950 text-[#f8f3ea]'
                            : 'text-stone-700'
                        }`}
                      >
                        <span>{option.label}</span>
                        {isSelected && <span>선택됨</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 rounded-md border border-stone-200 bg-[#fffaf1] p-4 max-sm:flex-col max-sm:items-stretch">
                <div className="text-sm font-semibold text-stone-600">
                  {name.trim() ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span>생성 정보</span>
                      <span className="rounded-md bg-white px-2.5 py-1 font-black text-stone-950">
                        {name.trim()}
                      </span>
                      <span className="text-stone-400">/</span>
                      <span className="rounded-md bg-white px-2.5 py-1 font-black text-stone-950">
                        {selectedStyleLabel}
                      </span>
                    </div>
                  ) : (
                    '영문 이름을 입력하면 선택한 스타일로 싸인을 생성할 수 있습니다.'
                  )}
                </div>
                <div className="w-full max-w-xs">
                  <Button
                    onClick={handleGenerate}
                    disabled={!canSubmit}
                    padding="py-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <LuPenLine size={18} />
                      생성하기
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-3 gap-4 text-left max-lg:grid-cols-1">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-md border border-stone-200 bg-white/70 p-5"
            >
              <p className="text-sm font-bold text-amber-700">0{index + 1}</p>
              <p className="mt-3 text-lg font-black text-stone-950">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                {step.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      {isLoading && (
        <Loading variant="signature">싸인을 생성하고 있습니다</Loading>
      )}
    </div>
  );
};

export default Home;
