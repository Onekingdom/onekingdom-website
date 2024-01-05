import React from "react";
import { FormElements } from "./FormElements";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedElement } from "@/redux/pageBuilder/PageBuilderSlice";

function PropertiesFormSidebar() {
  const { selectedElement } = useAppSelector((state) => state.pageBuilder);
  const dispatch = useAppDispatch();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            dispatch(setSelectedElement(null));
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;
