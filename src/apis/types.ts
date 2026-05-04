export type SignatureStyle =
  | "luxury"
  | "calligraphy"
  | "simple"
  | "sharp";

export interface GenerateParams {
  name: string;
  style: SignatureStyle;
}

export interface Practice {
  id: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}
