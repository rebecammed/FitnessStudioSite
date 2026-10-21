import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      const timeout = setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          // 1. Read the header height from the CSS variable
          const headerHeightString = getComputedStyle(document.documentElement)
            .getPropertyValue("--header-height")
            .trim();

          // 2. Turn 73px to an integer
          const headerHeight = parseInt(headerHeightString, 10) || 73; // 73 es un fallback por si falla

          // 3. Calculate exact position
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [hash]);

  return null;
}
