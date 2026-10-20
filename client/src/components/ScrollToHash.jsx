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
          // 1. Leemos la altura del header directamente de tu variable CSS
          const headerHeightString = getComputedStyle(document.documentElement)
            .getPropertyValue("--header-height")
            .trim();

          // 2. Convertimos "73px" a un número (73)
          const headerHeight = parseInt(headerHeightString, 10) || 73; // 73 es un fallback por si falla

          // 3. Calculamos la posición exacta + 1px de margen extra
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerHeight - 1;

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
