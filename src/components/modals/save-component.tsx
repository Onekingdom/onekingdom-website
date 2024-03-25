import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SaveComponentForm from "../forms/save-component";

interface Props {
  title: string;
  open: boolean;
  handleClose: (value: boolean) => void;
}

export default function SaveComponent({ title, open, handleClose }: Props) {
  return (
    <Dialog modal open={open}onOpenChange={(value) => handleClose(value)} >
      <DialogContent className="w-96">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <SaveComponentForm handleClose={handleClose} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
