import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { uploadToCloudinary, type UploadField } from "@/lib/cloudinary";
import { savePhoto } from "../api";

export interface UsePhotoUploadOptions {
  field: UploadField;
  accept?: string;
  allowPdf?: boolean;
  invalidTypeMessage?: string;
  // A previously-saved photo's URL (draft or submitted application) —
  // arrives asynchronously once the draft fetch resolves, so it's applied
  // via an effect rather than read only at first render.
  initialUrl?: string;
}

export interface UsePhotoUploadResult {
  previewUrl: string;
  error: string | undefined;
  hasPhoto: boolean;
  isUploading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Each photo is uploaded (direct to Cloudinary) and saved to the
// application the moment it's picked, not gathered up for a later batch
// save — see api/index.ts's savePhoto. `previewUrl` shows the local object
// URL immediately for instant feedback, falling back to the last
// successfully *persisted* URL if a re-upload fails, so a failed replace
// never leaves the field looking emptier than it actually is.
export function usePhotoUpload({
  field,
  accept = "image/png,image/jpeg",
  allowPdf = false,
  invalidTypeMessage = "Please choose an image file.",
  initialUrl,
}: UsePhotoUploadOptions): UsePhotoUploadResult {
  const [persistedUrl, setPersistedUrl] = useState(initialUrl ?? "");
  const [objectUrl, setObjectUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>();

  const objectUrlRef = useRef(objectUrl);
  useEffect(() => {
    objectUrlRef.current = objectUrl;
  }, [objectUrl]);

  useEffect(() => {
    if (initialUrl) setPersistedUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.files?.[0];
      event.target.value = "";
      if (!selected) return;

      const isImage = selected.type.startsWith("image/");
      const isAllowedPdf = allowPdf && selected.type === "application/pdf";
      if (!isImage && !isAllowedPdf) {
        setError(invalidTypeMessage);
        return;
      }

      setError(undefined);
      setObjectUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return URL.createObjectURL(selected);
      });
      setIsUploading(true);

      void (async () => {
        try {
          const uploaded = await uploadToCloudinary(field, selected);
          await savePhoto({
            field,
            url: uploaded.url,
            publicId: uploaded.publicId,
            bytes: uploaded.bytes,
          });
          setPersistedUrl(uploaded.url);
        } catch (uploadError) {
          setObjectUrl((currentUrl) => {
            if (currentUrl) URL.revokeObjectURL(currentUrl);
            return "";
          });
          setError(
            uploadError instanceof Error
              ? uploadError.message
              : "We couldn't upload that file. Please try again.",
          );
        } finally {
          setIsUploading(false);
        }
      })();
    },
    [allowPdf, field, invalidTypeMessage],
  );

  return {
    previewUrl: objectUrl || persistedUrl,
    error,
    hasPhoto: Boolean(persistedUrl),
    isUploading,
    onChange,
  };
}
