import institutionsData from "./institutions.json";

// 376 Nigerian universities, polytechnics, and colleges of education
// (federal, state, and private), compiled from the higher-institutions-ng
// dataset and cleaned up (stripped P.M.B./P.O. Box clutter, normalized
// punctuation). Not guaranteed exhaustive or perfectly current — the
// Institution field always pairs this with an "Other" option for anything
// missing or renamed since this was compiled.
export const NIGERIAN_INSTITUTIONS: readonly string[] = institutionsData;
