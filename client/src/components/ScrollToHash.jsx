import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

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
          const headerHeight = parseInt(headerHeightString, 10) || 73;

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
    } else {
      // 👇 SI NO HAY HASH (ej. entramos a /login), SUBIMOS ARRIBA DEL TODO
      window.scrollTo({
        top: 0,
        behavior: "instant", // instant para que no se vea un scroll raro al cambiar de página
      });
    }
  }, [pathname, hash]);

  return null;
}
