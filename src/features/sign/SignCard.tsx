import Button from "../../shared/components/Button";
import { formatDate } from "../../shared/utils/foramtDate";
import type { SignProps } from "./types";

const SignCard = ({ sign }: SignProps) => {
  return (
    <div className="flex flex-col items-center justify-center border rounded-md border-gray-200 p-4">
      <div className="w-30 pb-6 flex items-center justify-center overflow-clip">
        <img src={sign.url} alt={`sign_${sign.id}`} key={sign.id} />
      </div>

      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-1 w-full truncate">
          <span className="font-semibold truncate">{sign.name}</span>
        </div>

        <span className="text-sm pb-4">생성: {formatDate(sign.createdAt)}</span>

        <Button padding="py-1" onClick={() => {}}>
          연습하기
        </Button>
      </div>
    </div>
  );
};
export default SignCard;
