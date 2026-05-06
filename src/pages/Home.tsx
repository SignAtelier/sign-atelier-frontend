import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getUserInfo } from '../apis/auth';
import { getApiErrorMessage } from '../apis/error';
import { generateSign } from '../apis/generateSign';
import type { SignatureStyle } from '../apis/types';
import HomeHero from '../features/home/HomeHero';
import { processSteps, styleOptions } from '../features/home/homeContent';
import ProcessStepList from '../features/home/ProcessStepList';
import SignCreationPanel from '../features/home/SignCreationPanel';
import Header from '../shared/components/Header';
import Loading from '../shared/components/Loading';
import { useToast } from '../shared/components/ToastProvider';
import { useSignStore } from '../store/signStore';
import { useUserStore } from '../store/userStore';

const Home = () => {
  const [name, setName] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<SignatureStyle>('luxury');
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = useUserStore();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const selectedStyleLabel =
    styleOptions.find((option) => option.value === selectedStyle)?.label ?? '';

  useEffect(() => {
    (async () => {
      const store = useUserStore.getState();

      try {
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
      } catch (error: unknown) {
        store.clearAll();
        showToast({ type: 'error', message: getApiErrorMessage(error) });
      }
    })();
  }, [accessToken, showToast]);

  const handleGenerate = async () => {
    if (!name.trim()) {
      showToast({ type: 'error', message: '영문 이름을 입력해 주세요.' });

      return;
    }

    if (!selectedStyle) {
      showToast({ type: 'error', message: '스타일을 선택해 주세요.' });

      return;
    }

    setIsLoading(true);

    try {
      const signUrl = await generateSign(name, selectedStyle);

      const { setName: setStoredName, setStyle } = useSignStore.getState();

      setStoredName(name);
      setStyle(selectedStyle);

      const query = new URLSearchParams({ signUrl }).toString();

      setIsLoading(false);
      navigate(`/signature/result?${query}`);
    } catch (error: unknown) {
      showToast({ type: 'error', message: getApiErrorMessage(error) });
      setIsLoading(false);

      return;
    }
  };

  const canSubmit = Boolean(name.trim() && selectedStyle && !isLoading);

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-stone-950">
      <Header />

      <main className="mx-auto min-h-[calc(100vh-73px)] w-full max-w-7xl px-8 py-7 max-md:px-5">
        <HomeHero />

        <SignCreationPanel
          name={name}
          styleOptions={styleOptions}
          selectedStyle={selectedStyle}
          selectedStyleLabel={selectedStyleLabel}
          canSubmit={canSubmit}
          onChangeName={(e) => setName(e.target.value)}
          onSelectStyle={setSelectedStyle}
          onGenerate={handleGenerate}
        />

        <ProcessStepList steps={processSteps} />
      </main>

      {isLoading && (
        <Loading variant="signature">싸인을 생성하고 있습니다</Loading>
      )}
    </div>
  );
};

export default Home;
