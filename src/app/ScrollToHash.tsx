import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router's client-side navigation never triggers the browser's native
// "jump to #fragment" behavior, so hash links (Footer's /#about, Navbar's
// /#eligibility, ...) would otherwise do nothing when clicked.
export function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    return () => clearTimeout(timeout);
  }, [hash]);

  return null;
}
