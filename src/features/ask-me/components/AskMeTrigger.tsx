import { MessageCircleMore } from "lucide-react";
import { Wrap, Trigger, Label } from "./AskMeTrigger.styles";

export function AskMeTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Wrap>
      <Trigger onClick={onClick} aria-label="Open the Ask Me message form">
        <MessageCircleMore size={26} />
      </Trigger>
      <Label>Ask Me</Label>
    </Wrap>
  );
}
