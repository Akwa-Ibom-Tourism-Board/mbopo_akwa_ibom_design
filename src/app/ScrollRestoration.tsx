import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router's client-side navigation never triggers the browser's native
// "jump to #fragment" or "reset scroll to top" behavior a full page load
// would — this restores both, centrally, for every route in the app:
// scrolls to the target element for hash links (Footer's /#about, Navbar's
// /#eligibility, ...), or back to the top of the page for every other
// navigation (a plain route change would otherwise leave the scroll
// position wherever the previous page left it — the dashboard's sidebar
// links and the auth flow's redirects were the most visible cases of this).
//
// Same-route state changes (the registration form's step-to-step
// navigation, for one) don't touch the URL, so they aren't covered here —
// see RegistrationForm.tsx for that case's own scroll-to-top.
export function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const timeout = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return () => clearTimeout(timeout);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
