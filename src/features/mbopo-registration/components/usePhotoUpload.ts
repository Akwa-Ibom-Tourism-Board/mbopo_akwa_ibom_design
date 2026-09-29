import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { toPersistableDataUrl } from "@/lib/photoEncoding";

export interface UsePhotoUploadOptions {
  accept?: string;
  allowPdf?: boolean;
  invalidTypeMessage?: string;
  // A previously-saved photo (draft or submitted application) to show
  // until the user picks a new file. Arrives asynchronously — set once
  // the draft/submission fetch resolves — so it's applied via an effect
  // rather than read only at first render.
  initialDataUrl?: string;
}

export interface UsePhotoUploadResult {
  file: File | null;
  previewUrl: string;
  error: string | undefined;
  hasPhoto: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  // The value to persist (draft save or submit): re-encodes a freshly
  // picked file, or passes a hydrated one through unchanged.
  getPersistableDataUrl: () => Promise<string>;
}

// Replaces the three near-identical onPhotoChange/onFullImageChange/
// onCertificateChange handlers from the original single-file form with one
// reusable hook, shared by every PhotoUpload instance on this page.
export function usePhotoUpload({
  accept = "image/png,image/jpeg",
  allowPdf = false,
  invalidTypeMessage = "Please choose an image file.",
  initialDataUrl,
}: UsePhotoUploadOptions = {}): UsePhotoUploadResult {
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState("");
  const [hydratedUrl, setHydratedUrl] = useState(initialDataUrl ?? "");
  const [error, setError] = useState<string>();
  // Mirrors objectUrl for the unmount cleanup below, which needs the
  // latest value without re-running (and re-registering a new cleanup)
  // every time it changes.
  const objectUrlRef = useRef(objectUrl);
  useEffect(() => {
    objectUrlRef.current = objectUrl;
  }, [objectUrl]);

  useEffect(() => {
    if (initialDataUrl && !file) setHydratedUrl(initialDataUrl);
  }, [initialDataUrl, file]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.files?.[0];
      // Clear the input value up front so re-picking the same file still
      // fires a change event, matching the video recorder's "revoke the
      // old one before setting the new one" rule for every object URL.
      event.target.value = "";
      if (!selected) return;

      const isImage = selected.type.startsWith("image/");
      const isAllowedPdf = allowPdf && selected.type === "application/pdf";
      if (!isImage && !isAllowedPdf) {
        setError(invalidTypeMessage);
        return;
      }

      setFile(selected);
      setObjectUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return URL.createObjectURL(selected);
      });
      setError(undefined);
    },
    [allowPdf, invalidTypeMessage],
  );

  // Revokes whatever object URL is outstanding when this upload slot's
  // component unmounts (e.g. leaving the registration form entirely) —
  // the replace-on-reselect case above is already covered inline. Reads
  // the ref rather than objectUrl directly so this effect is registered
  // once, not torn down and reattached on every file pick.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const previewUrl = objectUrl || hydratedUrl;

  const getPersistableDataUrl = useCallback(async () => {
    if (file) return toPersistableDataUrl(file);
    return hydratedUrl;
  }, [file, hydratedUrl]);

  return {
    file,
    previewUrl,
    error,
    hasPhoto: Boolean(previewUrl),
    onChange,
    getPersistableDataUrl,
  };
}
