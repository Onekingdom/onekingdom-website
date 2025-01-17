"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TooltipProvider } from "@/components/ui/tooltip";
import useEditor from "@/hooks/useEditor";
import usePageEditor from "@/hooks/usePageEditor";
import { cn } from "@/lib/utils";
import { PageDetails } from "@/types/pageEditor";
import { ArrowLeftCircle, EyeIcon, Redo2, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusEventHandler, useState } from "react";
import { toast } from "sonner";
import NewMediaQueryModal from "../modals/new-media-query";

type Props = {
  PageDetails: PageDetails;
};

export default function PageEditorNavigation({ PageDetails }: Props) {
  const router = useRouter();
  const { dispatch, state } = useEditor();
  const { createNewPage, updatePage } = usePageEditor();
  const [modalOpen, setModalOpen] = useState(false);

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
        published: state.editor.published,
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

      toast.success("Page Editor Saved", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Error Saving Page");
    }
  };

  const handlePublish = (value: boolean) => {
    dispatch({
      type: "pageEditor/SET_PUBLISHED",
      payload: {
        value: value,
      },
    });
  };

  const handleAddNewMediaQuery = (value: string) => {
    if (value === "custom") {
      setModalOpen(true);
      return;
    }

    dispatch({
      type: "pageEditor/SET_WIDTH",
      payload: {
        width: parseInt(value),
      },
    });
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
        <aside className="flex flex-row items-center justify-center">
          <Select value={state.editor.activeMediaQuery.toString()} onValueChange={handleAddNewMediaQuery}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Media Query" />
            </SelectTrigger>
            <SelectContent>
              {state.editor.mediaQuerys.map((mediaQuery, index) => (
                <SelectItem key={index} value={mediaQuery.toString()}>
                  {mediaQuery} px
                </SelectItem>
              ))}
              <SelectItem value="custom">Add New</SelectItem>
            </SelectContent>
          </Select>
          {modalOpen && <NewMediaQueryModal title="Add New Media Query" open={modalOpen} handleClose={setModalOpen} />}

          <span>{state.editor.width}PX</span>
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
              <Switch
                checked={state.editor.published}
                onCheckedChange={handlePublish}
              />
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
