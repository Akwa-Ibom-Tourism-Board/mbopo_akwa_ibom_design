import { useCallback, useRef, useState } from "react";
import {
  uploadAskMeAttachment,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_BYTES,
} from "./api";
import type { PendingAttachment } from "./types";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const formatMB = (bytes: number): string => (bytes / (1024 * 1024)).toFixed(1);

// Manages the Ask Me widget's file attachments end to end: validation,
// per-file upload (each against its own Cloudinary "slot" within this
// submission), progress, and removal. A slot, once freed by removing its
// attachment, is reused by the next file — see the collision this avoids
// if slots were instead assigned by array position.
export function useAskMeAttachments() {
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const submissionIdRef = useRef(crypto.randomUUID());
  const slotByIdRef = useRef(new Map<string, number>());

  const nextFreeSlot = useCallback((): number | undefined => {
    const used = new Set(slotByIdRef.current.values());
    for (let slot = 0; slot < MAX_ATTACHMENTS; slot++) {
      if (!used.has(slot)) return slot;
    }
    return undefined;
  }, []);

  const startUpload = useCallback((id: string, file: File, slot: number) => {
    uploadAskMeAttachment(submissionIdRef.current, slot, file, {
      onProgress: (progress) =>
        setAttachments((current) =>
          current.map((a) => (a.id === id ? { ...a, progress } : a)),
        ),
    })
      .then((result) =>
        setAttachments((current) =>
          current.map((a) =>
            a.id === id ? { ...a, status: "done", result, progress: 100 } : a,
          ),
        ),
      )
      .catch((error: Error) =>
        setAttachments((current) =>
          current.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: "error",
                  error: error.message || "Upload failed.",
                }
              : a,
          ),
        ),
      );
  }, []);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const remainingSlots = MAX_ATTACHMENTS - attachments.length;
      if (remainingSlots <= 0) return;

      const additions: PendingAttachment[] = [];
      const toUpload: { id: string; file: File; slot: number }[] = [];

      for (const file of Array.from(files).slice(0, remainingSlots)) {
        const id = crypto.randomUUID();

        if (!ALLOWED_TYPES.includes(file.type)) {
          additions.push({
            id,
            file,
            status: "error",
            progress: 0,
            error: "Only JPG, PNG, or PDF files are allowed.",
          });
          continue;
        }
        if (file.size > MAX_ATTACHMENT_BYTES) {
          additions.push({
            id,
            file,
            status: "error",
            progress: 0,
            error: `That file is ${formatMB(file.size)}MB — please choose one under 5MB.`,
          });
          continue;
        }

        const slot = nextFreeSlot();
        if (slot === undefined) break;
        slotByIdRef.current.set(id, slot);
        additions.push({ id, file, status: "uploading", progress: 0 });
        toUpload.push({ id, file, slot });
      }

      setAttachments((current) => [...current, ...additions]);
      toUpload.forEach(({ id, file, slot }) => startUpload(id, file, slot));
    },
    [attachments.length, nextFreeSlot, startUpload],
  );

  const removeAttachment = useCallback((id: string) => {
    slotByIdRef.current.delete(id);
    setAttachments((current) => current.filter((a) => a.id !== id));
  }, []);

  const reset = useCallback(() => {
    setAttachments([]);
    slotByIdRef.current.clear();
    submissionIdRef.current = crypto.randomUUID();
  }, []);

  return {
    attachments,
    addFiles,
    removeAttachment,
    reset,
    isUploading: attachments.some((a) => a.status === "uploading"),
    canAddMore: attachments.length < MAX_ATTACHMENTS,
  };
}
