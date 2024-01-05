import React, { useTransition } from "react";
import { HiSaveAs } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import { UpdatePageContent } from "@/redux/pageBuilder/pageBuilderActions";

function SaveFormBtn({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const { elements } = useAppSelector((state) => state.pageBuilder);
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await dispatch(UpdatePageContent());
      toast.success("Form saved");
    } catch (error) {
      toast.error("Error saving form");
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
