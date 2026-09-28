// Public contract for the identity-verification feature. Swapping to a
// real backend later means rewriting the bodies below to call
// `@/lib/http`'s `request(...)` instead of `./mock` — nothing outside this
// file changes.
export { lookupNin, verifyIdentity } from "./mock";
