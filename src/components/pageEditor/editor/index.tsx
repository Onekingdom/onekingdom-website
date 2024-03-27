"use client";

import { Button } from "@/components/ui/button";
import { PageDetails } from "@/types/pageEditor";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Recursive from "./recursive";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ResizableDiv from "@/components/resizable-div";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";

type Props = {
  liveMode?: boolean;
  pageDetails: PageDetails | undefined;
};

export default function PageEditor({ pageDetails, liveMode }: Props) {
  const state = useAppSelector((state) => state.pageEditor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pageDetails) return;
    dispatch({
      type: "pageEditor/loadData",
      payload: {
        elements: pageDetails.content ? JSON.parse(pageDetails?.content) : null,
        withLive: !!liveMode,
        displayMode: "Editor",
      },
    });

    return () => {
      dispatch({
        type: "pageEditor/clearData",
      });
    };
  }, [pageDetails]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const hanldeUnpreview = () => {
    dispatch({
      type: "pageEditor/SET_DISPLAY_MODE",
      payload: {
        value: "Editor",
      },
    });
  };


  const handleResize = (width: number) => {

    dispatch({
      type: "pageEditor/SET_WIDTH",
      payload: {
        width: width,
      },
    });
  };

  return (
    <ResizableDiv    
      handleChange={handleResize}
      onClick={handleClick}
      maxWidth={1920}
      minWidth={375}
      canDrag={state.editor.displayMode === "Editor"}
      className={cn("relative  h-full l  pb-40", {
        "!p-0 !mr-0": state.editor.displayMode !== "Editor",
        "bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] mr-[385px] pb-[40px]":
          state.editor.displayMode === "Editor",
        "overflow-scroll": state.editor.displayMode === "Editor" || state.editor.displayMode === "Preview",
      })}
    >
      {state.editor.displayMode === "Preview" && (
        <Button variant={"ghost"} size={"icon"} className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]" onClick={hanldeUnpreview}>
          <EyeOff />
        </Button>
      )}

      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => <Recursive key={childElement.id} element={childElement} />)}
    </ResizableDiv>
  );
}
