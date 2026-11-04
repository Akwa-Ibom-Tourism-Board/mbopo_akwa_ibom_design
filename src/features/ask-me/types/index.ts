export interface AskMeAttachment {
  url: string;
  filename: string;
  bytes: number;
}

export interface AskMeInput {
  name: string;
  email: string;
  phoneNumber: string;
  title?: string;
  message: string;
  attachments?: AskMeAttachment[];
}

// A file picked in the form, tracked through its own upload lifecycle
// before it becomes an AskMeAttachment the submission can actually send.
export interface PendingAttachment {
  id: string;
  file: File;
  status: "uploading" | "done" | "error";
  progress: number;
  error?: string;
  result?: AskMeAttachment;
}

export interface StatusModalState {
  open: boolean;
  title: string;
  message: string;
  type: "success" | "error";
}
