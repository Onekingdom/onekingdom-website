"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import useEditor from "@/hooks/useEditor";
import usePageEditor from "@/hooks/usePageEditor";
import { cn } from "@/lib/utils";
import { DeviceTypes, PageDetails } from "@/types/pageEditor";
import { ArrowLeftCircle, EyeIcon, Laptop, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusEventHandler } from "react";
import { toast } from "sonner";

type Props = {
  PageDetails: PageDetails;
};

export default function PageEditorNavigation({ PageDetails }: Props) {
  const router = useRouter();
  const { dispatch, state } = useEditor();
  const { createNewPage, updatePage } = usePageEditor();

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.value === PageDetails.name) return;
    if (event.target.value) {
      await updatePage({ ...PageDetails, name: event.target.value }, PageDetails.$id);
      toast.success("Page Title Updated");
      router.refresh();
    } else {
      toast.error("Page Title cannot be empty");

      event.target.value = PageDetails.name;
    }
  };

  const handlePreviewClick = () => {
    dispatch({
      type: "pageEditor/SET_DISPLAY_MODE",
      payload: {
        value: "Preview",
      },
    });
  };
  const handleUdo = () => {
    dispatch({
      type: "UNDO",
    });
  };
  const handleRedo = () => {
    dispatch({
      type: "REDO",
    });
  };
  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements);
    try {
      const newPage = {
        ...PageDetails,
        content,
      };

      if (PageDetails.$id) {
        try {
          // console.log(PageDetails)
          await updatePage(newPage, PageDetails.$id);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await createNewPage(newPage);
        } catch (error) {
          console.log(error);
        }
      }

      toast.success("Page Editor Saved");
    } catch (error) {
      toast.error("Error Saving Page");
    }
  };
  return (
    <TooltipProvider>
      <nav
        className={cn("border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all", {
          "!h-0 !p-0 !overflow-hidden": state.editor.displayMode === "Preview",
        })}
      >
        <aside className="flex items-center gap-4 max-w-[206px] w-[300px]">
          <Link href={`/admin/pages`}>
            <ArrowLeftCircle />
          </Link>
          <div className="flex flex-col w-full">
            <Input defaultValue={PageDetails.name} className="border-none h-5 m-0 p-0 text-lg" onBlur={handleOnBlurTitleChange} />
            <span className="text-sm text-muted-foreground">Path: {PageDetails.pathName}</span>
          </div>
        </aside>
        <aside className="flex flex-col items-center justify-center">
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: "pageEditor/setDeviceType",
                payload: value as DeviceTypes,
              });
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <TabsTrigger value="Desktop" className="data-[state=active]:bg-muted size-10 p-0">
                <Laptop />
              </TabsTrigger>

              <TabsTrigger value="Tablet" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
                <Tablet />
              </TabsTrigger>

              <TabsTrigger value="Mobile" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
                <Smartphone />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <span>Active Width: {state.editor.width}</span>
        </aside>
        <aside className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-slate-800" onClick={handlePreviewClick}>
            <EyeIcon />
          </Button>
          <Button disabled={!(state.history.currentIndex > 0)} onClick={handleUdo} variant="ghost" size="icon" className="hover:bg-slate-800 mr-4">
            <Undo2 />
          </Button>
          <Button
            disabled={!(state.history.currentIndex < state.history.history.length - 1)}
            onClick={handleRedo}
            variant="ghost"
            size="icon"
            className="hover:bg-slate-800 mr-4"
          >
            <Redo2 />
          </Button>
          <div className="flex flex-col items-center mr-4">
            <div className="flex flex-row items-center gap-4">
              Draft
              <Switch disabled defaultChecked={true} />
              Publish
            </div>
            <span className="text-muted-foreground text-sm">
              Laste updated {new Date(PageDetails.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <Button onClick={handleOnSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
}
