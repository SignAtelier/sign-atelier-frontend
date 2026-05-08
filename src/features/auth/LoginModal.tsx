import { useEffect, useRef, useState } from "react";
import {
  getUserInfo,
  loginWithGoogleCredential,
} from "../../apis/auth";
import Modal from "../../shared/components/Modal";
import { useUserStore } from "../../store/userStore";
import type { LoginModalProps } from "./types";

const GOOGLE_SCRIPT_ID = "google-identity-services";
const GOOGLE_READY_TIMEOUT_MS = 5000;
const GOOGLE_READY_CHECK_INTERVAL_MS = 100;

let googleIdentityScriptPromise: Promise<void> | null = null;

const isGoogleIdentityReady = () => Boolean(window.google?.accounts?.id);

const loadGoogleIdentityScript = () => {
  if (googleIdentityScriptPromise) return googleIdentityScriptPromise;

  const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

  if (existingScript) return Promise.resolve();

  googleIdentityScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");

    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      googleIdentityScriptPromise = null;
      reject(new Error("Google 로그인 SDK를 불러오지 못했습니다."));
    };

    document.head.appendChild(script);
  });

  return googleIdentityScriptPromise;
};

const waitForGoogleIdentity = () => {
  if (isGoogleIdentityReady()) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const startedAt = Date.now();

    const checkGoogleIdentity = () => {
      if (isGoogleIdentityReady()) {
        resolve();

        return;
      }

      if (Date.now() - startedAt >= GOOGLE_READY_TIMEOUT_MS) {
        reject(new Error("Google 로그인 SDK가 초기화되지 않았습니다."));

        return;
      }

      window.setTimeout(checkGoogleIdentity, GOOGLE_READY_CHECK_INTERVAL_MS);
    };

    checkGoogleIdentity();
  });
};

const LoginModal = ({ onClose, onSuccess }: LoginModalProps) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setErrorMessage("Google Client ID가 설정되지 않았습니다.");
      setIsLoading(false);

      return;
    }

    let isMounted = true;

    const renderGoogleButton = async () => {
      try {
        await loadGoogleIdentityScript();
        await waitForGoogleIdentity();

        if (!isMounted || !buttonRef.current) return;

        buttonRef.current.innerHTML = "";
        window.google!.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            if (!credential) {
              setErrorMessage("Google 로그인 정보를 받지 못했습니다.");

              return;
            }

            try {
              const accessToken = await loginWithGoogleCredential(credential);
              const store = useUserStore.getState();

              store.setAccessToken(accessToken);

              const userInfo = await getUserInfo();

              if (userInfo) store.setUserInfo(userInfo);

              onSuccess?.();
              onClose();
            } catch {
              setErrorMessage("Google 로그인에 실패했습니다.");
            }
          },
        });
        window.google!.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          text: "signin_with",
          width: 280,
        });
        setIsLoading(false);
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Google 로그인 SDK를 불러오지 못했습니다."
        );
        setIsLoading(false);
      }
    };

    renderGoogleButton();

    return () => {
      isMounted = false;
    };
  }, [onClose, onSuccess]);

  return (
    <Modal onClose={onClose}>
      <div className="w-[320px] text-left">
        <p className="text-xl font-black text-stone-950">로그인</p>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Google 계정으로 로그인하고 만든 싸인을 보관하세요.
        </p>
        <div className="mt-5 flex justify-center" ref={buttonRef} />
        {isLoading && (
          <p className="mt-4 text-center text-sm font-semibold text-stone-500">
            Google 로그인 버튼을 불러오고 있습니다.
          </p>
        )}
        {errorMessage && (
          <p className="mt-4 text-sm font-semibold text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
