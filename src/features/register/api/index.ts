// Public contract for the register feature. Swapping to a real backend
// later means rewriting the bodies below to call `@/lib/http`'s
// `request(...)` instead of `./mock` — nothing outside this file changes.
export { lookupNin, requestEmailVerification } from "./mock";
