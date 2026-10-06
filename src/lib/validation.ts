// Shared input-validation patterns used across every form in the app.
// Kept in one place so a phone/name/email rule is only ever defined once —
// duplicating a regex per form is how one of them quietly drifts out of
// sync with the rest (or with the backend) after an edit elsewhere.

// Matches the backend's own NIGERIAN_PHONE_REGEX exactly (see the
// backend's src/configurations/constants.ts): 0 or 234, then 7/8/9, then
// 0/1, then 8 more digits — an 11-digit local number or a 13-digit one
// with the country code. Deliberately not <input type="number"> anywhere
// this is used — that silently drops leading zeros and allows "e"/"+"/"-",
// which a phone number must never accept.
export const NIGERIAN_PHONE_REGEX = /^(0[789][01]\d{8}|234[789][01]\d{8})$/;
export const PHONE_MESSAGE =
  "Enter a valid Nigerian phone number, e.g. 08012345678";

// Strips every non-digit character, including spaces — used to sanitize
// phone inputs as the user types, so a space/letter/symbol never makes it
// into the field at all rather than only being caught at validation time.
export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

// Wraps a react-hook-form field's onChange so the input only ever accepts
// digits. Mutates event.target.value in place before handing the event to
// RHF, which reads the value off that same event — works for typing,
// paste, and autofill alike.
export function digitsOnlyOnChange<E extends { target: { value: string } }>(
  onChange: (event: E) => unknown,
) {
  return (event: E) => {
    event.target.value = stripNonDigits(event.target.value);
    return onChange(event);
  };
}

// Letters (including accented ones), spaces, hyphens, apostrophes and
// periods — real names (O'Brien, Jean-Paul, Mary-Ann, J. Edet) while
// rejecting pure numbers/symbols and the invisible or control characters
// sometimes used to smuggle unexpected content through a plain text field.
export const NAME_REGEX = /^[\p{L}][\p{L}\s'.-]*$/u;
export const NAME_MESSAGE = "Use letters only";

// A lighter touch for place/role names (village, city, occupation) that
// may legitimately contain a digit or two (e.g. "Uyo II") — just requires
// at least one real letter somewhere, so the field cannot be pure digits,
// punctuation, or control characters.
export const CONTAINS_LETTER_REGEX = /\p{L}/u;
export const CONTAINS_LETTER_MESSAGE = "This does not look like a valid entry";

export const MAX_EMAIL_LENGTH = 254;
// Matches the backend's passwordSchema.max(128) exactly.
export const MAX_PASSWORD_LENGTH = 128;

// Sentence case, not Title Case — only the very first character is
// upper-cased, everything after it is forced lower. Matches the backend's
// own toSentenceCase backstop exactly (see FIX_ME.md), applied to free-text
// fields (village, address, talents, "Other" entries, etc.) before they're
// sent — never to codes/emails/phone numbers, which this would corrupt.
export function toSentenceCase(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}
