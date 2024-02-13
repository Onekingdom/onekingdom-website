"use client"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";

export default function PageBuilder() {
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [isReady]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }


  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto  bg-accent rounded-md">
          {/* Pass elements and selectedElement as props to Designer */}
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}


