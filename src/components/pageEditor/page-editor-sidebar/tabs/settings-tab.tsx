"use client";

import SelectCustomFont from "@/components/Typography/SelectCustomFont";
import { CustomColorPicker as ColorPicker } from "@/components/global/color-picker";
import FontUpload from "@/components/global/font-upload";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStyles from "@/hooks/useStyles";
import { useEditor } from "@/providers/editor/editor-provider";
import { PropertisElementHandler, Styles, customSettings } from "@/types/pageEditor";
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  Columns,
  LucideImage,
  Rows,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { elements } from "../../components";

export default function SettingsTab() {
  const { state, dispatch } = useEditor();
      console.log("updating the element styles");
  const [activeStyle, setActiveStyle] = useState<customSettings>(state.editor.selectedElement.styles.styles);
  const [openFontModal, setOpenFontModal] = useState(false);

  const device = state.editor.device;
  const styles = state.editor.selectedElement.styles;

  useEffect(() => {
    if (device === "Desktop") {
      setActiveStyle(styles.styles);
      return;
    }
    if (!styles.mediaQuerys) {
      setActiveStyle(styles.styles);
      return;
    }

    if (device === "Tablet") {
      //find the tablet style
      const tabletStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 421);

      setActiveStyle({
        ...styles.styles,
        ...tabletStyle?.styles,
      });
    }

    if (device === "Mobile") {
      //find the mobile style
      const mobileStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth>= 0);


      setActiveStyle({
        ...styles.styles,
        ...mobileStyle?.styles,
      });
    }
  }, [state.editor.elements]);

  const defaultValueOpacity = [
    typeof activeStyle.opacity === "number" ? activeStyle.opacity : parseFloat((activeStyle.opacity ?? "0").replace("%", "")) ?? 0,
  ];
  const defulValueBorderRaidus = [
    typeof activeStyle.borderRadius === "number" ? activeStyle.borderRadius : parseFloat((activeStyle.borderRadius ?? "0").replace("%", "")) ?? 0,
  ];

  function handleOnChanges(e: PropertisElementHandler) {

    const styleSettings = e.target.id as keyof typeof activeStyle;
    const { id, value } = e.target;
    const styleObject = {
      [styleSettings]: value,
    };


    if (state.editor.selectedElement.styles.styles[styleSettings] !== value) {
      const newStyles: Styles = {
        ...state.editor.selectedElement.styles,
      };

      switch (state.editor.device) {
        case "Desktop":
          newStyles.styles = {
            ...newStyles.styles,
            ...styleObject,
          };
          break;
        case "Tablet":
          newStyles.mediaQuerys = newStyles.mediaQuerys || [];
          const tabletIndex = newStyles.mediaQuerys.findIndex((mediaQuery) => mediaQuery.minWidth >= 421);
          if (tabletIndex === -1) {
            newStyles.mediaQuerys.push({
              minWidth: 421,
              styles: {
                ...styleObject,
              },
            });
          } else {
            newStyles.mediaQuerys[tabletIndex].styles = {
              ...newStyles.mediaQuerys[tabletIndex].styles,
              ...styleObject,
            };
          }
          break;
        case "Mobile":
          newStyles.mediaQuerys = newStyles.mediaQuerys || [];
          const mobileIndex = newStyles.mediaQuerys.findIndex((mediaQuery) => mediaQuery.minWidth >= 0);
          if (mobileIndex === -1) {
            newStyles.mediaQuerys.push({
              minWidth: 0,
              styles: {
                ...styleObject,
              },
            });
          } else {
            newStyles.mediaQuerys[mobileIndex].styles = {
              ...newStyles.mediaQuerys[mobileIndex].styles,
              ...styleObject,
            };
          }
          break;
      }



      dispatch({
        type: "UPDATE_ELEMENT_STYLES",
        payload: {
          elementID: state.editor.selectedElement,
          styles: newStyles,
        },
      });
    }
  }

  const onChangeColorBg = (color: string) => {
    handleOnChanges({
      target: {
        id: "backgroundColor",
        value: color,
      },
    });
  };

  const toggleUploadFontModal = () => {
    setOpenFontModal(!openFontModal);
  }


  const handleCustomFontChange = ({name}: {name: string, }) => {
    handleOnChanges({
      target: {
        id: "customFont",
        value: name,
      },
    });
    
  }


  return (
    <Accordion
      type="multiple"
      className="w-full"
      // defaultValue={["Typography", "Dimesions", "Decorations", "Flexbox"]}
    >
      {elements
        .filter((element) => element.type === state.editor.selectedElement.type)
        .map((element) => (
          <>
            {element.settings && (
              <AccordionItem key={element.id} value={element.label} className="px-6 py-0 border-y-[1px]">
                <AccordionTrigger className="!no-underline">{element.label} Settings</AccordionTrigger>
                <AccordionContent>{element.settings && <element.settings element={state.editor.selectedElement} />}</AccordionContent>
              </AccordionItem>
            )}
          </>
        ))}

      <AccordionItem value="Typography" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Text Aling</p>
            <Tabs
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "textAlign",
                    value: e,
                  },
                });
              }}
              value={activeStyle.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger value="left" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger value="right" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger value="center" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger value="justify" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Font Family</p>
              <AlertDialog open={openFontModal}>
                <AlertDialogTrigger asChild>
                  <button className="text-muted-foreground" onClick={toggleUploadFontModal}>Upload Font</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Upload Font</AlertDialogTitle>
                    <FontUpload toggleModal={toggleUploadFontModal}/>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <SelectCustomFont onChange={handleCustomFontChange}/>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: "font-weight",
                      value: e,
                    },
                  });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="lighter">Ligth</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input placeholder="px" id="fontSize" onChange={handleOnChanges} value={activeStyle.fontSize} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Dimensions</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input id="height" placeholder="px" onChange={handleOnChanges} value={activeStyle.height} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input placeholder="px" id="width" onChange={handleOnChanges} value={activeStyle.width} />
                  </div>
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input id="marginTop" placeholder="px" onChange={handleOnChanges} value={activeStyle.marginTop || ""} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input id="marginBottom" placeholder="px" onChange={handleOnChanges} value={activeStyle.marginBottom} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input id="marginLeft" placeholder="px" onChange={handleOnChanges} value={activeStyle.marginLeft} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input id="marginRight" placeholder="px" onChange={handleOnChanges} value={activeStyle.marginRight || ""} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input placeholder="px" id="paddingTop" onChange={handleOnChanges} value={activeStyle.paddingTop} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input placeholder="px" id="paddingBottom" onChange={handleOnChanges} value={activeStyle.paddingBottom} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input placeholder="px" id="paddingLeft" onChange={handleOnChanges} value={activeStyle.paddingLeft} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input placeholder="px" id="paddingRight" onChange={handleOnChanges} value={activeStyle.paddingRight} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Decorations</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">{defaultValueOpacity}%</small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "opacity",
                    value: `${e[0]}%`,
                  },
                });
              }}
              defaultValue={defaultValueOpacity}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small>{defulValueBorderRaidus}px</small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "borderRadius",
                    value: `${e[0]}px`,
                  },
                });
              }}
              defaultValue={defulValueBorderRaidus}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <ColorPicker color={activeStyle.backgroundColor} onChange={onChangeColorBg}>
                <div
                  className="w-12 cursor-pointer"
                  style={{
                    backgroundColor: activeStyle.backgroundColor,
                  }}
                />
              </ColorPicker>
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={activeStyle.backgroundColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundImage: activeStyle.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={activeStyle.backgroundImage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Video</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundImage: activeStyle.backgroundVideo,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundVideo"
                onChange={handleOnChanges}
                value={activeStyle.backgroundVideo}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "backgroundSize",
                    value: e,
                  },
                });
              }}
              value={activeStyle.backgroundSize?.toString()}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger value="cover" className="size-10 p-0 data-[state=active]:bg-muted">
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger value="contain" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignVerticalJustifyCenter size={18} />
                </TabsTrigger>
                <TabsTrigger value="auto" className="size-10 p-0 data-[state=active]:bg-muted">
                  <LucideImage size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          <Label className="text-muted-foreground">Justify Content</Label>
          <Tabs
            onValueChange={(e) => {
              handleOnChanges({
                target: {
                  id: "justifyContent",
                  value: e,
                },
              });
            }}
            value={activeStyle.justifyContent}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger value="space-between" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalSpaceBetween size={18} />
              </TabsTrigger>
              <TabsTrigger value="space-evenly" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalSpaceAround size={18} />
              </TabsTrigger>
              <TabsTrigger value="center" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger value="start" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalJustifyStart size={18} />
              </TabsTrigger>
              <TabsTrigger value="end" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalJustifyEnd size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Label className="text-muted-foreground">Align Items</Label>
          <Tabs
            onValueChange={(e) => {
              handleOnChanges({
                target: {
                  id: "alignItems",
                  value: e,
                },
              });
            }}
            value={activeStyle.alignItems}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger value="center" className="size-10 data-[state=active]:bg-muted">
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger value="normal" className="size-10 data-[state=active]:bg-muted">
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 mt-2 mb-2">
            <Input
              className="size-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(va) => {
                handleOnChanges({
                  target: {
                    id: "display",
                    value: va.target.checked ? "flex" : "block",
                  },
                });
              }}
            />
            <Label className="text-muted-foreground">Flex</Label>
          </div>
          <div className=" flex flex-col gap-2 mt-2">
            <Label className="text-muted-foreground">Direction</Label>
            <Tabs
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "flexDirection",
                    value: e,
                  },
                });
              }}
              value={activeStyle.flexDirection}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger value="row" className="size-10 data-[state=active]:bg-muted">
                  <Rows size={18} />
                </TabsTrigger>
                <TabsTrigger value="row-reverse" className="size-10 data-[state=active]:bg-muted">
                  <Rows size={18} />
                </TabsTrigger>
                <TabsTrigger value="column" className="size-10 data-[state=active]:bg-muted">
                  <Columns size={18} />
                </TabsTrigger>
                <TabsTrigger value="column-reverse" className="size-10 data-[state=active]:bg-muted">
                  <Columns size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
