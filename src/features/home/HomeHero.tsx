import { LuSparkles } from "react-icons/lu";

const HomeHero = () => {
  return (
    <>
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
    </>
  );
};

export default HomeHero;
