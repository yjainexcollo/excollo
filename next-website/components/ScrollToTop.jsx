"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Optional: You can enforce manual scroll here if Next.js default behavior isn't enough
    // window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

