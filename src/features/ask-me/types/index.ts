export interface AskMeInput {
  name: string;
  email: string;
  phoneNumber: string;
  title?: string;
  message: string;
}

export interface StatusModalState {
  open: boolean;
  title: string;
  message: string;
  type: "success" | "error";
}
