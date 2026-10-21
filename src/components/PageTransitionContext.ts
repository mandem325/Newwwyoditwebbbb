import { createContext, useContext } from "react";

export interface PageTransitionContextType {
  triggerClose: (targetHref: string) => void;
  isClosing: boolean;
}

export const PageTransitionContext = createContext<PageTransitionContextType>({
  triggerClose: () => {},
  isClosing: false,
});

export const usePageCloseTransition = () => useContext(PageTransitionContext);
