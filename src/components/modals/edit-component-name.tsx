import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import EditComponentNameForm from "../forms/edit-component-name";

interface Props {
  title: string;
  open: boolean;
  handleClose: (value: boolean) => void;
}

export default function EditComponentName({ title, open, handleClose }: Props) {
  return (
    <Dialog modal open={open}onOpenChange={(value) => handleClose(value)} >
      <DialogContent className="w-96">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
    
        <DialogDescription>
          <EditComponentNameForm handleClose={handleClose} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
