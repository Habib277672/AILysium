import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../../lib/smoothScroll";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop({ immediate: true });
  }, [pathname]);

  return null;
};
