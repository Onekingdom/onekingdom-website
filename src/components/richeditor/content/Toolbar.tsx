import React from "react";

import { Editor } from "@tiptap/react";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import LinkIcon from "@mui/icons-material/Link";
import RedoIcon from "@mui/icons-material/Redo";
import SubscriptIcon from "@mui/icons-material/Subscript";
import SuperscriptIcon from "@mui/icons-material/Superscript";
import UndoIcon from "@mui/icons-material/Undo";

import Paper from "@mui/material/Paper";

import { Divider } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

import StyledToggleButtonGroup from "./StyledToggleButtonGroup";


const ProjectCreateContentToolbar = ({ editor }: { editor: Editor }) => {
  const [OpenPickImage, setOpenPickImage] = React.useState(false);
  const [OpenPickVideo, setOpenPickVideo] = React.useState(false);

  if (!editor) {
    return null;
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
          mb: 2,
          position: "sticky",
          top: 10,
          backgroundColor: `#0D0D0D`,
        }}
        className="text-white"
      >
        {/* <HeadingToolbarButtons editor={editor} /> */}
        {/* <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} /> */}
        <StyledToggleButtonGroup size="small" exclusive aria-label="text alignment" className="text-white">
          {/* <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            selected={editor.isActive({ textAlign: "left" })}
            value="left"
            aria-label="left aligned"
          >
            <FormatAlignLeftIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            selected={editor.isActive({ textAlign: "center" })}
            value="center"
            aria-label="Center aligned"
          >
            <FormatAlignCenterIcon sx={{ color: "white" }} />
          </ToggleButton> */}
          {/* <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            selected={editor.isActive({ textAlign: "right" })}
            value="right"
            aria-label="Right aligned"
          >
            <FormatAlignRightIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            selected={editor.isActive({ textAlign: "justify" })}
            value="justify"
            aria-label="Justify aligned"
          >
            <FormatAlignJustifyIcon sx={{ color: "white" }} />
          </ToggleButton> */}
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <StyledToggleButtonGroup size="small" aria-label="text formatting">
          <ToggleButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            selected={editor.isActive("superscript")}
            value="superscript"
            aria-label="superscript"
          >
            <SuperscriptIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            selected={editor.isActive("subscript")}
            value="subscript"
            aria-label="subscript"
          >
            <SubscriptIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton onClick={() => editor.chain().focus().toggleBold().run()} selected={editor.isActive("bold")} value="bold" aria-label="bold">
            <FormatBoldIcon sx={{ color: "white" }} />
          </ToggleButton>

          <ToggleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            value="italic"
            aria-label="italic"
            selected={editor.isActive("italic")}
          >
            <FormatItalicIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            value="strike"
            aria-label="strike"
            selected={editor.isActive("strike")}
          >
            <FormatStrikethroughIcon sx={{ color: "white" }} />
          </ToggleButton>

          <ToggleButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            value="highlight"
            aria-label="highlight"
            selected={editor.isActive("highlight")}
          >
            <BorderColorIcon sx={{ color: "white" }} />
          </ToggleButton>
          {/* <ToggleButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            value="blockQuote"
            aria-label="blockQuote"
            selected={editor.isActive("blockQuote")}
          >
            <FormatQuoteIcon sx={{ color: "white" }} />
          </ToggleButton> */}
          {/* <ToggleButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            selected={editor.isActive("HorizontalRule")}
            value="HorizontalRule"
            aria-label="HorizontalRule"
          >
            <HorizontalRuleIcon sx={{ color: "white" }} />
          </ToggleButton> */}
          <ToggleButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            selected={editor.isActive("paragraph")}
            value="paragraph"
            aria-label="paragraph"
          >
            <FormatTextdirectionRToLIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            selected={editor.isActive("underline")}
            value="underline"
            aria-label="underline"
          >
            <FormatUnderlinedIcon sx={{ color: "white" }} />
          </ToggleButton>


          <ToggleButton
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("URL", previousUrl);

              // cancelled
              if (url === null) {
                return;
              }

              // empty
              if (url === "") {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();

                return;
              }

              // update link
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }}
            selected={editor.isActive("link")}
            value="link"
            aria-label="link"
          >
            <LinkIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            value="bullettList"
            aria-label="bullettList"
            selected={editor.isActive("bulletList")}
          >
            <FormatListBulletedIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            value="orderedList"
            aria-label="orderedList"
            selected={editor.isActive("orderedList")}
          >
            <FormatListNumberedIcon sx={{ color: "white" }} />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <StyledToggleButtonGroup size="small" exclusive aria-label="text alignment">
          <ToggleButton onClick={() => editor.chain().focus().undo().run()} value="undo" aria-label="undo">
            <UndoIcon sx={{ color: "white" }} />
          </ToggleButton>
          <ToggleButton onClick={() => editor.chain().focus().redo().run()} value="redo" aria-label="redo">
            <RedoIcon sx={{ color: "white" }} />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <StyledToggleButtonGroup size="small" exclusive aria-label="text alignment">
          <ToggleButton onClick={() => editor.chain().focus().unsetAllMarks().run()} value="clear-mark" aria-label="clear-mark">
            <LayersClearIcon sx={{ color: "white" }} />
          </ToggleButton>

        </StyledToggleButtonGroup>
      </Paper>
    </>
  );
};

export default ProjectCreateContentToolbar;
