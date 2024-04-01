"use client";
import useEditor from "@/hooks/useEditor";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { throttle } from "lodash";
import React, { useEffect, useRef, useState } from "react";

interface ResizableDivProps extends React.HTMLAttributes<HTMLDivElement> {
  handleChange: (width: number) => void;
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
  canDrag?: boolean;
}

const ResizableDiv: React.FC<ResizableDivProps> = ({
  handleChange,
  initialWidth = 1920,
  minWidth = 0,
  maxWidth = 1920,
  children,
  className,
  canDrag,
  onClick,
}: ResizableDivProps) => {
  const [width, setWidth] = useState(1920);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const container = useRef<HTMLDivElement | null>(null);
  const { dispatch } = useEditor();

  const handleDragStart = (e: React.MouseEvent<HTMLSpanElement>) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    e.stopPropagation();
    e.preventDefault(); // Preventing default behavior to avoid selecting text
  };

  const handleDrag = (e: MouseEvent) => {
    if (!draggingRef.current) return;

    const offsetX = e.clientX - startXRef.current;
    const distanceMoved = offsetX * 2; // Adjust this factor to control resize speed

    const newWidth = Math.max(minWidth, Math.min(width + distanceMoved, maxWidth));
    setWidth(newWidth);


      dispatch({
        type: "pageEditor/SET_WIDTH",
        payload: {
          width: width,
        },
      });

    startXRef.current = e.clientX;
  };

  const handleDragEnd = () => {
    draggingRef.current = false;
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => handleDrag(e);
    const handleWindowMouseUp = () => handleDragEnd();

    if (draggingRef.current) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseup", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [width]);



  return (
    <div style={{ width: `${width}px`, position: "relative" }} className={className} onClick={onClick} ref={container}>
      {canDrag && (
        <div className="absolute top-0 -right-6 w-4 h-full ">
          <div className="fixed h-full w-4  flex  items-center">
            <span
              className=" flex justify-center items-center rounded-sm border bg-border h-12 w-8 z-[1000]"
              onMouseDown={handleDragStart}
              // @ts-ignore
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
            >
              <DragHandleDots2Icon className="h-full w-full cursor-e-resize" />
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default ResizableDiv;
