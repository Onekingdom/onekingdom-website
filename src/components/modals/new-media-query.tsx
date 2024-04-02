import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import NewMediaQueryForm from "../forms/new-media-query";

interface Props {
  title: string;
  open: boolean;
  handleClose: (value: boolean) => void;
}

export default function NewMediaQueryModal({ title, open, handleClose }: Props) {
  return (
    <Dialog modal open={open} onOpenChange={(value) => handleClose(value)}>
      <DialogContent className="w-96">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <NewMediaQueryForm handleClose={handleClose} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
