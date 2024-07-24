import { NiceModalHandler } from "@ebay/nice-modal-react";
import { ReactNode } from "react";

export type IModalLayout = {
  title: string;
  children?: (modal: NiceModalHandler) => ReactNode;
  className?: string;
};
