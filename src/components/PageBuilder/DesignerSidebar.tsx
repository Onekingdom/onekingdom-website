import React from "react";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
import { useAppSelector } from "@/hooks/redux";

function DesignerSidebar() {
  const { selectedElement } = useAppSelector((state) => state.pageBuilder); // Update the slice name and RootState

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
