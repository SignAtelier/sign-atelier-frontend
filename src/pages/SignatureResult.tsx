import { useState } from "react";
import { LuArchive, LuRefreshCw } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateSign } from "../apis/generateSign";
import { saveSign } from "../apis/signs";
import Button from "../shared/components/Button";
import Header from "../shared/components/Header";
import Loading from "../shared/components/Loading";
import { useSignStore } from "../store/signStore";

type LoadingVariant = "default" | "signature";

const SignatureResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] =
    useState("싸인을 생성하고 있습니다");
  const [loadingVariant, setLoadingVariant] =
    useState<LoadingVariant>("signature");

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const signUrl = params.get("signUrl");

  const handleSave = async () => {
    if (!signUrl) return;

    setLoadingMessage("싸인을 보관함에 저장하고 있습니다");
    setLoadingVariant("default");
    setIsLoading(true);

    const status = await saveSign(signUrl);

    if (status === 201) {
      navigate("/signature/list");
    }

    setLoadingMessage("싸인을 생성하고 있습니다");
    setLoadingVariant("signature");
    setIsLoading(false);
  };

  const handleRegenerate = async () => {
    const { name, style } = useSignStore.getState();

    if (!name) {
      navigate("/");

      return;
    }

    setLoadingMessage("싸인을 생성하고 있습니다");
    setLoadingVariant("signature");
    setIsLoading(true);

    const nextSignUrl = await generateSign(name, style);

    if (!nextSignUrl) {
      setIsLoading(false);

      return;
    }

    const query = new URLSearchParams({ signUrl: nextSignUrl }).toString();

    setIsLoading(false);
    navigate(`/signature/result?${query}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-stone-950">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl flex-col items-center px-6 py-12">
        <div className="w-full text-left">
          <p className="text-sm font-bold text-amber-700">생성 결과</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            완성된 싸인을 확인해 주세요.
          </h1>
        </div>

        <section className="mt-10 grid w-full grid-cols-[1fr_260px] gap-8 max-md:grid-cols-1">
          <div className="flex min-h-[360px] items-center justify-center rounded-md border border-stone-200 bg-white p-8 shadow-xl shadow-stone-900/5">
            {signUrl ? (
              <img
                src={signUrl}
                alt="생성된 싸인"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <p className="text-stone-500">생성된 싸인이 없습니다.</p>
            )}
          </div>

          <aside className="rounded-md border border-stone-200 bg-white p-5 text-left shadow-xl shadow-stone-900/5">
            <p className="text-lg font-black">다음 작업</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              마음에 들면 보관함에 저장하고, 다른 결과가 필요하면 다시 생성해
              보세요.
            </p>

            <div className="mt-6 space-y-3">
              <Button onClick={handleSave} disabled={!signUrl || isLoading}>
                <span className="flex items-center justify-center gap-2">
                  <LuArchive size={18} />
                  보관함에 저장
                </span>
              </Button>
              <Button
                onClick={handleRegenerate}
                disabled={isLoading}
                style="border border-stone-300 bg-white text-stone-950 hover:border-stone-950"
              >
                <span className="flex items-center justify-center gap-2">
                  <LuRefreshCw size={18} />
                  다시 생성
                </span>
              </Button>
            </div>
          </aside>
        </section>
      </main>

      {isLoading && (
        <Loading variant={loadingVariant}>{loadingMessage}</Loading>
      )}
    </div>
  );
};

export default SignatureResult;
