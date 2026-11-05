import { ChevronRight } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui";
import {
  List,
  ListItem,
  ItemText,
  ItemField,
  ItemStep,
} from "./MissingFieldsModal.styles";

export interface MissingFieldItem {
  step: number;
  stepLabel: string;
  fieldLabel: string;
}

export interface MissingFieldsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: MissingFieldItem[];
  onGoToStep: (step: number) => void;
}

// Replaces a plain "please fill in all required fields" toast — that told
// the applicant something was wrong without ever saying what, so they'd
// have to hunt through every step themselves. This lists each specific
// field by name and lets them jump straight to it.
export function MissingFieldsModal({
  open,
  onOpenChange,
  items,
  onGoToStep,
}: MissingFieldsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>A few things still need your attention</DialogTitle>
          <DialogDescription>
            Please fill in the following before submitting your application:
          </DialogDescription>
        </DialogHeader>

        <List>
          {items.map((item, index) => (
            <ListItem key={`${item.step}-${item.fieldLabel}-${index}`}>
              <ItemText>
                <ItemField>{item.fieldLabel}</ItemField>
                <ItemStep>{item.stepLabel}</ItemStep>
              </ItemText>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  onGoToStep(item.step);
                  onOpenChange(false);
                }}
              >
                Go to field <ChevronRight size={14} />
              </Button>
            </ListItem>
          ))}
        </List>

        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
