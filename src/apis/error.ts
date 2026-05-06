import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "서버 오류가 발생했습니다.";

interface ApiErrorResponse {
  message?: unknown;
  code?: unknown;
}

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = DEFAULT_ERROR_MESSAGE
) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
};

export const getApiErrorCode = (error: unknown) => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) return undefined;

  const code = error.response?.data?.code;

  return typeof code === "string" ? code : undefined;
};

export class ApiError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

export const throwApiError = (
  error: unknown,
  fallbackMessage?: string
): never => {
  throw new ApiError(
    getApiErrorMessage(error, fallbackMessage),
    getApiErrorCode(error)
  );
};
